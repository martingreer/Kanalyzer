/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

var kanApp = angular.module('kanApp', ['ui.router', 'nvd3']);
var DEBUG = true;

/**
* Definition of angular views and their controllers.
*/
kanApp.config(function ($stateProvider, $urlRouterProvider) {
    "use strict";

	$urlRouterProvider.otherwise('/login');

	$stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })

        .state('ld', {
            url: '/ld',
            templateUrl: 'pages/ld.html',
            controller: 'ldController'
        })

        .state('cfd', {
            url: '/cfd',
            templateUrl: 'pages/cfd.html',
            controller: 'cfdController'
        })

        .state('etdt', {
            url: '/etdt',
            templateUrl: 'pages/etdt.html',
            controller: 'etdtController'
        })

        .state('pe', {
            url: '/pe',
            templateUrl: 'pages/pe.html',
            controller: 'peController'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'pages/about.html'
        });
});

/**
* Base64 encoding + decoding for use in http requests.
*/
kanApp.factory('Base64', function () {
    "use strict";
    /*jslint regexp: true*/

    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = "",
                chr1, chr2, chr3 = "",
                enc1, enc2, enc3, enc4 = "",
                i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "",
                chr1, chr2, chr3 = "",
                enc1, enc2, enc3, enc4 = "",
                i = 0,
                base64test = /[^A-Za-z0-9\+\/\=]/g,
                alert;

            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);
            /*jslint regexp: false*/
            return output;
        }
    };
});

kanApp.factory('apiServerData', function(){
    var data = {
        apiRoot: '',
        apiProject: ''
    };

    return {
        getApiRoot: function () {
            return data.apiRoot;
        },
        setApiRoot: function (apiRoot) {
            data.apiRoot = apiRoot;
        }
    }
});

kanApp.controller('loginController', function($scope, Base64, $http, apiServerData){
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
        //$http.defaults.headers.common = {"Access-Control-Allow-Origin": "*"};
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
kanApp.controller('ldController', function ($scope, $http, $q, apiServerData) {
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
    if(localStorage.getItem('boardDesign')){
        $scope.columns = JSON.parse(localStorage.getItem('boardDesign')).columns;
    } else {
        $scope.columns = [];
    }

    // Assign user configs to scope if local storage already exists.
    if(localStorage.getItem('userConfigs')){
        $scope.userConfigs = JSON.parse(localStorage.getItem('userConfigs'));
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
            localStorage.setItem('boardDesign', JSON.stringify(boardColumnsDesign));
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
                                localStorage.setItem('issues', JSON.stringify(issues));
                if (DEBUG) {console.log("Get all issues SUCCESS!");}
            });
            requestIssues.error(function (data) {
                if (DEBUG) {console.log("Get all issues ERROR. API response: " + JSON.stringify(data));}
            });
        });

        if(localStorage.getItem('boardDesign')){
            $scope.columns = JSON.parse(localStorage.getItem('boardDesign')).columns;
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

        oldBoardDesign = createBoardDesign(JSON.parse(localStorage.getItem('boardDesign')));
        oldIssues = createIssuesFromArray(JSON.parse(localStorage.getItem('issues')), oldBoardDesign);

        _.forEach(oldBoardDesign.columns, function (columnOutput) {
            _.forEach(columnCategories, function (columnInput) {
                if(columnInput.name === columnOutput.name){
                    columnOutput.category = columnInput.category;
                }
            });
        });

        updatedBoardDesign = createBoardDesign(oldBoardDesign);
        updatedIssues = createIssuesFromArray(oldIssues, updatedBoardDesign);

        localStorage.removeItem('boardDesign');
        localStorage.removeItem('issues');
        localStorage.setItem('boardDesign', JSON.stringify(updatedBoardDesign));
        localStorage.setItem('issues', JSON.stringify(updatedIssues));
    };

    /**
     * Save the user choices for a set of columns for quick re-use.
     */
    $scope.saveConfig = function (name, columnCategories) {
        var userConfigs,
            isNameUnique = true;

        if(localStorage.getItem('userConfigs') === null){
            console.log("No previous configs! Creating new.");
            userConfigs = [];
        } else {
            console.log("Previous config exists! Adding this config to it.");
            userConfigs = JSON.parse(localStorage.getItem('userConfigs'));
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

            localStorage.setItem('userConfigs', JSON.stringify(userConfigs));
            console.log(localStorage.getItem('userConfigs'));
        }
    };

    /**
     * Loads a chosen user config.
     */
    $scope.loadConfig = function (name) {
        var userConfigs = JSON.parse(localStorage.getItem('userConfigs'));

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
        localStorage.removeItem('userConfigs');
    };

    /**
     * Print board design directly in the application (for debugging).
     */
    $scope.boardDesignString = null;
    $scope.printBoardDesign = function () {
        if ($scope.boardDesignString === null) {
            $scope.boardDesignString = localStorage.getItem('boardDesign');
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
            $scope.allIssuesString = localStorage.getItem('issues');
        } else {
            $scope.allIssuesString = null;
        }
    };
});

/**
* Controller for the CFD view.
*/
kanApp.controller('cfdController', function ($scope, $http) {
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

kanApp.controller('etdtController', function ($scope) {
    "use strict";

    if(localStorage.getItem('issues')){
        var issues = JSON.parse(localStorage.getItem('issues'));
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
kanApp.controller('peController', function ($scope) {
    var cumulativeCycleTime = 0,
        amountOfCycleTimes = 0;

    if(localStorage.getItem('issues')) {
        $scope.issues = JSON.parse(localStorage.getItem('issues'));
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
