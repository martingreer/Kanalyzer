describe("Execution Time vs Delay Time graph", function () {
    "use strict";

    var twoIssues = fourParsedDoneIssues;

    describe("Two done issues", function () {
        var etDtData = [],
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

    var fourIssues = fourParsedDoneIssues;
    var boardDesign = columnsData;

    describe("Dates", function () {
        it("should return the last date found in column history between the issues", function () {
            var lastHistoryDay = new Date(getLastHistoryDate(fourIssues));
            lastHistoryDay = lastHistoryDay.customFormat("#YYYY#-#MM#-#DD#");
            expect(lastHistoryDay).toBe("2015-10-27");
        });

        it("should return the first date found in column history between the issues", function () {
            var firstHistoryDay = new Date(getFirstHistoryDate(fourIssues));
            firstHistoryDay = firstHistoryDay.customFormat("#YYYY#-#MM#-#DD#");
            expect(firstHistoryDay).toBe("2015-10-21");
        });

        it("should return array of all dates in interval", function () {
            var i = 0,
                dates = getDates(fourIssues);
            _.forEach(dates, function (date) {
                date = new Date(date);
                dates[i] = date.customFormat("#YYYY#-#MM#-#DD#");
                i++;
            });
            expect(dates).toEqual(['2015-10-21', '2015-10-22', '2015-10-23', '2015-10-24', '2015-10-25', '2015-10-26', '2015-10-27']);
        });
    });

    describe("Parser", function () {
        var array = [1, 2, 3, 4, 5];

        it("array should contain value", function () {
            expect(isInArray(4, array)).toBeTruthy();
        });

        it("array should not contain value", function () {
            expect(isInArray(7, array)).toBeFalsy();
        });

        approveIt("should return an array of dates and amount of issues for the In Progress column", function (approvals) {
            var dates = getDates(fourIssues),
                amountOfIssues = new CfdColumnValuesArray(dates, fourIssues, boardDesign, "In Progress");
            approvals.verify(amountOfIssues);
        });

        approveIt("should return an array of dates and amount of issues for the Ready for Release column", function (approvals) {
            var dates = getDates(fourIssues),
                amountOfIssues = new CfdColumnValuesArray(dates, fourIssues, boardDesign, "Ready for Release");
            approvals.verify(amountOfIssues);
        });

        /*approveIt("should return an array of complete CFD data", function(approvals){
         var boardDesign = new BoardDesign(columnsData),
         graphArray = createCfdData(fourIssues, boardDesign);
         approvals.verify(graphArray);
         });*/
    });
});

describe("Column Distribution Graph", function () {
    "use strict";

    var oneDoneIssue = oneParsedDoneIssueForColDistGraph;
    var fourDoneIssues = fourParsedDoneIssuesForColDistGraph;
    var oneNotDoneIssue = oneParsedNotDoneIssue;
    var twoIssuesDoneAndNotDone = twoParsedIssuesOneDoneAndOneNotDone;
    var boardDesign = boardDesignForColDistGraph;

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
            var timeSpentInColumn = getTimeSpentInColumn(oneNotDoneIssue, "In Progress");
            expect(convertTimeToPercent(timeSpentInColumn, oneNotDoneIssue.cycleTime, "Execution")).toBe(0);
        });

        it("should be 0 percent if issue was never in column", function () {
            var timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Under Test");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Execution")).toBe(0);
        });

        it("should be 0 percent if column is ignore category", function () {
            var timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Ready to Refine");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Ignore")).toBe(0);
        });

        it("should be 0 percent if column is done category", function () {
            var timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Ready for Release");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Done")).toBe(0);
            timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[3], "Ready for Release");
            expect(convertTimeToPercent(timeSpentInColumn, fourDoneIssues[3].cycleTime, "Done")).toBe(0);
        });

        it("should be 0 percent if column doesn't exist", function () {
            var timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Herpaderp");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Execution")).toBe(0);
        });

        it("should calculate percentage of time spent in given column for a done issue", function () {
            var timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Ready to Analyze");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Delay")).toBe(0.75);
            timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "Ready for Development");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Execution")).toBe(2.25);
            timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, "In Progress");
            expect(convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, "Execution")).toBe(96.11);
        });

        it("should calculate percentage of time spent in given column for another done issue", function () {
            var timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[1], "Ready to Analyze");
            expect(convertTimeToPercent(timeSpentInColumn, fourDoneIssues[1].cycleTime, "Delay")).toBe(3.24);
            timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[1], "In Progress");
            expect(convertTimeToPercent(timeSpentInColumn, fourDoneIssues[1].cycleTime, "Execution")).toBe(20.04);
            timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[1], "Under Test");
            expect(convertTimeToPercent(timeSpentInColumn, fourDoneIssues[1].cycleTime, "Execution")).toBe(73.42);
        });

        it("percentages should add upp to roughly 100 for a done issue", function () {
            var timeSpentInColumn = 0;
            var totalPercent = 0;
            _.forEach(boardDesign.columns, function (column) {
                timeSpentInColumn = getTimeSpentInColumn(oneDoneIssue, column.name);
                totalPercent += convertTimeToPercent(timeSpentInColumn, oneDoneIssue.cycleTime, column.category);
            });
            expect(Math.round(totalPercent)).toBe(100);
        });

        it("percentages should add upp to roughly 100 for another done issue", function () {
            var timeSpentInColumn = 0;
            var totalPercent = 0;
            _.forEach(boardDesign.columns, function (column) {
                timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[2], column.name);
                totalPercent += convertTimeToPercent(timeSpentInColumn, fourDoneIssues[2].cycleTime, column.category);
            });
            expect(Math.round(totalPercent)).toBe(100);
        });

        it("percentages should add upp to roughly 100 for a third done issue", function () {
            var timeSpentInColumn = 0;
            var totalPercent = 0;
            _.forEach(boardDesign.columns, function (column) {
                timeSpentInColumn = getTimeSpentInColumn(fourDoneIssues[3], column.name);
                totalPercent += convertTimeToPercent(timeSpentInColumn, fourDoneIssues[3].cycleTime, column.category);
            });
            expect(Math.round(totalPercent)).toBe(100);
        });
    });

    describe("Column Distribution graph data constructor", function () {
        approveIt("should return correct graph data for four done issues", function (approvals) {
            var result = createColDistData(fourDoneIssues, boardDesign);
            approvals.verify(result);
        });

        approveIt("should return correct graph data for two issues one done and one not done", function (approvals) {
            var result = createColDistData(twoIssuesDoneAndNotDone, boardDesign);
            approvals.verify(result);
        });
    });
});
