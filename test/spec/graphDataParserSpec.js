describe("Execution Time vs Delay Time graph", function(){
    "use strict";

    var twoIssues = twoParsedDoneIssues;

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
            expect(firstIssueData.y).toBe(1);
        });

        it("second issue should have a delay time", function(){
            expect(secondIssueData.x).toBe(1);
        });

        it("second issue should have a size", function(){
            expect(secondIssueData.size).toBe(4502000);
        });
    });
});

describe("CFD graph", function(){
    var twoIssues = twoParsedDoneIssues;

    describe("Dates", function(){
        it("should return the last date found in column history between two issues", function(){
            var lastHistoryDay = new Date(getLastHistoryDate(twoIssues));
            lastHistoryDay = lastHistoryDay.customFormat("#YYYY#-#MM#-#DD#");
            expect(lastHistoryDay).toBe("2015-10-23");
        });

        it("should return the first date found in column history between two issues", function(){
            var firstHistoryDay = new Date(getFirstHistoryDate(twoIssues));
            firstHistoryDay = firstHistoryDay.customFormat("#YYYY#-#MM#-#DD#");
            expect(firstHistoryDay).toBe("2015-10-21");
        });

        it("should return array of all dates in interval", function(){
            var i = 0,
                dates = getDates(twoIssues);
            _.forEach(dates, function(date){
                date = new Date(date);
                dates[i] = date.customFormat("#YYYY#-#MM#-#DD#");
                i++;
            });
            expect(dates).toEqual(['2015-10-21', '2015-10-22', '2015-10-23']);
        });
    });

    describe("Parser", function(){
        it("array should contain value", function(){
            var array = [1, 2, 3, 4, 5];
            expect(isInArray(4, array)).toBeTruthy();
        });

        it("array should not contain value", function(){
            var array = [1, 2, 3, 4, 5];
            expect(isInArray(7, array)).toBeFalsy();
        });

        it("should return an array of dates and amount of issues for the given column", function(){
            var dates = getDates(twoIssues),
                amountOfIssues = parseAmountOfIssues(dates, twoIssues, "In Progress");
            expect(amountOfIssues).toEqual([ [ 1445385600000, 0 ], [ 1445472000000, 2 ], [ 1445558400000, 1 ] ]);
        });
    });
});
