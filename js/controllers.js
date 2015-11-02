/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

var DEBUG = true;

application.controller('loginController', function($scope, Base64, $http, apiServerData, Notification){
    "use strict";

    // Variables for logging in to API server.
    $scope.credentials = { username: 'martin.w.greer', password: ''};
    $scope.apiRoot = 'https://softhousegbg.atlassian.net/'; // Temporary hard-code for testing purposes
    apiServerData.setApiRoot($scope.apiRoot);

    /**
     * Login: Auth to API server.
     */
    $scope.login = function () {
        //$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization", "Access-Control-Allow-Origin": "*"};
        //$http.defaults.headers.common = {"Access-Control-Allow-Origin": "*"};
        apiServerData.setApiRoot($scope.apiRoot);
        $scope.apiServer = apiServerData.getApiServer('jira');
        if(DEBUG){console.log("Attempting to authenticate to server " + $scope.apiRoot + "...");}
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.credentials.username + ':' + $scope.credentials.password);
        $http({method: 'GET', url: $scope.apiServer})
            .success(function () {
                apiServerData.setIsLoggedIn(true);
                Notification.success('Login successful!');
            })
            .error(function () {
                apiServerData.setIsLoggedIn(false);
                Notification.error('Login failed, please try again.');
            });
    };

    /**
     * Log out by sending empty login details and getting rejected (there is no log out support for API).
     */
    $scope.logout = function () {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(' : ');
        $http({method: 'GET', url: $scope.apiServer})
            .success(function () {
                Notification.error('Logout failed, please try again.');
            })
            .error(function () {
                apiServerData.setIsLoggedIn(false);
                Notification.primary('You have been logged out.');
            });
    };
});

