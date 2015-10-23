/**
 * Definition of angular views and their controllers.
 */
application.config(function ($stateProvider, $urlRouterProvider) {
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
