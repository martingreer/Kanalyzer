describe("Execution Time vs Delay Time graph", function () {
    "use strict";

    let twoIssues = fourParsedDoneIssues;

    describe("Two done issues", function () {
        let etDtData = [],
            key,
            firstIssueData,
            secondIssueData;

        beforeEach(function () {
            etDtData = _.first(createEtDtData("Two done issues", twoIssues));
            key = etDtData.key;
            firstIssueData = etDtData.values[0];
            secondIssueData = etDtData.values[1];
        });

        it("the data group should have a key", function () {
            expect(key).toBe("Two done issues");
        });

        it("first issue should have a key", function () {
            expect(firstIssueData.key).toBe("KTD-60");
        });

        it("first issue should have an execution time", function () {
            expect(firstIssueData.y).toBe(0.72);
        });

        it("second issue should have a delay time", function () {
            expect(secondIssueData.x).toBe(0.73);
        });

        it("second issue should have a size", function () {
            expect(secondIssueData.size).toBe(1.25);
        });
    });
});

describe("CFD graph", function () {
    "use strict";

    let fourIssues = fourParsedDoneIssues;
    let boardDesign = columnsData;

    describe("Dates", function () {
        it("should return the last date found in column history between the issues", function () {
            let lastHistoryDay = new Date(getLastHistoryDate(fourIssues));
            lastHistoryDay = lastHistoryDay.customFormat("#YYYY#-#MM#-#DD#");
            expect(lastHistoryDay).toBe("2015-10-27");
        });

        it("should return the first date found in column history between the issues", function () {
            let firstHistoryDay = new Date(getFirstHistoryDate(fourIssues));
            firstHistoryDay = firstHistoryDay.customFormat("#YYYY#-#MM#-#DD#");
            expect(firstHistoryDay).toBe("2015-10-21");
        });

        it("should return array of all dates in interval", function () {
            let i = 0,
                dates = getDates(fourIssues);
            _.forEach(dates, function (date) {
                date = new Date(date);
                dates[i] = date.customFormat("#YYYY#-#MM#-#DD#");
                i++;
            });
            expect(dates).toEqual(["2015-10-21", "2015-10-22", "2015-10-23", "2015-10-24", "2015-10-25", "2015-10-26", "2015-10-27"]);
        });
    });

    describe("Parser", function () {
        let array = [1, 2, 3, 4, 5];

        it("array should contain value", function () {
            expect(isInArray(4, array)).toBeTruthy();
        });

        it("array should not contain value", function () {
            expect(isInArray(7, array)).toBeFalsy();
        });

        approveIt("should return an array of dates and amount of issues for the In Progress column", function (approvals) {
            let dates = getDates(fourIssues),
                amountOfIssues = new CfdColumnValuesArray(dates, fourIssues, boardDesign, "In Progress");
            approvals.verify(amountOfIssues);
        });

        approveIt("should return an array of dates and amount of issues for the Ready for Release column", function (approvals) {
            let dates = getDates(fourIssues),
                amountOfIssues = new CfdColumnValuesArray(dates, fourIssues, boardDesign, "Ready for Release");
            approvals.verify(amountOfIssues);
        });

        /*approveIt("should return an array of complete CFD data", function(approvals){
         let boardDesign = new BoardDesign(columnsData),
         graphArray = createCfdData(fourIssues, boardDesign);
         approvals.verify(graphArray);
         });*/
    });
});

