/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

var kanApp = angular.module('kanApp', ['ui.router', 'nvd3']);
var DEBUG = true;

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
            templateUrl: 'pages/pe.html'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'pages/about.html'
        });
});

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

kanApp.factory('dataService', function ($http) {
    "use strict";
    
    var dataService = {
        async: function () {
            // $http returns a promise, which has a .then function, which also returns a promise
            var promise = $http.get('../json/data.json').then(function (response) {
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

kanApp.controller('dataController', function ($scope, dataService, Base64, $http) {
    "use strict";
    
    $scope.clearData = function () {
        $scope.data = {};
    };
    
    $scope.getData = function () {
        dataService.async().then(function (d) {
            $scope.data = d;
        });
    };
    
    $scope.prettyString = null;
    $scope.jsonPrint = function () {
        if ($scope.prettyString === null) {
            $scope.prettyString = JSON.stringify($scope.data, null, "\t");
        } else {
            $scope.prettyString = null;
        }
    };
    
    ////////////////////////////////
    // LOGIN: AUTH TO JIRA SERVER //
    ////////////////////////////////
    
    $scope.credentials = { username: 'martin.w.greer', password: ''};
    $scope.jiraRoot = 'https://kanalyzer.atlassian.net/';
    $scope.jiraProject = 'KTD';
    $scope.jiraServer = $scope.jiraRoot + 'projects/' +  $scope.jiraProject + '/issues';
    var maxResults = 10;
    
    $scope.login = function (credentials) {
        //$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization", "Access-Control-Allow-Origin": '*'};
        if(DEBUG){console.log($scope.jiraServer);}
        $http.defaults.headers.common = {"Access-Control-Allow-Origin": '*'};
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.credentials.username + ':' + $scope.credentials.password);
        $http({method: 'GET', url: $scope.jiraServer})
            .success(function (data) {
                if(DEBUG){console.log("Authentication SUCCESS");}
            })
            .error(function (data) {
                if(DEBUG){console.log("Authentication ERROR");}
            });
    };
    
    ////////////////////////////
    // GET ISSUES FOR PROJECT //
    ////////////////////////////
    
    $scope.title = "";
    $scope.description = "";
    $scope.jiraData = {
        currentIssue: null,
        issueList: [],
        issueListState: 'open',
        issueListSort: 'created',
        issueListDirection: 'desc',
        issueListPage: 1
    };
    
    $scope.getIssues = function () {
        var request = $http({
            method: "GET",
            url: $scope.jiraServer + "/rest/api/2/search?jql=project=" + $scope.jiraProject + "&maxResults="+maxResults
        });
        request.success(function (data) {
            $scope.jiraIssues = data.issues;
            $scope.jiraData.issueList = data.issues;
            if(DEBUG){console.log("SUCCESS! JIRA response: " + JSON.stringify(data));}
        });
        request.error(function (data) {
            if(DEBUG){console.log("ERROR! JIRA response: " + JSON.stringify(data));}
        });
    };
});

kanApp.controller('nvd3Controller', function ($scope, dataService) {
    "use strict";
    
    /////////////////////
    // GRAPH STRUCTURE //
    /////////////////////
    
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
    
    dataService.async().then(function (d) {
        $scope.data = d;
    });
});