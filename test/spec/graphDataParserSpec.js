describe("Execution Time vs Delay Time graph", function(){
    describe("One done issue", function(){
        var etDtData = [],
            key,
            firstIssueData,
            secondIssueData;

        beforeEach(function(){
            etDtData = _.first(createEtDtData("Two done issues", twoDoneIssues));
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

        it("first should have an execution time", function(){
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

