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

    var coldistTestData =
        [
            {"key": "Ready to Refine", "values": [{"x": "KTD-1", "y": 50}, {"x": "KTD-2", "y": 70}, {"x": "KTD-3", "y": 10}]},
            {"key": "In Progress",     "values": [{"x": "KTD-1", "y": 30}, {"x": "KTD-2", "y": 20}, {"x": "KTD-3", "y": 30}]},
            {"key": "In Test",         "values": [{"x": "KTD-1", "y": 20}, {"x": "KTD-2", "y": 10}, {"x": "KTD-3", "y": 60}]}
        ];

    $scope.data = coldistTestData;

    localStorageHandler.getIssues(function (issuesCallback) {
        boardDesign = issuesCallback.boardDesign;
        localStorageHandler.getBoardDesign(function (boardDesignCallback) {
            issues = boardDesignCallback.issues;
            // $scope.data = createColDistData(issues, boardDesign);
            // console.log($scope.data);
        });
    });

    /* Random Data Generator (took from nvd3.org) */
    function generateData() {
        return stream_layers(3,50+Math.random()*50,.1).map(function(data, i) {
            return {
                key: 'Stream' + i,
                values: data
            };
        });
    }

    /* Inspired by Lee Byron's test data generator. */
    function stream_layers(n, m, o) {
        if (arguments.length < 3) o = 0;
        function bump(a) {
            var x = 1 / (.1 + Math.random()),
                y = 2 * Math.random() - .5,
                z = 10 / (.1 + Math.random());
            for (var i = 0; i < m; i++) {
                var w = (i / m - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }
        return d3.range(n).map(function() {
            var a = [], i;
            for (i = 0; i < m; i++) a[i] = o + o * Math.random();
            for (i = 0; i < 5; i++) bump(a);
            return a.map(stream_index);
        });
    }

    /* Another layer generator using gamma distributions. */
    function stream_waves(n, m) {
        return d3.range(n).map(function(i) {
            return d3.range(m).map(function(j) {
                var x = 20 * j / m - i / 3;
                return 2 * x * Math.exp(-.5 * x);
            }).map(stream_index);
        });
    }

    function stream_index(d, i) {
        return {x: i, y: Math.max(0, d)};
    }
});
