describe("Execution Time vs Delay Time graph", function(){
    "use strict";

    var twoIssues = fourParsedDoneIssues;

    describe("Two done issues", function(){
        var etDtData = [],
            key,
            firstIssueData,
            secondIssueData;

        beforeEach(function(){
            etDtData = _.first(createEtDtData("Two done issues", twoIssues));
            key = etDtData.key;
            firstIssueData = etDtData.values[0];
            secondIssueData = etDtData.values[1];
        });

        it("the data group should have a key", function(){
            expect(key).toBe("Two done issues");
        });

        it("first issue should have a key", function(){
            expect(firstIssueData.key).toBe("KTD-60");
        });

        it("first issue should have an execution time", function(){
            expect(firstIssueData.y).toBe(0.72);
        });

        it("second issue should have a delay time", function(){
            expect(secondIssueData.x).toBe(0.73);
        });

        it("second issue should have a size", function(){
            expect(secondIssueData.size).toBe(1.25);
        });
    });
});

describe("CFD graph", function(){
    "use strict";

    var fourIssues = fourParsedDoneIssues;
    var boardDesign = columnsData;

    describe("Dates", function(){
        it("should return the last date found in column history between the issues", function(){
            var lastHistoryDay = new Date(getLastHistoryDate(fourIssues));
            lastHistoryDay = lastHistoryDay.customFormat("#YYYY#-#MM#-#DD#");
            expect(lastHistoryDay).toBe("2015-10-27");
        });

        it("should return the first date found in column history between the issues", function(){
            var firstHistoryDay = new Date(getFirstHistoryDate(fourIssues));
            firstHistoryDay = firstHistoryDay.customFormat("#YYYY#-#MM#-#DD#");
            expect(firstHistoryDay).toBe("2015-10-21");
        });

        it("should return array of all dates in interval", function(){
            var i = 0,
                dates = getDates(fourIssues);
            _.forEach(dates, function(date){
                date = new Date(date);
                dates[i] = date.customFormat("#YYYY#-#MM#-#DD#");
                i++;
            });
            expect(dates).toEqual([ '2015-10-21', '2015-10-22', '2015-10-23', '2015-10-24', '2015-10-25', '2015-10-26', '2015-10-27' ]);
        });
    });

    describe("Parser", function(){
        var array = [1, 2, 3, 4, 5];

        it("array should contain value", function(){
            expect(isInArray(4, array)).toBeTruthy();
        });

        it("array should not contain value", function(){
            expect(isInArray(7, array)).toBeFalsy();
        });

        approveIt("should return an array of dates and amount of issues for the In Progress column", function(approvals){
            var dates = getDates(fourIssues),
                amountOfIssues = new CfdColumnValuesArray(dates, fourIssues, boardDesign, "In Progress");
            approvals.verify(amountOfIssues);
        });

        approveIt("should return an array of dates and amount of issues for the Ready for Release column", function(approvals){
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

describe("Column Distribution Graph", function(){
    "use strict";

    var oneIssue = oneParsedDoneIssue;
    var fourIssues = fourParsedDoneIssues;
    var boardDesign = createBoardDesign(columnsData);
    var highestTime = new HighestTime();

    describe("Get time spent", function(){
        it("should return the total time spent in In Progress column when it was moved back to the column", function(){
            expect(getTimeSpentInColumn(oneIssue, "In Progress", highestTime)).toBe(5099000);
        });

        it("should return the total time spent in the Ready for Release column", function(){
            expect(getTimeSpentInColumn(oneIssue, "Ready for Release", highestTime)).toBe(7409000);
        });

        it("should return the highest time found when only one issue is given", function(){
            expect(highestTime.time).toBe(7409000);
        });

        it("should return the highest time found when multiple issues and columns are given", function(){
            _.forEach(fourIssues, function(issue){
                getTimeSpentInColumn(issue, "In Progress", highestTime);
                getTimeSpentInColumn(issue, "Ready for Release", highestTime);
            });
            expect(highestTime.time).toBe(337139000);
        });
    });

    describe("Values array constructor", function(){
        approveIt("should return an issue number and the amount of time spent in the given column", function (approvals) {
            var valuesArray = new ColDistValuesArray(fourParsedDoneIssues, "In Progress", highestTime);
            valuesArray = JSON.stringify(valuesArray);
            approvals.verify(valuesArray);
        });
    });
});
