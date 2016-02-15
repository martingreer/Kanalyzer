/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

/**
 * Controller for the CFD view.
 */
application.controller('cfdController', function ($scope, localStorageHandler) {
    "use strict";

    var DEBUG = true;

    var issues = [],
        boardDesign = {},
        allCfdData = [],
        allCfdDataDoneColumnInitialValue = 0,
        doneColumnPreviousInitialValue = 0,
        doneColumnInitialValue = 0;

    // First get issues from chrome.storage
    localStorageHandler.getIssues(function (issuesCallback) {
        // Since only objects can be stored in chrome.storage, parse out the issues array from the stored object.
        issues = parseMultipleApiIssues(issuesCallback);

        // Datepicker variables.
        $scope.minDate = $scope.startDate = getFirstHistoryDate(issues);
        $scope.maxDate = $scope.endDate = getLastHistoryDate(issues);

        // Then get board design from chrome.storage
        localStorageHandler.getBoardDesign(function (boardDesignCallback) {
            boardDesign = boardDesignCallback;

            // Finally operate on the set variables
            try{
                allCfdData = createCfdData(issues, boardDesign);
                allCfdDataDoneColumnInitialValue = (_.first(_.first(allCfdData).values).y);
            } catch (error) {
                allCfdData = [];
            }

            $scope.data = allCfdData;
            $scope.startFromZero = false;
        });
    });

    // Datepicker options.
    $scope.dateFormat = 'yyyy-MM-dd';
    $scope.startDateStatus = {
        opened: false
    };
    $scope.endDateStatus = {
        opened: false
    };
    $scope.datepickerOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

    // Open the datepicker UI for the start date.
    $scope.openStartDate = function($event) {
        $scope.startDateStatus.opened = true;
    };

    // Open the datepicker UI for the end date.
    $scope.openEndDate = function($event) {
        $scope.endDateStatus.opened = true;
    };

    /**
     * Graph structure.
     */
    $scope.options = {
        chart: {
            type: 'stackedAreaChart',
            width: 1000,
            useVoronoi: false,
            transitionDuration: 500,
            useInteractiveGuideline: true,
            xAxis: {
                showMaxMin: false,
                tickFormat: function (d) {
                    return d3.time.format('%Y-%m-%d')(new Date(d));
                }
            },
            yAxis: {
                tickFormat: function (d) {
                    return d3.format(',.0d')(d);
                }
            }
        },
        title: {
            enable: true,
            text: 'Cumulative Flow Diagram'
        }
    };

    /**
     * Apply a given date filter for the CFD graph.
     */
    $scope.applyCfdDateFilter = function (startDate, endDate, startFromZero) {
        var oneDay = 86400000,
            _startDate = Date.parse(new Date(startDate))-oneDay,
            _endDate = Date.parse(new Date(endDate)),
            columnArray = [],
            dateArray = [];

        // TODO: Fix bug when "start from 0" is pressed and then apply filter.
        function filterWithDoneStartFromZero (data) {
            if(DEBUG){console.log("Applying filter: " + startDate + " to " + endDate + " and Done from ZERO.");}
            columnArray = [];
            _.forEach(data, function (cfdColumnItem) {
                dateArray = [];
                _.forEach(cfdColumnItem.values, function (valuesItem){
                    // x attribute is the date.
                    if(valuesItem.x >= _startDate && valuesItem.x <= _endDate){
                        dateArray.push(valuesItem);
                    }
                });
                columnArray.push({"key": cfdColumnItem.key, "values": dateArray});
            });

            console.log("Previous value: " + doneColumnPreviousInitialValue + " -> " + (_.first(_.first(columnArray).values).y));
            doneColumnInitialValue = doneColumnPreviousInitialValue = (_.first(_.first(columnArray).values).y);
            _.forEach(_.first(columnArray).values, function (value) {
                // y attribute is the number of issues in the date.
                value.y -= doneColumnInitialValue;
            });

            return columnArray;
        }

        /**
         * Normal case: If "Done start from 0" checkbox is unchecked.
         * Filters CFD data between start date and end date.
         */
        function filterNormal (data) {
            if(DEBUG){console.log("Applying filter: " + startDate + " to " + endDate + ".");}
            columnArray = [];
            _.forEach(data, function (cfdColumnItem) {
                dateArray = [];
                _.forEach(cfdColumnItem.values, function (valuesItem){
                    // x attribute is the date.
                    if(valuesItem.x >= _startDate && valuesItem.x <= _endDate){
                        dateArray.push(valuesItem);
                    }
                });
                columnArray.push({"key": cfdColumnItem.key, "values": dateArray});

                /*_.forEach(_.first(columnArray).values, function (value) {
                 value.y += doneColumnPreviousInitialValue;
                 });*/
            });

            return columnArray;
        }

        function filterDates (data, startFromZero) {
            var _columnArray = [];

            if(startFromZero){
                _columnArray = filterWithDoneStartFromZero(data);
            } else {
                _columnArray = filterNormal(data);
            }

            return _columnArray;
        }

        $scope.data = filterDates(allCfdData, startFromZero);
    };

    /**
     * Removes the CFD date filter by resetting the scope data to initial value.
     */
    $scope.removeCfdDateFilter = function (startFromZero) {

        if (startFromZero) {
            if(DEBUG){console.log("Filter removed (done from zero).");}
            var _allCfdData = _.cloneDeep(allCfdData);
            console.log("Initial value: " + doneColumnInitialValue + " -> " + allCfdDataDoneColumnInitialValue);
            doneColumnInitialValue = allCfdDataDoneColumnInitialValue;
            _.forEach(_.first(_allCfdData).values, function (value) {
                // y attribute is the number of issues in the date.
                value.y -= doneColumnInitialValue;
            });
            $scope.data = allCfdData;
        } else {
            if(DEBUG){console.log("Filter removed.");}
            $scope.data = allCfdData;
        }
    };

    /**
     * Toggles whether the done column should start from zero for the current filter.
     */
    function toggleDoneColumnValues (data, startFromZero) {
        var columnArray = [];

        if(startFromZero){
            if(DEBUG){console.log("Done column starts from zero.");}
            columnArray = _.cloneDeep(data);
            console.log("Previous value: " + doneColumnPreviousInitialValue + " -> " + (_.first(_.first(columnArray).values).y));
            doneColumnInitialValue = doneColumnPreviousInitialValue = (_.first(_.first(columnArray).values).y);
            _.forEach(_.first(columnArray).values, function (value) {
                // y attribute is the number of issues in the date.
                value.y -= doneColumnInitialValue;
            });
        } else if (!startFromZero && (data == allCfdData)) {
            console.log("Scope CFD data equals original CFD data");
            columnArray = allCfdData;
        } else {
            if(DEBUG){console.log("Done column starts from actual value.");}
            columnArray = _.cloneDeep(data);
            console.log("Previous value: " + doneColumnPreviousInitialValue);
            _.forEach(_.first(columnArray).values, function (value) {
                value.y += doneColumnPreviousInitialValue;
            });
        }

        return columnArray;
    }

    /**
     * Toggles if the graph should reset the amount of issues in Done column
     * for the first date.
     */
    $scope.applyStartFromZero = function (startFromZero) {
        $scope.data = toggleDoneColumnValues($scope.data, startFromZero);
    }
});
