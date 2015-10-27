/**
 * Tests for apiParser.js
 */

/*global describe, it, expect, beforeEach, beforeAll, module, inject, BoardDesign, approveIt, Issue*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

describe("BoardDesign", function(){
    "use strict";

    var boardDesign,
        columnCategories;

    beforeEach(function(){
        boardDesign = new BoardDesign(columnsData);
        columnCategories =  boardDesign.createColumnCategories();
    });

    it("should have columns", function(){
        expect(boardDesign.getColumnNames()).toEqual(['Ready to Refine', 'Refine Backlog', 'Ready to Analyze', 'Analyze', 'Ready for Development', 'In Progress', 'Under Review', 'Ready for Test', 'Under Test', 'Ready to Accept', 'Accept', 'Ready for Release']);
    });

    it("should return column name when status id is matching", function(){
        expect(boardDesign.getColumnMatchingStatus("10004")).toEqual("In Progress");
    });

    it("should return null when status id is not matching any column", function(){
        expect(boardDesign.getColumnMatchingStatus("100100")).toBe(null);
    });

    approveIt("should guess appropriate column categories", function(approvals){
        approvals.verify(columnCategories);
    });

    it("should return done category", function(){
       expect(boardDesign.getColumnCategory("Ready for Release")).toEqual("Done");
    });

    it("should return execution category", function(){
        expect(boardDesign.getColumnCategory("In Progress")).toEqual("Execution");
    });
});

describe("Issue", function(){
    "use strict";

    var issueWithoutHistory = new Issue(apiIssueWithoutHistory, new BoardDesign(columnsData));
    var issueWithHistoryAndNotDone = new Issue(apiIssueWithHistoryAndNotDone, new BoardDesign(columnsData), "2015-09-10T00:00:00");
    var issueIsDone = new Issue(apiIssueIsDone, new BoardDesign(columnsData));
    var twoIssues = parseMultipleApiIssues(apiTwoIssues);

    describe("With history", function(){
        it("should have id", function(){
            expect(issueWithHistoryAndNotDone.id).toBe("10000");
        });

        it("should have a key", function(){
            expect(issueWithHistoryAndNotDone.key).toBe("KTD-1");
        });

        it("should have summary", function(){
            expect(issueWithHistoryAndNotDone.summary).toBe("Write planning report");
        });

        it("should be created", function(){
            expect(issueWithHistoryAndNotDone.created).toBe("2015-09-01T14:42:01");
        });

        it("should have current status", function(){
            expect(issueWithHistoryAndNotDone.currentStatus).toEqual({id:"10009",name:"Accept"});
        });

        it("should be done", function(){
            expect(issueIsDone.isDone()).toBe(true);
        });

        approveIt("should parse raw api data to array of only the issues", function(approvals) {
            approvals.verify(twoIssues);
        });

        it("should create first separate issue object from issues array", function() {
            var firstIssue = new Issue(twoIssues[0], new BoardDesign(columnsData));
            expect(firstIssue.id).toBe("10409");
        });

        it("should create second separate issue object from issues array", function() {
            var secondIssue = new Issue(twoIssues[1], new BoardDesign(columnsData));
            expect(secondIssue.id).toBe("10408");
        });

        describe("History parser", function(){
            var columnHistory;

            beforeEach(function(){
               columnHistory = issueWithHistoryAndNotDone.columnHistory;
            });

            it("issue should always start in first column", function(){
                expect(columnHistory[0].columnName).toBe("Ready to Refine");
            });

            it("issue should have an enter time for a column", function(){
                expect(columnHistory[0].enterTime).toBe("2015-09-01T14:42:01");
            });

            it("issue should have an exit time for a column", function(){
                expect(columnHistory[0].exitTime).toBe("2015-09-01T14:42:23");
            });
        });
    });

    describe("Without history", function(){
        var columnHistory;

        beforeEach(function(){
            columnHistory = issueWithoutHistory.columnHistory;
        });

        it("should be in first column", function(){
            expect(columnHistory[0].columnName).toBe("Ready to Refine");
        });

        it("should have only one history record", function(){
            expect(columnHistory.length).toBe(1);
        });
    });

    describe("Cycle time calculations", function(){
        it("should calculate time spent in first column", function(){
            expect(issueWithHistoryAndNotDone.columnHistory[0].timeSpentInColumn()).toBe(22000);
        });

        it("should calculate the cycle time for the issue", function(){
            expect(issueIsDone.cycleTime).toBe(64873000);
        });

        it("should not have cycle time if not done", function(){
            expect(issueWithoutHistory.cycleTime).toBe(null);
        });
    });

    describe("Execution Time calculations", function(){
        it("should calculate execution time for an issue that is not done", function(){
            expect(issueWithHistoryAndNotDone.executionTime).toBe(724657000);
        });

        it("an issue without history should have no execution time", function(){
            expect(timeUtil.convertMsToDHM(issueWithoutHistory.executionTime)).toBe(timeUtil.convertMsToDHM(0));
        });

        it("should calculate execution time for an issue that is done", function(){
            expect(timeUtil.convertMsToDHM(issueIsDone.executionTime)).toBe("0 days, 00 hours, 01 minutes.");
        });
    });

    describe("Delay Time calculations", function(){
        it("should calculate delay time for an issue that is not done", function(){
            expect(timeUtil.convertMsToDHM(issueWithHistoryAndNotDone.delayTime)).toBe(timeUtil.convertMsToDHM(22000));
        });

        it("should calculate delay time for an issue that is done", function(){
            expect(timeUtil.convertMsToDHM(issueIsDone.delayTime)).toBe("0 days, 18 hours, 01 minutes.");
        });
    });

    describe("Process Efficiency", function(){
        it("an issue that is not done should have no process efficiency", function(){
            expect(issueWithHistoryAndNotDone.processEfficiency).toBe(0);
        });

        it("should calculate process efficiency for an issue that is done", function(){
            expect(issueIsDone.processEfficiency).toBe(0.0004624420020655743);
        });
    });

    describe("Check which column issue was in", function(){
        it("should return true if value exists in the given range", function(){
            expect(issueIsDone.isInBetween(4, 1, 10)).toBeTruthy();
        });

        it("should return false if value exists in the given range", function(){
            expect(issueIsDone.isInBetween(0, 1, 10)).toBeFalsy();
        });

        it("should return true if the issue was in the column at the given time", function(){
            var date = new Date("2015-09-15"),
                readyToAnalyzeColumn = issueIsDone.columnHistory[2];
            expect(issueIsDone.wasInColumn(date, readyToAnalyzeColumn)).toBeTruthy();
        });

        it("should return false if the issue was not in the column at the given time", function(){
            var date = new Date("2015-09-14"),
                readyToAnalyzeColumn = issueIsDone.columnHistory[2];
            expect(issueIsDone.wasInColumn(date, readyToAnalyzeColumn)).toBeFalsy();
        });
    });
});
