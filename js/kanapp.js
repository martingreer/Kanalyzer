var kanApp = angular.module('kanApp', ['ui.router']);

kanApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/ld');
	
	$stateProvider
        .state('ld', {
            url: '/ld',
            templateUrl: 'pages/ld.html'
        })

        .state('cfd', {
            url: '/cfd',
            templateUrl: 'pages/cfd.html'
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