/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

/**
 * Controller for the Load Data view.
 */
application.controller('ldController', function ($scope, $http, $q, apiServerData, localStorageHandler, previousLoadData, previousLogin, Notification) {
    "use strict";

    var DEBUG = true;

    // Synchronization variable to make sure http requests are done in the correct order.
    var getBoardDesignBeforeIssues = $q.defer();

    // Variables that need to be visible in the entire controller.
    var boardColumnsDesign,
        apiIssuesMinimal,
        issues;

    $scope.apiRoot = apiServerData.getApiRoot();

    // Keeps track of whether user is logged in or not.
    $scope.isLoggedIn = apiServerData.getIsLoggedIn();

    // The config that is currently selected.
    $scope.loadedConfig = '';

    function setPreviousLoadDataOnScope (previousLoadData) {
        if (previousLoadData.projectKey) {
            $scope.apiProject = previousLoadData.projectKey;
        }
        if (previousLoadData.maxResults) {
            // The max results to be returned from API (-1 is unlimited results).
            $scope.maxResults = previousLoadData.maxResults;
        }
        if (previousLoadData.boardId) {
            // Board ID to get column & status structure from.
            $scope.boardId = previousLoadData.boardId;
        }
    }

    function setBoardDesignOnScope (boardDesign) {
        if (boardDesign) {
            // Assign columns to scope if local storage already exists.
            $scope.columns = boardDesign.columns;
            $scope.loadedBoardName = boardDesign.name;
        }
    }

    function toggleMaxResultsForApiCall (maxResults) {
        if(maxResults === '' || maxResults.toLowerCase() === 'all' || !maxResults){
            $scope.maxResults = '-1';
        }
    }

    function setMaxResultsForUserInterface (maxResults) {
        if (maxResults === '-1' || maxResults.toLowerCase() === 'all' || !maxResults) {
            $scope.maxResults = '';
        }
    }

    // The following 4 get calls from chrome.storage are independent from one another,
    // So they don't need to be nested.
    previousLoadData.getPreviousLoadData(function (previousLoadData) {
        setPreviousLoadDataOnScope(previousLoadData);
    });

    localStorageHandler.getBoardDesign(function (boardDesign) {
        setBoardDesignOnScope(boardDesign.boardDesign);
    });

    localStorageHandler.getLoadedProject(function (loadedProject) {
        $scope.loadedProject = loadedProject;
    });

    localStorageHandler.getConfigs(function (configs) {
        // Assign user configs to scope if local storage already exists.
        $scope.userConfigs = configs.userConfigs;
    });

    /**
     * Get issues for the project.
     */
    $scope.getAllIssues = function () {
        setMaxResultsForUserInterface($scope.maxResults);
        previousLoadData.setPreviousLoadData($scope.boardId, $scope.apiProject, $scope.maxResults);

        if(!$scope.isLoggedIn){
            Notification.error('You are not logged in!');
        } else {
            boardColumnsDesign = {};
            apiIssuesMinimal = {};
            issues = [];

            getBoardDesignBeforeIssues = $q.defer();

            Notification.primary('Attempting to get data from server...');
            if(DEBUG){console.log("Attempting to get board design for board with ID: " + $scope.boardId + "...");}

            // Commented out the old rest call which nowadays is forbidden (private API).
            /*var requestBoardDesign = $http({
                method: "GET",
                url: $scope.apiRoot + "rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=" + $scope.boardId + "&selectedProjectKey=" + $scope.apiProject
            });*/
            var requestBoardDesign = $http({
                method: "GET",
                url: $scope.apiRoot + "rest/agile/1.0/board/" + $scope.boardId + "/configuration"
            });

            requestBoardDesign.success(function (data) {
                if(DEBUG){console.log("Get board design from API: SUCCESS!");}
                try{
                    boardColumnsDesign = createBoardDesign(data);
                    localStorageHandler.setBoardDesign(boardColumnsDesign);
                    localStorageHandler.setLoadedProject($scope.apiProject);
                    $scope.columns = boardColumnsDesign.columns;
                    $scope.loadedBoardName = boardColumnsDesign.name;
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
                if(DEBUG){console.log("Attempting to get issues for project " + $scope.apiProject + " from server " + $scope.apiRoot + "...");}
                toggleMaxResultsForApiCall($scope.maxResults);
                var requestIssues = $http({
                    method: "GET",
                    url: $scope.apiRoot + "rest/api/2/search?jql=project=" + $scope.apiProject + "&expand=changelog" + "&maxResults=" + $scope.maxResults
                });
                /*var requestIssues = $http({
                    method: "GET",
                    url: $scope.apiRoot + "rest/agile/1.0/board/" + $scope.boardId + "/issue?maxResults=" + $scope.maxResults + "&expand=changelog"
                });*/
                setMaxResultsForUserInterface($scope.maxResults);

                requestIssues.success(function (data) {
                    if(DEBUG){console.log("Get issues from API: SUCCESS!");}
                    apiIssuesMinimal = parseMultipleApiIssues(data);
                    try{
                        issues = createIssuesFromArray(apiIssuesMinimal, boardColumnsDesign);
                        localStorageHandler.setIssues(issues);
                        localStorageHandler.removeCfdData(); // Previously parsed CFD data is likely irrelevant when new source data is loaded, so remove it
                        Notification.success('Issue data successfully loaded!');
                        if(DEBUG){console.log("Parse issue data SUCCESS!");}
                    } catch(error) {
                        Notification.error('Something went wrong when parsing the issue data. Check your board configuration for abnormalities.');
                        if(DEBUG){console.log("Parsing of issues data ERROR: " + error);}
                    }
                });

                requestIssues.error(function (data) {
                    Notification.error('Failed to load issue data from source.');
                    if(DEBUG){console.log("Get issues from API: ERROR");}
                });
            });
        }
    };

    /**
     * Update the column categories to the user defined values.
     */
    $scope.updateColumnCategories = function (columnCategories) {
        var oldBoardDesign = {},
            oldIssues = [],
            updatedBoardDesign = {},
            updatedIssues = [];

        try{
            localStorageHandler.getBoardDesign(function (boardDesignCallback) {
                oldBoardDesign = createBoardDesign(boardDesignCallback.boardDesign);

                _.forEach(oldBoardDesign.columns, function (columnOutput) {
                    _.forEach(columnCategories, function (columnInput) {
                        if(columnInput.name === columnOutput.name){
                            columnOutput.category = columnInput.category;
                        }
                    });
                });

                updatedBoardDesign = createBoardDesign(oldBoardDesign);
                localStorageHandler.setBoardDesign(updatedBoardDesign);

                localStorageHandler.getIssues(function (issuesCallback) {
                    oldIssues = createIssuesFromArray(issuesCallback.issues, oldBoardDesign);
                    updatedIssues = createIssuesFromArray(oldIssues, updatedBoardDesign);
                    localStorageHandler.setIssues(updatedIssues);
                    Notification.success('Column categories have been updated.');
                });
            });
        } catch (error) {
            Notification.error('Column categories update failed.');
            if(DEBUG){console.log("Updating columns ERROR: " + error);}
        }
    };

    /**
     * Save the user choices for a set of columns for quick re-use.
     */
    $scope.saveConfig = function (name, columnCategories) {
        var userConfigs = [],
            isNameUnique = true;

        if (name === '' || !name || !name.replace(/\s/g, '').length) {
            Notification.error('Config was not saved. You must choose a name.');
            console.log("Input name is empty. Not adding config.");
        } else {
            console.log("Adding config.");
            localStorageHandler.getConfigs(function (configsCallback) {
                // Set userConfigs only if chrome storage exists.
                if (configsCallback.userConfigs) {
                    userConfigs = configsCallback.userConfigs;
                }

                // Search for a config with matching name
                _.forEach(userConfigs, function (config) {
                    if(config.name.toLowerCase() === name.toLowerCase()){
                        isNameUnique = false;
                        return false; // break loop if a matching name is found
                    }
                });

                if(!isNameUnique){
                    Notification.error('Config was not saved. Please choose a unique name.');
                    console.log("Config was not saved (duplicate name).");
                } else {
                    var newConfig = {"name": name, "columnCategories": columnCategories};
                    userConfigs.push(newConfig);
                    localStorageHandler.setConfigs(userConfigs);
                    $scope.userConfigs = userConfigs;
                    Notification.success('Config saved!');
                }
            });
        }
    };

    /**
     * Finds the currently selected config.
     */
    function getSelectedConfig (name, data) {
        var configs = data;
        var selectedConfig = {};
        if (configs) {
            _.forEach(configs, function (config) {
                if (config.name === name) {
                    selectedConfig = config;
                    return false;
                }
            });
            return selectedConfig;
        } else {
            return {};
        }
    }

    /**
     * Checks if the given column arrays have the same structure.
     */
    function haveSameColumnStructure(columnsToConfigurate, columns){
        if (columnsToConfigurate === columns){
            if(DEBUG){console.log("Columns are exactly equal!");}
            return true;
        }
        if (columnsToConfigurate == null || columns == null) {
            if(DEBUG){console.log("At least one column array is null!");}
            return false;
        }
        if (columnsToConfigurate.length != columns.length) {
            if(DEBUG){console.log("Lengths are not the same!");}
            return false;
        }

        for (var i = 0; i < columnsToConfigurate.length; ++i) {
            if (columnsToConfigurate[i].name !== columns[i].name) {
                if(DEBUG){console.log("Column names are not equal!");}
                return false;
            }
        }

        return true;
    }

    /**
     * Loads a chosen user config.
     */
    $scope.loadConfig = function (name) {
        var userConfigs = [];
        var selectedConfig = {};

        localStorageHandler.getConfigs(function (configsCallback) {
            if (configsCallback.userConfigs) {
                userConfigs = configsCallback.userConfigs;
            }

            selectedConfig = getSelectedConfig(name, userConfigs);

            if (haveSameColumnStructure($scope.columns, selectedConfig.columnCategories)) {
                $scope.loadedConfig = selectedConfig.name; // FIXME: in old code, this was fetched from local storage
                $scope.columns = selectedConfig.columnCategories;
                $scope.updateColumnCategories(selectedConfig.columnCategories); // Apply changes when config is loaded
                if(DEBUG){console.log("Config was successfully loaded.");}
            } else {
                Notification.error("The selected config is not compatible with the current board.");
                if(DEBUG){console.log("Config was not loaded.");}
            }
        });
    };
    // OLD CODE
    //$scope.loadConfig = function (name) {
    //    var config = {};
    //
    //    localStorageHandler.getSelectedConfig(name);
    //
    //    if(haveSameColumnStructure($scope.columns, config.columnCategories)){
    //        $scope.loadedConfig = localStorageHandler.getSelectedConfig(name).name;
    //        $scope.columns = config.columnCategories;
    //        if(DEBUG){console.log("Config was successfully loaded.");}
    //    } else {
    //        Notification.error("The selected config is not compatible with the current board.");
    //        if(DEBUG){console.log("Config was not loaded.");}
    //    }
    //};

    $scope.clearIssueAndBoardDesignData = function () {
        localStorageHandler.clearIssueAndBoardDesignData();
        Notification.primary('All issue and board design data removed from local storage.');
        console.log("All issue and board design data removed from local storage.");
    };

    /**
     * Clears all configs.
     */
    $scope.clearConfigs = function () {
        localStorageHandler.removeConfigs();
        $scope.userConfigs = [];
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
