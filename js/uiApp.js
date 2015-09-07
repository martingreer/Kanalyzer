/*global angular*/

var uiApp = angular.module('uiApp', ['ui.router']);

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
            controller: 'cfdController'
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

uiApp.controller('cfdController', function ($scope) {
    "use strict";
    
    $scope.name = "CFD Graph below";
    //$scope.$apply();
});