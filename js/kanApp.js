/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

var kanApp = angular.module('kanApp', ['ui.router', 'nvd3']);
var DEBUG = true;

/**
* Definition of angular views and their controllers.
*/
kanApp.config(function ($stateProvider, $urlRouterProvider) {
    "use strict";

	$urlRouterProvider.otherwise('/ld');

	$stateProvider
        .state('ld', {
            url: '/ld',
            templateUrl: 'pages/ld.html',
            controller: 'dataController'
        })

        .state('cfd', {
            url: '/cfd',
            templateUrl: 'pages/cfd.html',
            controller: 'nvd3Controller'
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

/**
* Service for getting all data from a json file.
*/
kanApp.factory('dataService', function ($http) {
    "use strict";

    var dataService = {
        async: function (path) {
            // $http returns a promise, which has a .then function, which also returns a promise
            var promise = $http.get(path).then(function (response) {
                // The .then function here is an opportunity to modify the response
                if(DEBUG){console.log(response);}
                // The return value gets picked up by the .then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return dataService;
});

/**
* Controller for the Load Data view.
*/
kanApp.controller('dataController', function ($scope, dataService, Base64, $http, $q) {
    "use strict";

    /**
    * Clear json data.
    * TAGS: unused
    */
    $scope.clearData = function () {
        $scope.data = {};
    };

    /**
    * Get data from JSON file.
    */
    $scope.getData = function () {
        dataService.async().then(function (d) {
            $scope.data = d;
        });
    };

    /**
    * Variables for logging in.
    */
    $scope.credentials = { username: 'martin.w.greer', password: ''};
    $scope.apiRoot = 'https://softhousegbg.atlassian.net/';
    $scope.apiProject = 'KTD';
    $scope.apiServer = $scope.apiRoot + 'projects/' +  $scope.apiProject + '/issues';

    /**
    * Login: Auth to API server.
    */
    $scope.login = function (credentials) {
        //$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization", "Access-Control-Allow-Origin": "*"};
        //$http.defaults.headers.common = {"Access-Control-Allow-Origin": "*"};
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
    $scope.logout = function (credentials) {
        if(DEBUG){console.log("Logging out from " + $scope.apiRoot + "...");}
        $scope.credentials = { username: 'martin.w.greer', password: '' };
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(' : ');
        $http({method: 'GET', url: $scope.apiServer})
            .success(function (data) {
                if(DEBUG){console.log("Logout ERROR.");}
            })
            .error(function (data) {
                if(DEBUG){console.log("Logout SUCCESS!");}
            });
    };

    // The max results to be returned from API (-1 is unlimited results).
    $scope.maxResults = -1;

    // Board ID to get column & status structure from.
    $scope.boardId = '12';

    // Synchronization variable to make sure http requests are done in the correct order.
    var getBoardDesignBeforeIssues = $q.defer();

    /**
    * Get all issues for the project that was given on login.
    */
    $scope.getAllIssues = function () {
        var boardColumnsDesign,
            apiIssuesMinimal,
            issues = [];

        getBoardDesignBeforeIssues = $q.defer();

        if(DEBUG){console.log("Attempting to get board design for project " + $scope.apiProject + "...");}

        var requestBoardDesign = $http({
            method: "GET",
            url: $scope.apiRoot + "rest/greenhopper/1.0/xboard/work/allData.json?rapidViewId=" + $scope.boardId + "&selectedProjectKey=" + $scope.apiProject
        });
        requestBoardDesign.success(function (data) {
            boardColumnsDesign = new BoardDesign(parseBoardDesign(data));
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
            var requestIssues = $http({
                method: "GET",
                url: $scope.apiRoot + "rest/api/2/search?jql=project=" + $scope.apiProject + "&expand=changelog" + "&maxResults=" + $scope.maxResults
            });
            requestIssues.success(function (data) {
                apiIssuesMinimal = parseMultipleApiIssues(data);
                _.forEach(apiIssuesMinimal, function(issue){
                    issues.push(new Issue(issue, boardColumnsDesign));
                });
                localStorage.setItem('issues', JSON.stringify(issues));
                if (DEBUG) {console.log("Get all issues SUCCESS!");}
            });
            requestIssues.error(function (data) {
                if (DEBUG) {console.log("Get all issues ERROR. API response: " + JSON.stringify(data));}
            });
        });
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
kanApp.controller('nvd3Controller', function ($scope, dataService) {
    "use strict";

    /**
    * Graph structure.
    */
    $scope.options = {
        chart: {
            type: 'stackedAreaChart',
            height: 450,
            margin: {
                top: 20,
                right: 1150,
                bottom: 60,
                left: 40
            },
            x: function (d) { return d[0]; },
            y: function (d) { return d[1]; },
            useVoronoi: false,
            clipEdge: true,
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
        }
    };

    /**
    * Get json data from file when opening CFD page. (REMOVE LATER - WE WANT GLOBAL STORAGE IN VARIABLES)
    */
    dataService.async('../json/graphTestData.json').then(function (d) {
        $scope.data = d;
    });
});

/**
 * Controller for the Process Efficiency tab.
 */
kanApp.controller('peController', function ($scope) {
    var issues = JSON.parse(localStorage.getItem('issues')),
        boardDesign = new BoardDesign(JSON.parse(localStorage.getItem('boardDesign'))),
        cumulativeCycleTime = 0,
        amountOfCycleTimes = 0;

    _.forEach(issues, function(issue) {
        if(issue.cycleTime != null){
            cumulativeCycleTime += issue.cycleTime;
            amountOfCycleTimes++;
        }
    });

    $scope.averageCycleTime = timeUtil.convertMillisecondsToDaysHoursMinutes(cumulativeCycleTime/amountOfCycleTimes);
});