/**
* Controller for the Load Data view.
*/
application.controller('ldController', function ($scope, $http, $q, apiServerData, localStorageHandler, Notification) {
    "use strict";

    // Synchronization variable to make sure http requests are done in the correct order.
    var getBoardDesignBeforeIssues = $q.defer();

    // Variables that need to be visible in the entire controller.
    var boardColumnsDesign,
        apiIssuesMinimal,
        issues;

    $scope.apiRoot = apiServerData.getApiRoot();
    $scope.apiProject = 'KTD'; // Temporary hard-code for testing purposes

    // Assign columns to scope if local storage already exists.
    $scope.columns = localStorageHandler.getBoardDesign().columns;
    $scope.loadedBoardId = localStorageHandler.getBoardDesign().rapidViewId;

    $scope.loadedProject = localStorageHandler.getLoadedProject()

    // Assign user configs to scope if local storage already exists.
    $scope.userConfigs = localStorageHandler.getConfigs();

    // The max results to be returned from API (-1 is unlimited results).
    $scope.maxResults = '';

    // Board ID to get column & status structure from.
    $scope.boardId = '12';

    /**
    * Get all issues for the project that was given on login.
    */
    $scope.getAllIssues = function () {
        if(!apiServerData.getIsLoggedIn()){
            Notification.error('You are not logged in!');
        } else {
            boardColumnsDesign = {};
            apiIssuesMinimal = {};
            issues = [];

            getBoardDesignBeforeIssues = $q.defer();

            Notification.primary('Attempting to get data from server...');
            if(DEBUG){console.log("Attempting to get board design for project " + $scope.apiProject + "...");}

            var requestBoardDesign = $http({
                method: "GET",
                url: $scope.apiRoot + "rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=" + $scope.boardId + "&selectedProjectKey=" + $scope.apiProject
            });
            requestBoardDesign.success(function (data) {
                if(DEBUG){console.log("Get board design from API: SUCCESS!");}
                try{
                    boardColumnsDesign = createBoardDesign(parseBoardDesign(data));
                    localStorageHandler.setBoardDesign(boardColumnsDesign);
                    $scope.loadedProject = localStorageHandler.setLoadedProject($scope.apiProject);
                    $scope.columns = localStorageHandler.getBoardDesign().columns;
                    $scope.loadedBoardId = localStorageHandler.getBoardDesign().rapidViewId;
                    $scope.loadedProject = localStorageHandler.getLoadedProject();
                    getBoardDesignBeforeIssues.resolve();
                    if(DEBUG){console.log("Parse board design SUCCESS!");}
                } catch(error) {
                    Notification.error('Something went wrong when parsing the board data. Check your board configuration for abnormalities.');
                    if(DEBUG){console.log("Parse board design SUCCESS!");}
                }

            });
            requestBoardDesign.error(function (data) {
                getBoardDesignBeforeIssues.reject();
                Notification.error('Failed to load board data from source.');
                if(DEBUG){console.log("Get board design from API: ERROR.");}
            });

            getBoardDesignBeforeIssues.promise.then(function() {
                if(DEBUG){console.log("Attempting to get all issues for project " + $scope.apiProject + "...");}
                if($scope.maxResults === ''){
                    $scope.maxResults = -1;
                }
                var requestIssues = $http({
                    method: "GET",
                    url: $scope.apiRoot + "rest/api/2/search?jql=project=" + $scope.apiProject + "&expand=changelog" + "&maxResults=" + $scope.maxResults
                });
                if($scope.maxResults === -1){
                    $scope.maxResults = '';
                }
                requestIssues.success(function (data) {
                    apiIssuesMinimal = parseMultipleApiIssues(data);
                    try{
                        issues = createIssuesFromArray(apiIssuesMinimal, boardColumnsDesign);
                        Notification.success('Issue data successfully loaded!');
                        if(DEBUG){console.log("Parse issue data SUCCESS!");}
                    } catch(error) {
                        Notification.error('Something went wrong when parsing the issue data. Check your board configuration for abnormalities.');
                        if(DEBUG){console.log("Parsing of issues data ERROR: " + error);}
                    }
                    localStorageHandler.setIssues(issues);
                    if(DEBUG){console.log("Get all issues from API: SUCCESS!");}
                });
                requestIssues.error(function (data) {
                    Notification.error('Failed to load issue data from source.');
                    if(DEBUG){console.log("Get all issues from API: ERROR");}
                });
            });
        }
    };

    /**
     * Update the column categories to the user defined values.
     */
    $scope.updateColumnCategories = function (columnCategories) {
        var oldBoardDesign,
            oldIssues,
            updatedBoardDesign,
            updatedIssues;

        try{
            oldBoardDesign = createBoardDesign(localStorageHandler.getBoardDesign());
            oldIssues = createIssuesFromArray(localStorageHandler.getIssues(), oldBoardDesign);

            _.forEach(oldBoardDesign.columns, function (columnOutput) {
                _.forEach(columnCategories, function (columnInput) {
                    if(columnInput.name === columnOutput.name){
                        //console.log(columnOutput.name + ": " + columnOutput.category + " -> " + columnInput.category);
                        columnOutput.category = columnInput.category;
                    }
                });
            });

            updatedBoardDesign = createBoardDesign(oldBoardDesign);
            updatedIssues = createIssuesFromArray(oldIssues, updatedBoardDesign);

            localStorageHandler.removeBoardDesign();
            localStorageHandler.removeIssues();
            localStorageHandler.setBoardDesign(updatedBoardDesign);
            localStorageHandler.setIssues(updatedIssues);
            Notification.success('Column categories have been updated.');
        } catch (error) {
            Notification.error('Column categories update failed.');
            if(DEBUG){console.log("Updating columns ERROR: " + error);}
        }
    };

    /**
     * Save the user choices for a set of columns for quick re-use.
     */
    $scope.saveConfig = function (name, columnCategories) {
        var userConfigs,
            isNameUnique = true;

        if (name === '') {
            Notification.error('Config was not saved. You must choose a name.');
            console.log("Input name is empty. Not adding config.");
        } else {
            console.log("Adding config.");
            userConfigs = localStorageHandler.getConfigs();
            _.forEach(userConfigs, function (config) {
                if(config.name.toLowerCase() === name.toLowerCase()){
                    isNameUnique = false;
                    return false;
                }
            });
        }

        if(!isNameUnique){
            Notification.error('Config was not saved. Please choose a unique name.');
        } else {
            var newConfig = {"name": name, "columnCategories": columnCategories};
            userConfigs.push(newConfig);
            localStorageHandler.setConfigs(userConfigs);
            $scope.userConfigs = localStorageHandler.getConfigs();
            Notification.success('Config saved!');
        }
    };

    /**
     * Loads a chosen user config.
     */
    $scope.loadConfig = function (name) {
        var userConfigs = localStorageHandler.getConfigs();

        _.forEach(userConfigs, function (config) {
            if(config.name === name){
                $scope.columns = config.columnCategories;
                return false;
            }
        });
    };

    /**
     * Clears all configs.
     */
    $scope.clearConfigs = function () {
        localStorageHandler.removeConfigs();
        $scope.userConfigs = localStorageHandler.getConfigs();
        Notification.primary('All configs removed.');
        console.log("All configs removed.");
    };

    /**
     * Print board design directly in the application (for debugging).
     */
    $scope.boardDesignString = null;
    $scope.printBoardDesign = function () {
        if ($scope.boardDesignString === null) {
            $scope.boardDesignString = localStorageHandler.getBoardDesign();
        } else {
            $scope.boardDesignString = null;
        }
    };

    /**
    * Print all issues directly in the application (for debugging).
    */
    $scope.allIssuesString = null;
    $scope.printAllIssues = function () {
        if ($scope.allIssuesString === null) {
            $scope.allIssuesString = localStorageHandler.getIssues();
        } else {
            $scope.allIssuesString = null;
        }
    };
});

