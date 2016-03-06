/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

/**
 * Controller for the Column Distribution view.
 */
application.controller('coldistController', function ($scope, localStorageHandler) {
    "use strict";

    var DEBUG = true;

    var issues = [];
    var boardDesign = [];

    /**
     * Graph structure.
     */
    $scope.options = {
        chart: {
            type: 'multiBarChart',
            interactive: true,
            stacked: true,
            staggerLabels: true,
            duration: 400,
            transitionDuration: 350,
            xAxis: {
                axisLabel: 'Issue',
                axisLabelDistance: '0'
            },
            yAxis: {
                axisLabel: 'Time Spent (%)',
                axisLabelDistance: '0',
                tickFormat: function (d) {
                    return d3.format(',.0d')(d);
                }
            }
        },
        title: {
            enable: true,
            text: 'Column Distribution for Issues'
        }
    };

    localStorageHandler.getColDistData(function (colDistDataCallback) {
        if (colDistDataCallback.colDistData) {
            $scope.data = colDistDataCallback.colDistData;
        } else {
            localStorageHandler.getIssues(function (issuesCallback) {
                issues = issuesCallback.issues;
                localStorageHandler.getBoardDesign(function (boardDesignCallback) {
                    boardDesign = boardDesignCallback.boardDesign;
                    $scope.data = createColDistData(issues, boardDesign);
                    localStorageHandler.setColDistData($scope.data);
                });
            });
        }
    });
});
