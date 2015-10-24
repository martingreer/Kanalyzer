describe("Execution Time vs Delay Time graph", function(){
    "use strict";

    describe("Two done issues", function(){
        var etDtData = [],
            key,
            firstIssueData,
            secondIssueData;

        beforeEach(function(){
            etDtData = _.first(createEtDtData("Two done issues", twoParsedDoneIssues));
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
    describe("Dates", function(){
        it("should return the last date found in column history between two issues", function(){
            expect(getLastHistoryDate(twoParsedDoneIssues)).toBe(1445551200000);
        });

        it("should return dates in interval", function(){
            expect(getDates(twoParsedDoneIssues)).toEqual([1445637600000]);
        });
    });

    describe("Parser", function(){
        it("should return an array of dates and amount of issues for the column", function(){
            expect(parseAmountOfIssues(getDates(twoParsedDoneIssues), twoParsedDoneIssues, twoParsedDoneIssues[0].columnHistory[0].columnName)).toEqual(0);
        });
    });
});
