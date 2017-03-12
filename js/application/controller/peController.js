/*global angular, d3, get, console*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

/**
 * Controller for the Process Efficiency tab.
 */
application.controller("peController", function ($scope, localStorageHandler) {

    let cumulativeProcessEfficiency = 0;
    let amountOfProcessEfficiencies = 0;
    let cumulativeCycleTime = 0;
    let amountOfCycleTimes = 0;
    let cumulativeExecutionTime = 0;
    let amountOfExecutionTimes = 0;
    let cumulativeDelayTime = 0;
    let amountOfDelayTimes = 0;
    let allIssues = [];
    let issues;
    let issuesNotDoneOrBadlyTracked;

    localStorageHandler.getIssues(function (issuesCallback) {
        allIssues = issuesCallback.issues;

        issuesNotDoneOrBadlyTracked = _.filter(allIssues, function (issue) {
            return issue.cycleTime === 0 || issue.processEfficiency === 0;
        });

        issues = _.filter(allIssues, function (issue) {
            return issue.cycleTime !== 0 && issue.processEfficiency !== 0;
        });

        /**
         * Calculates the average values for the collection of issues.
         */
        _.forEach(issues, function (issue) {
            if (issue.processEfficiency > 0) {
                const processEfficiency = convertToPercent(issue.processEfficiency);
                let type;

                issue.processEfficiencyConverted = processEfficiency + "%";
                cumulativeProcessEfficiency += processEfficiency;
                amountOfProcessEfficiencies++;

                if (processEfficiency < 15) {
                    type = "danger";
                } else if (processEfficiency < 25) {
                    type = "warning";
                } else {
                    type = "success";
                }

                issue.barDynamic = processEfficiency;
                issue.barType = type;
            }
            if (issue.cycleTime > 0) {
                issue.cycleTimeConverted = timeUtil.convertMsToDHM(issue.cycleTime);
                cumulativeCycleTime += issue.cycleTime;
                amountOfCycleTimes++;
            }
            if (issue.executionTime > 0) {
                cumulativeExecutionTime += issue.executionTime;
                amountOfExecutionTimes++;
            }
            if (issue.delayTime > 0) {
                cumulativeDelayTime += issue.delayTime;
                amountOfDelayTimes++;
            }
        });

        _.forEach(issuesNotDoneOrBadlyTracked, function (issue) {
            issue.processEfficiencyConverted = "Not done or badly tracked";
        });

        issues = _.sortByOrder(issues, ["processEfficiency", "cycleTime"], ["asc", "desc"]);

        _.forEach(issuesNotDoneOrBadlyTracked, function (issue) {
            issues.push(issue);
        });

        $scope.issues = issues;
        $scope.averageProcessEfficiency = Math.round(cumulativeProcessEfficiency / amountOfProcessEfficiencies) + "%";
        $scope.averageCycleTime = timeUtil.convertMsToDHM(cumulativeCycleTime / amountOfCycleTimes);
        $scope.averageExecutionTime = timeUtil.convertMsToDHM(cumulativeExecutionTime / amountOfExecutionTimes);
        $scope.averageDelayTime = timeUtil.convertMsToDHM(cumulativeDelayTime / amountOfDelayTimes);

        // Build data for visual process efficiency status bars
        averageProcessEfficiencyBar();
    });

    function convertToPercent(decimal) {
        return Math.round(decimal * 100);
    }

    function averageProcessEfficiencyBar() {
        const barValue = Math.round(cumulativeProcessEfficiency / amountOfProcessEfficiencies);
        let barType;

        if (barValue < 15) {
            barType = "danger";
        } else if (barValue < 25) {
            barType = "warning";
        } else {
            barType = "success";
        }

        $scope.avgPeBarValue = barValue;
        $scope.avgPeBarType = barType;
    }
});
