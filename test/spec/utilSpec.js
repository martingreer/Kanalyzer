/**
* Tests for utils.js
*/

describe("Utils", function(){
    "use strict";

    var timeUtilTest,
        dateTestPM,
        dateTestAM;

    beforeAll(function(){
        timeUtilTest = new TimeUtil();
        dateTestPM = new Date(1443016341000); // 2015-09-23 14:52:21
        dateTestAM = new Date(1442980341000); // 2015-09-23 04:52:21
    });

    describe("Epoch to date converter", function(){
        it("should be a correct format for PM time", function(){
            expect(dateTestPM.customFormat("#YYYY#-#MM#-#DD#T#hh#:#mm#:#ss#")).toBe("2015-09-23T14:52:21");
        });

        it("should be a correct format for AM time", function(){
            expect(dateTestAM.customFormat("#YYYY#-#MM#-#DD#T#hh#:#mm#:#ss#")).toBe("2015-09-23T04:52:21");
        });
    });

    describe("TimeUtil", function(){
        it("should be a correct format", function(){
            expect(timeUtilTest.getTimestamp(dateTestAM)).toBe("2015-09-23T04:52:21");
        });
    });
});
