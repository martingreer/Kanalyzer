var kanApp = angular.module('kanApp', ['ngRoute']);

kanApp.config(function($routeProvider){
	$routeProvider
	
	.when('/', {
		templateUrl : 'pages/ld.html',
		controller : 'ldController',
        activetab : 'load_data'
	})
	
	.when('/cfd', {
		templateUrl : 'pages/cfd.html',
		controller : 'cfdController',
        activetab : 'cfd'
	})
	
	.when('/pe', {
		templateUrl : 'pages/pe.html',
		controller : 'peController',
        activetab : 'pe'
	})
	
	.when('/about', {
		templateUrl : 'pages/about.html',
		controller : 'aboutController',
        activetab : 'about'
	});
});

kanApp.controller('ldController', function($scope){
	$scope.message = 'Hello world!';
});

kanApp.controller('cfdController', function($scope){
	$scope.message = 'CFD page';
});

kanApp.controller('peController', function($scope){
	$scope.message = 'Page for measuring Proccess Efficiency';
});

kanApp.controller('aboutController', function($scope){
	$scope.message = 'About the app';
});