describe("Column Distribution Graph", function () {
    "use strict";

    let oneDoneIssue = oneParsedDoneIssueForColDistGraph;
    let fourDoneIssues = fourParsedDoneIssuesForColDistGraph;
    let oneNotDoneIssue = oneParsedNotDoneIssue;
    let twoIssuesDoneAndNotDone = twoParsedIssuesOneDoneAndOneNotDone;
    let oneDoneReopenedIssueFromNewKANProject = oneParsedDoneReopenedIssueFromNewKANProject;
    let oneInProgressReopenedIssueFromNewKANProject = oneParsedInProgressReopenedIssueFromNewKANProject;
    let boardDesignNewKANProject = boardDesignFromNewKANProject;
    let boardDesign = boardDesignForColDistGraph;

    describe("Get time spent", function () {
        it("should return the total time spent in column when it has been in column more than once", function () {
            expect(getTimeSpentInColumn(oneDoneIssue, "Ready for Development")).toBe(224090000);
        });

        it("should return the total time spent in the Ready for Release column", function () {
            expect(getTimeSpentInColumn(oneDoneIssue, "Ready for Release")).toBe(49000);
        });

        it("should return the total time spent in the Ready to Analyze column", function () {
            expect(getTimeSpentInColumn(oneDoneIssue, "Ready for Test")).toBe(0);
        });
    });

    describe("Convert time spent to percent", function () {
        it("should round correctly to two decimals", function () {
            expect(Math.round(100.13999999999999 * 100) / 100).toBe(100.14);
        });

        it("should be 0 percent if issue is not done", function () {
            let timeSpentInColumn = getTimeSpentInColumn(oneNotDoneIssue, "In Progress");
            expect(convertTimeToPercent(timeSpentInColumn, oneNotDoneIssue.cycleTime, "Execution", false)).toBe(0);
        });

        it("should be 0 percent if issue was never in column", function () {
            let timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Under Test");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Execution", false)).toBe(0);
        });

        it("should be 0 percent if column is ignore category", function () {
            let timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Ready to Refine");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Ignore", false)).toBe(0);
        });

        it("should be 0 percent if column is done category", function () {
            let timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Ready for Release");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Done", false)).toBe(0);
            timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[3], "Ready for Release");
            expect(convertTimeToPercent(timeSpentInColumn, fourDoneIssues[3].cycleTime, "Done", false)).toBe(0);
        });

        it("should be 0 percent if column doesn't exist", function () {
            let timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Herpaderp");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Execution", false)).toBe(0);
        });

        it("should calculate percentage of time spent in given column for a done issue", function () {
            let timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Ready to Analyze");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Delay", false)).toBe(0.75);
            timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Ready for Development");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Execution", false)).toBe(2.25);
            timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "In Progress");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Execution", false)).toBe(96.11);
        });

        it("should calculate percentage of time spent in given column for another done issue", function () {
            let timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[1], "Ready to Analyze");
            expect(convertTimeToPercent(timeSpentInColumn, fourDoneIssues[1].cycleTime, "Delay", false)).toBe(3.24);
            timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[1], "In Progress");
            expect(convertTimeToPercent(timeSpentInColumn, fourDoneIssues[1].cycleTime, "Execution", false)).toBe(20.04);
            timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[1], "Under Test");
            expect(convertTimeToPercent(timeSpentInColumn, fourDoneIssues[1].cycleTime, "Execution", false)).toBe(73.42);
        });

        it("percentages should add upp to roughly 100 for a done issue", function () {
            let timeSpentInColumn = 0;
            let totalPercent = 0;
            _.forEach(boardDesign.columns, function (column) {
                timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, column.name);
                totalPercent += convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, column.category, false);
            });
            expect(Math.round(totalPercent)).toBe(100);
        });

        it("percentages should add upp to roughly 100 for another done issue", function () {
            let timeSpentInColumn = 0;
            let totalPercent = 0;
            _.forEach(boardDesign.columns, function (column) {
                timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[2], column.name);
                totalPercent += convertTimeToPercent(timeSpentInColumn, fourDoneIssues[2].cycleTime, column.category, false);
            });
            expect(Math.round(totalPercent)).toBe(100);
        });

        it("percentages should add upp to roughly 100 for a third done issue", function () {
            let timeSpentInColumn = 0;
            let totalPercent = 0;
            _.forEach(boardDesign.columns, function (column) {
                timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[3], column.name);
                totalPercent += convertTimeToPercent(timeSpentInColumn, fourDoneIssues[3].cycleTime, column.category, false);
            });
            expect(Math.round(totalPercent)).toBe(100);
        });

        it("percentages should add upp to exactly 100 for an issue that was done, reopened then done again", function () {
            let timeSpentInColumn = 0;
            let totalPercent = 0;

            // Mock what happens in ColDistValuesArray constructor because issue was reopened.
            let _oneDoneReopenedIssueFromNewKANProject = _.cloneDeep(oneDoneReopenedIssueFromNewKANProject);
            _oneDoneReopenedIssueFromNewKANProject.columnHistory.pop();

            _.forEach(boardDesignNewKANProject.columns, function (column) {
                timeSpentInColumn = getTimeSpentInColumn(_oneDoneReopenedIssueFromNewKANProject, column.name);
                totalPercent += convertTimeToPercent(timeSpentInColumn, _oneDoneReopenedIssueFromNewKANProject.cycleTime,
                    column.category, _oneDoneReopenedIssueFromNewKANProject.wasReopened);
            });
            expect(totalPercent).toBe(100);
        });

        it("percentage should be exactly 0 for an issue that was done, reopened and currently in progress", function () {
            let timeSpentInColumn = 0;
            let totalPercent = 0;

            // Mock what happens in ColDistValuesArray constructor because issue was reopened.
            let _oneInProgressReopenedIssueFromNewKANProject = _.cloneDeep(oneInProgressReopenedIssueFromNewKANProject);
            _oneInProgressReopenedIssueFromNewKANProject.columnHistory.pop();

            _.forEach(boardDesignNewKANProject.columns, function (column) {
                timeSpentInColumn = getTimeSpentInColumn(_oneInProgressReopenedIssueFromNewKANProject, column.name);
                totalPercent += convertTimeToPercent(timeSpentInColumn, _oneInProgressReopenedIssueFromNewKANProject.cycleTime,
                    column.category, _oneInProgressReopenedIssueFromNewKANProject.wasReopened);
            });
            expect(totalPercent).toBe(0);
        });
    });

    describe("Column Distribution graph data constructor", function () {
        approveIt("should return correct graph data for four done issues", function (approvals) {
            let result = createColDistData(fourDoneIssues, boardDesign);
            approvals.verify(result);
        });

        approveIt("should return correct graph data for two issues one done and one not done", function (approvals) {
            let result = createColDistData(twoIssuesDoneAndNotDone, boardDesign);
            approvals.verify(result);
        });

        approveIt("should return correct graph data for an issue that was done reopened then done again", function (approvals) {
            let issuesArray = [];
            issuesArray.push(oneDoneReopenedIssueFromNewKANProject);
            let result = createColDistData(issuesArray, boardDesignNewKANProject);
            approvals.verify(result);
        });
    });
});
