/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

/**
 * Controller for the Log In view.
 */
application.controller('loginController', function($scope, Base64, $http, apiServerData, previousLogin, Notification){
    "use strict";

    var DEBUG = true;

    // Variables for logging in to API server.
    $scope.credentials = { username: previousLogin.getUserName(), password: ''};
    $scope.apiRoot = previousLogin.getUrl();
    apiServerData.setApiRoot($scope.apiRoot);

    // This variable decides what is being shown in the login view.
    $scope.isLoggedIn = apiServerData.getIsLoggedIn();

    /**
     * Login: Auth to API server.
     */
    $scope.login = function () {
        //$http.defaults.headers.common = {"Access-Control-Request-Headers": "accept, origin, authorization", "Access-Control-Allow-Origin": "*"};
        //$http.defaults.headers.common = {"Access-Control-Allow-Origin": "*"};
        previousLogin.setPreviousLogin($scope.apiRoot, $scope.credentials.username);

        // If the last character of the given url does not end with a forward slash, add a forward slash to the variable.
        if($scope.apiRoot.slice(-1) !== "/"){
            $scope.apiRoot += "/";
        }

        apiServerData.setApiRoot($scope.apiRoot);
        $scope.apiServer = apiServerData.getApiServer('jira');
        Notification.primary('Logging in...');
        if(DEBUG){console.log("Attempting to authenticate to server " + $scope.apiRoot + "...");}
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode($scope.credentials.username + ':' + $scope.credentials.password);
        $http({method: 'GET', url: $scope.apiServer})
            .success(function () {
                apiServerData.setIsLoggedIn(true);
                $scope.isLoggedIn = apiServerData.getIsLoggedIn();
                Notification.success('Login successful!');
                if(DEBUG){console.log("User " + $scope.credentials.username + " is now logged in!");}
            })
            .error(function () {
                apiServerData.setIsLoggedIn(false);
                Notification.error('Login failed, please try again.');
                if(DEBUG){console.log("Login failed.");}
            });
    };

    /**
     * Log out by sending empty login details and getting rejected (there is no log out support for this API).
     */
    $scope.logout = function () {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(' : ');
        $scope.apiServer = apiServerData.getApiServer('jira');
        if(DEBUG){console.log("Attempting to log out...");}
        $http({method: 'GET', url: $scope.apiServer})
            .success(function () {
                Notification.error('Logout failed, please try again.');
                if(DEBUG){console.log("Logout failed.");}
            })
            .error(function () {
                apiServerData.setIsLoggedIn(false);
                $scope.isLoggedIn = apiServerData.getIsLoggedIn();
                Notification.primary('You have been logged out.');
                if(DEBUG){console.log("User " + $scope.credentials.username + " has logged out.");}
            });
    };
});
