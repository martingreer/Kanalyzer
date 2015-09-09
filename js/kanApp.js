/*global angular, d3, get, console*/

var kanApp = angular.module('kanApp', ['ui.router', 'nvd3']);

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

kanApp.factory('dataService', function ($http) {
    "use strict";
    
    var dataService = {
        async: function () {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get('../json/data.json').then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return dataService;
});

kanApp.controller('dataController', function ($scope, dataService) {
    "use strict";
    
    $scope.prettyString = null;
    
    $scope.clearData = function () {
        $scope.data = {};
    };
    
    $scope.getData = function () {
        dataService.async().then(function (d) {
            $scope.data = d;
        });
    };
    
    $scope.jsonPrint = function () {
        if ($scope.prettyString === null) {
            $scope.prettyString = JSON.stringify($scope.data, null, "\t");
        } else {
            $scope.prettyString = null;
        }
    };
    
    $scope.jsonPrettyPrint = function () {
        var jsonData = $scope.data;
        /*jslint regexp: true*/
        if (typeof jsonData !== 'string') {
            jsonData = JSON.stringify(jsonData, undefined, 2);
        }
        jsonData = jsonData.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        $scope.prettyString = jsonData.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            /*jslint regexp: false*/
            $scope.prettyString = '<span class="' + cls + '">' + match + '</span>';
        });
    };
});

kanApp.controller('nvd3Controller', function ($scope, dataService) {
    "use strict";
    
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