/**
* Controller for the CFD view.
*/
application.controller('cfdController', function ($scope, localStorageHandler) {
    "use strict";

    var issues = localStorageHandler.getIssues(),
        boardDesign = localStorageHandler.getBoardDesign();

    try{
        $scope.data = createCfdData(issues, boardDesign);
    } catch (error) {
        $scope.data = [];
    }

    /**
    * Graph structure.
    */
    $scope.options = {
        chart: {
            type: 'stackedAreaChart',
            height: 450,
            width: 800,
            useVoronoi: false,
            transitionDuration: 500,
            useInteractiveGuideline: true,
            xAxis: {
                showMaxMin: false,
                tickFormat: function (d) {
                    return d3.time.format('%Y-%m-%d')(new Date(d));
                }
            },
            yAxis: {
                tickFormat: function (d) {
                    return d3.format(',.0d')(d);
                }
            }
        },
        title: {
            enable: true,
            text: 'Cumulative Flow Diagram'
        }
    };
});

application.controller('etdtController', function ($scope, localStorageHandler) {
    "use strict";

    var issues = localStorageHandler.getIssues();

    try{
        $scope.data = createEtDtData("All issues", issues);
    } catch (error) {
        $scope.data = [];
    }

    /**
     * Graph structure.
     */
    $scope.options = {
        chart: {
            type: 'scatterChart',
            height: 450,
            width: 800,
            interactive: true,
            scatter: {
                onlyCircles: true
            },
            showDistX: false,
            showDistY: false,
            useInteractiveGuideline: true,
            transitionDuration: 350,
            xAxis: {
                axisLabel: 'Delay Time (hours)',
                axisLabelDistance: '0'
            },
            yAxis: {
                axisLabel: 'Execution Time (hours)',
                axisLabelDistance: '10'
            }
        },
        title: {
            enable: true,
            text: 'Execution Time vs Delay Time'
        }
    };
});

/**
 * Controller for the Process Efficiency tab.
 */
application.controller('peController', function ($scope, localStorageHandler) {
    var cumulativeCycleTime = 0,
        amountOfCycleTimes = 0;

    $scope.issues = localStorageHandler.getIssues();

    _.forEach($scope.issues, function(issue) {
        if(issue.cycleTime != null){
            issue.cycleTimeConverted = timeUtil.convertMsToDHM(issue.cycleTime);
            cumulativeCycleTime += issue.cycleTime;
            amountOfCycleTimes++;
        }
        if(issue.processEfficiency != 0){
            issue.processEfficiencyConverted = (Math.round(issue.processEfficiency*100) + "%");
        }
    });

    $scope.averageCycleTime = timeUtil.convertMsToDHM(cumulativeCycleTime/amountOfCycleTimes);
});
