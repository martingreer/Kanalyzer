/*global angular, d3, get, console*/

var uiApp = angular.module('uiApp', ['ui.router', 'nvd3']);

uiApp.config(function ($stateProvider, $urlRouterProvider) {
    "use strict";
    
	$urlRouterProvider.otherwise('/ld');
	
	$stateProvider
        .state('ld', {
            url: '/ld',
            templateUrl: 'pages/ld.html'
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

uiApp.controller('nvd3Controller', function ($scope, $http) {
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
            x: function (d) {return d[0]; },
            y: function (d) {return d[1]; },
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
    
    $scope.data = [];
    
    $http.get('../json/cfdData.json').success(function (data) {
        console.log("JSON import successful!");
        $scope.data = data;
    });
});