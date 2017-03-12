/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

/**
 * Controller for the Execution Time vs Delay Time view.
 */
application.controller("etdtController", function ($scope, localStorageHandler, Notification) {
    "use strict";

    const DEBUG = true;

    let issues = [];

    localStorageHandler.getIssues(function (issuesCallback) {
        issues = issuesCallback.issues;
        try {
            $scope.data = createEtDtData("All issues", issues);
        } catch (error) {
            $scope.data = [];
        }
    });

    /**
     * Graph structure.
     */
    $scope.options = {
        chart: {
            type: "scatterChart",
            interactive: true,
            scatter: {
                onlyCircles: true
            },
            showDistX: false,
            showDistY: false,
            showLegend: false,
            useInteractiveGuideline: true,
            transitionDuration: 350,
            zoom: {
                enabled: true,
                scaleExtent: [1, 10],
                useFixedDomain: false,
                useNiceScale: false,
                horizontalOff: false,
                verticalOff: false,
                unzoomEventType: "dblclick.zoom"
            },
            xAxis: {
                axisLabel: "Delay Time (hours)",
                axisLabelDistance: "0"
            },
            yAxis: {
                axisLabel: "Execution Time (hours)",
                axisLabelDistance: "10"
            }
        },
        title: {
            enable: true,
            text: "Execution Time vs Delay Time"
        }
    };

    /**
     * Filters the issues to be shown in the graph up to the max Cycle Time value.
     */
    $scope.applyCycleTimeFilter = function (maxCycleTime) {
        const filteredIssues = [];

        if (maxCycleTime === "" || maxCycleTime === null || maxCycleTime === " " || maxCycleTime === undefined) {
            try {
                $scope.data = createEtDtData("All issues", issues);
                Notification.success("Filter removed.");
                if (DEBUG) {
                    console.log("Filter removed.");
                }
            } catch (error) {
                Notification.error("Removing filter failed.");
                $scope.data = [];
            }
        } else {
            _.forEach(issues, function (issue) {
                if (timeUtil.msToHours(issue.cycleTime) <= maxCycleTime && issue.cycleTime !== null) {
                    filteredIssues.push(issue);
                }
            });

            try {
                $scope.data = createEtDtData("All issues", filteredIssues);
                if (DEBUG) {
                    console.log("Graph data updated according to filter.");
                }
                Notification.success("Filter applied.");
            } catch (error) {
                Notification.error("Filter failed.");
                $scope.data = [];
            }
        }
    };

    /**
     * Resets current graph filter.
     */
    $scope.resetCycleTimeFilter = function () {
        try {
            $scope.data = createEtDtData("All issues", issues);
            Notification.success("Filter removed.");
            if (DEBUG) {
                console.log("Filter removed.");
            }
        } catch (error) {
            Notification.error("Removing filter failed.");
            $scope.data = [];
        }
    }
});
