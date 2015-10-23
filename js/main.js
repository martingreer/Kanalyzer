var application = angular.module('kanApp', ['ui.router', 'nvd3', 'ui-notification'])
    .config(function(NotificationProvider){
        NotificationProvider.setOptions({
            delay: 3000,
            startTop: 40,
            positionX: "center",
            positionY: "top"
        });
    });
