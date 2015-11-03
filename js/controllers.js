/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

var DEBUG = true;

application.controller('loginController', function($scope, Base64, $http, apiServerData, previousLogin, Notification){
    "use strict";

    // Variables for logging in to API server.
    $scope.credentials = { username: previousLogin.getUserName(), password: ''};
    $scope.apiRoot = previousLogin.getUrl();
    apiServerData.setApiRoot($scope.apiRoot);

    // This variable decides what is being shown in the login view.
    $scope.isLoggedIn = apiServerData.getIsLoggedIn();

    /**
     * Login: Auth to API server.
     */
    $scope.login = function () {
        //$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization", "Access-Control-Allow-Origin": "*"};
        //$http.defaults.headers.common = {"Access-Control-Allow-Origin": "*"};
        previousLogin.setPreviousLogin($scope.apiRoot, $scope.credentials.username);
        apiServerData.setApiRoot($scope.apiRoot);
        $scope.apiServer = apiServerData.getApiServer('jira');
        Notification.primary('Logging in...');
        if(DEBUG){console.log("Attempting to authenticate to server " + $scope.apiRoot + "...");}
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.credentials.username + ':' + $scope.credentials.password);
        $http({method: 'GET', url: $scope.apiServer})
            .success(function () {
                apiServerData.setIsLoggedIn(true);
                $scope.isLoggedIn = apiServerData.getIsLoggedIn();
                Notification.success('Login successful!');
                if(DEBUG){console.log("User " + $scope.credentials.username + " is now logged in!");}
            })
            .error(function () {
                apiServerData.setIsLoggedIn(false);
                Notification.error('Login failed, please try again.');
                if(DEBUG){console.log("Login failed.");}
            });
    };

    /**
     * Log out by sending empty login details and getting rejected (there is no log out support for this API).
     */
    $scope.logout = function () {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(' : ');
        $scope.apiServer = apiServerData.getApiServer('jira');
        if(DEBUG){console.log("Attempting to log out...");}
        $http({method: 'GET', url: $scope.apiServer})
            .success(function () {
                Notification.error('Logout failed, please try again.');
                if(DEBUG){console.log("Logout failed.");}
            })
            .error(function () {
                apiServerData.setIsLoggedIn(false);
                $scope.isLoggedIn = apiServerData.getIsLoggedIn();
                Notification.primary('You have been logged out.');
                if(DEBUG){console.log("User " + $scope.credentials.username + " has logged out.");}
            });
    };
});

/**
* Controller for the Load Data view.
*/
application.controller('ldController', function ($scope, $http, $q, apiServerData, localStorageHandler, previousLoadData, Notification) {
    "use strict";

    // Synchronization variable to make sure http requests are done in the correct order.
    var getBoardDesignBeforeIssues = $q.defer();

    // Variables that need to be visible in the entire controller.
    var boardColumnsDesign,
        apiIssuesMinimal,
        issues;

    $scope.apiRoot = apiServerData.getApiRoot();
    $scope.apiProject = previousLoadData.getProjectKey();

    // Assign columns to scope if local storage already exists.
    $scope.columns = localStorageHandler.getBoardDesign().columns;
    $scope.loadedBoardId = localStorageHandler.getBoardDesign().rapidViewId;

    $scope.loadedProject = localStorageHandler.getLoadedProject();

    // Assign user configs to scope if local storage already exists.
    $scope.userConfigs = localStorageHandler.getConfigs();

    // The max results to be returned from API (-1 is unlimited results).
    $scope.maxResults = previousLoadData.getMaxResults();

    // Board ID to get column & status structure from.
    $scope.boardId = previousLoadData.getBoardId();

    // Keeps track of whether user is logged in or not.
    $scope.isLoggedIn = apiServerData.getIsLoggedIn();

    // The config that is currently selected.
    $scope.loadedConfig = '';

    /**
    * Get issues for the project.
    */
    $scope.getAllIssues = function () {
        previousLoadData.setPreviousLoadData($scope.boardId, $scope.apiProject, $scope.maxResults);

        if(!$scope.isLoggedIn){
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
                    if(DEBUG){console.log("Parsing of board data ERROR: " + error);}
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
                    $scope.maxResults = '-1';
                }
                var requestIssues = $http({
                    method: "GET",
                    url: $scope.apiRoot + "rest/api/2/search?jql=project=" + $scope.apiProject + "&expand=changelog" + "&maxResults=" + $scope.maxResults
                });
                if($scope.maxResults === '-1'){
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

        if (name === '' || !name || !name.replace(/\s/g, '').length) {
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
            if(!isNameUnique){
                Notification.error('Config was not saved. Please choose a unique name.');
            } else {
                var newConfig = {"name": name, "columnCategories": columnCategories};
                userConfigs.push(newConfig);
                localStorageHandler.setConfigs(userConfigs);
                $scope.userConfigs = localStorageHandler.getConfigs();
                Notification.success('Config saved!');
            }
        }
    };

    /**
     * Loads a chosen user config.
     */
    $scope.loadConfig = function (name) {
        var config = localStorageHandler.getSelectedConfig(name);

        if(haveSameColumnStructure($scope.columns, config.columnCategories)){
            $scope.loadedConfig = localStorageHandler.getSelectedConfig(name).name;
            $scope.columns = config.columnCategories;
            if(DEBUG){console.log("Config was successfully loaded.");}
        } else {
            Notification.error("The selected config is not compatible with the current board.");
            if(DEBUG){console.log("Config was not loaded.");}
        }
    };

    /**
     * Checks if the given column arrays have the same structure.
     */
    function haveSameColumnStructure(columnsToConfig, columns){
        if (columnsToConfig === columns){
            if(DEBUG){console.log("Columns are exactly equal!");}
            return true;
        }
        if (columnsToConfig == null || columns == null) {
            if(DEBUG){console.log("At least one column array is null!");}
            return false;
        }
        if (columnsToConfig.length != columns.length) {
            if(DEBUG){console.log("Lengths are not the same!");}
            return false;
        }

        for (var i = 0; i < columnsToConfig.length; ++i) {
            if (columnsToConfig[i].name !== columns[i].name) {
                if(DEBUG){console.log("Column names are not equal!");}
                return false;
            }
        }

        return true;
    }

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
            width: 1000,
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

/**
 * Controller for the Execution Time vs Delay Time view.
 */
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
