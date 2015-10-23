/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

var DEBUG = true;

application.controller('loginController', function($scope, Base64, $http, apiServerData){
    "use strict";

    // Variables for logging in to API server.
    $scope.credentials = { username: 'martin.w.greer', password: ''};
    $scope.apiRoot = 'https://softhousegbg.atlassian.net/';
    $scope.apiServer = $scope.apiRoot + 'rest/api/2/issue/createmeta';

    apiServerData.setApiRoot($scope.apiRoot);

    /**
     * Login: Auth to API server.
     */
    $scope.login = function () {
        //$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization", "Access-Control-Allow-Origin": "*"};
        $http.defaults.headers.common = {"Access-Control-Allow-Origin": "*"};
        apiServerData.setApiRoot($scope.apiRoot);
        if(DEBUG){console.log("Attempting to authenticate to server " + $scope.apiRoot + "...");}
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.credentials.username + ':' + $scope.credentials.password);
        $http({method: 'GET', url: $scope.apiServer})
            .success(function () {
                if(DEBUG){console.log("Authentication SUCCESS!");}
            })
            .error(function () {
                if(DEBUG){console.log("Authentication ERROR.");}
            });
    };

    /**
     * Log out by sending empty login details and getting rejected (there is no log out support for API).
     */
    $scope.logout = function () {
        if(DEBUG){console.log("Logging out from " + $scope.apiRoot + "...");}
        $scope.credentials = { username: 'martin.w.greer', password: '' };
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(' : ');
        $http({method: 'GET', url: $scope.apiServer})
            .success(function () {
                if(DEBUG){console.log("Logout ERROR.");}
            })
            .error(function () {
                if(DEBUG){console.log("Logout SUCCESS!");}
            });
    };
});

