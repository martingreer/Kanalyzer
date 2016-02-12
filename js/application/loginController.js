/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

/**
 * Controller for the Log In view.
 */
application.controller('loginController', function($scope, Base64, $http, apiServerData, previousLogin, Notification){
    "use strict";

    var DEBUG = true;

    // Variables for logging in to API server.
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.apiRoot = '';

    function setPreviousValues(previousLogin) {
        $scope.credentials.username = previousLogin.userName;
        $scope.apiRoot = previousLogin.url;
        apiServerData.setApiRoot($scope.apiRoot);
        // Decides what is being shown in the login view.
        $scope.isLoggedIn = apiServerData.getIsLoggedIn();
    }

    console.log("GET previousLogin attempt...");
    /**
     * Fetches previous values (except password) from previous login attempt.
     */
    previousLogin.getPreviousLogin(function (previousLogin) {
        setPreviousValues(previousLogin);
        console.log("GET previousLogin success!")
    });

    /**
     * Login: Auth to API server.
     */
    $scope.login = function () {
        // If the last character of the given url does not end with a forward slash, add a forward slash to the variable.
        if($scope.apiRoot.slice(-1) !== "/"){
            $scope.apiRoot += "/";
        }

        previousLogin.setPreviousLogin($scope.apiRoot, $scope.credentials.username);
        apiServerData.setApiRoot($scope.apiRoot);
        $scope.apiServer = apiServerData.getApiServer('jira');
        Notification.primary('Logging in...');
        if(DEBUG){console.log("Attempting to authenticate to server " + $scope.apiRoot + "...");}

        // Attempt cookie auth
        var login = $http({
            method: 'POST',
            url: $scope.apiRoot + "rest/auth/1/session",
            data: {
                'username': $scope.credentials.username,
                'password': $scope.credentials.password
            },
            headers: {
                'Content-Type': "application/json",
                'upgrade-insecure-requests': 1
            }
        });
        login.success(function (response) {
            //$http.defaults.headers.common['Cookie'] = response.session.name + "=" + response.session.value;
            console.log("Cookie set: " + response.session.name + "=" + response.session.value);
            apiServerData.setIsLoggedIn(true);
            $scope.isLoggedIn = apiServerData.getIsLoggedIn();
            Notification.success('Login successful!');
            if(DEBUG){console.log("User " + $scope.credentials.username + " is now logged in!");}
        });
        login.error(function () {
            apiServerData.setIsLoggedIn(false);
            Notification.error('Login failed, please try again.');
            if(DEBUG){console.log("Login failed.");}
        });
    };

    /**
     * Log out by simply removing the cookie header and setting FE logged in status to false.
     */
    $scope.logout = function () {
        //$http.defaults.headers.common['Cookie'] = '';
        apiServerData.setIsLoggedIn(false);
        $scope.isLoggedIn = apiServerData.getIsLoggedIn();
        Notification.primary('You have been logged out.');
        if(DEBUG){console.log("User " + $scope.credentials.username + " has logged out.");}
    };
});