/**
* Controller for the Load Data view.
*/
application.controller('ldController', function ($scope, $http, $q, apiServerData, localStorageHandler) {
    "use strict";

    // Synchronization variable to make sure http requests are done in the correct order.
    var getBoardDesignBeforeIssues = $q.defer();

    // Variables that need to be visible in the entire controller.
    var boardColumnsDesign,
        apiIssuesMinimal,
        issues;

    $scope.apiRoot = apiServerData.getApiRoot();
    $scope.apiProject = 'KTD';

    // Assign columns to scope if local storage already exists.
    if(localStorageHandler.getBoardDesign()){
        $scope.columns = localStorageHandler.getBoardDesign().columns;
    } else {
        $scope.columns = [];
    }

    // Assign user configs to scope if local storage already exists.
    if(localStorageHandler.getConfigs()){
        $scope.userConfigs = localStorageHandler.getConfigs();
    } else {
        $scope.userConfigs = [];
    }

    // The max results to be returned from API (-1 is unlimited results).
    $scope.maxResults = null;

    // Board ID to get column & status structure from.
    $scope.boardId = '12';

    /**
    * Get all issues for the project that was given on login.
    */
    $scope.getAllIssues = function () {
        boardColumnsDesign = {};
        apiIssuesMinimal = {};
        issues = [];

        getBoardDesignBeforeIssues = $q.defer();

        if(DEBUG){console.log("Attempting to get board design for project " + $scope.apiProject + "...");}

        var requestBoardDesign = $http({
            method: "GET",
            url: $scope.apiRoot + "rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=" + $scope.boardId + "&selectedProjectKey=" + $scope.apiProject
        });
        requestBoardDesign.success(function (data) {
            boardColumnsDesign = createBoardDesign(parseBoardDesign(data));
            localStorageHandler.setBoardDesign(boardColumnsDesign);
            getBoardDesignBeforeIssues.resolve();
            if(DEBUG){console.log("Get board design SUCCESS!");}
        });
        requestBoardDesign.error(function (data) {
            getBoardDesignBeforeIssues.reject();
            if(DEBUG){console.log("Get board design ERROR. API response: " + JSON.stringify(data));}
        });

        getBoardDesignBeforeIssues.promise.then(function() {
            if(DEBUG){console.log("Attempting to get all issues for project " + $scope.apiProject + "...");}
            if($scope.maxResults === null){
                $scope.maxResults = -1;
            }
            var requestIssues = $http({
                method: "GET",
                url: $scope.apiRoot + "rest/api/2/search?jql=project=" + $scope.apiProject + "&expand=changelog" + "&maxResults=" + $scope.maxResults
            });
            if($scope.maxResults === -1){
                $scope.maxResults = null;
            }
            requestIssues.success(function (data) {
                apiIssuesMinimal = parseMultipleApiIssues(data);
                //console.log(JSON.stringify(apiIssuesMinimal));
                issues = createIssuesFromArray(apiIssuesMinimal, boardColumnsDesign);
                localStorageHandler.setIssues(issues);
                if (DEBUG) {console.log("Get all issues SUCCESS!");}
            });
            requestIssues.error(function (data) {
                if (DEBUG) {console.log("Get all issues ERROR. API response: " + JSON.stringify(data));}
            });
        });

        if(localStorageHandler.getBoardDesign()){
            $scope.columns = localStorageHandler.getBoardDesign().columns;
        } else {
            $scope.columns = [];
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
    };

    /**
     * Save the user choices for a set of columns for quick re-use.
     */
    $scope.saveConfig = function (name, columnCategories) {
        var userConfigs,
            isNameUnique = true;

        if(localStorageHandler.getConfigs() === null){
            console.log("No previous configs! Creating new.");
            userConfigs = [];
        } else {
            console.log("Previous configs exist! Adding this config to it.");
            userConfigs = localStorageHandler.getConfigs();
            _.forEach(userConfigs, function (config) {
                if(config.name.toLowerCase() === name.toLowerCase()){
                    isNameUnique = false;
                    return false;
                }
            });
        }

        if(!isNameUnique){
            console.log("Didn't save new config. Please choose a unique name.");
        } else {
            var newConfig = {"name": name, "columnCategories": columnCategories};
            userConfigs.push(newConfig);
            localStorageHandler.setConfigs(userConfigs);
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
application.controller('cfdController', function ($scope, $http) {
    "use strict";

    var requestCfdData;

    /**
    * Graph structure.
    */
    $scope.options = {
        chart: {
            type: 'stackedAreaChart',
            height: 450,
            width: 800,
            x: function (d) { return d[0]; },
            y: function (d) { return d[1]; },
            useVoronoi: false,
            transitionDuration: 500,
            useInteractiveGuideline: true,
            xAxis: {
                showMaxMin: false,
                tickFormat: function (d) {
                    return d3.time.format('%x')(new Date(d));
                }
            },
            yAxis: {
                tickFormat: function (d) {
                    return d3.format(',.2f')(d);
                }
            }
        },
        title: {
            enable: true,
            text: 'Cumulative Flow Diagram'
        }
    };

    requestCfdData = $http({
        method: "GET",
        url: '../json/graphTestData.json'
    });
    requestCfdData.success(function (data) {
        $scope.data = data;
        if(DEBUG){console.log("Get graph data SUCCESS!");}
    });
    requestCfdData.error(function (data) {
        if(DEBUG){console.log("Get graph data ERROR.");}
    });
});

application.controller('etdtController', function ($scope, localStorageHandler) {
    "use strict";

    if(localStorageHandler.getIssues()){
        var issues = localStorageHandler.getIssues();
        $scope.data = createEtDtData("All issues", issues);
    } else {
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

    if(localStorageHandler.getIssues()) {
        $scope.issues = localStorageHandler.getIssues();
    } else {
        $scope.issues = [];
    }
    //console.log($scope.issues);

    _.forEach($scope.issues, function(issue) {
        if(issue.cycleTime != null){
            issue.cycleTimeConverted = timeUtil.convertMillisecondsToDaysHoursMinutes(issue.cycleTime);
            cumulativeCycleTime += issue.cycleTime;
            amountOfCycleTimes++;
        }
        if(issue.processEfficiency != 0){
            issue.processEfficiencyConverted = (Math.round(issue.processEfficiency*100) + "%");
        }
    });

    $scope.averageCycleTime = timeUtil.convertMillisecondsToDaysHoursMinutes(cumulativeCycleTime/amountOfCycleTimes);
});
