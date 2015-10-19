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
            expect(dateTestPM.customFormat("#YYYY#-#MM#-#DD#T#hh#:#mm#:#ss#")).toBe("2015-09-23T15:52:21");
        });

        it("should be a correct format for AM time", function(){
            expect(dateTestAM.customFormat("#YYYY#-#MM#-#DD#T#hh#:#mm#:#ss#")).toBe("2015-09-23T05:52:21");
        });
    });

    describe("TimeUtil", function(){
        it("should be a correct format", function(){
            expect(timeUtilTest.getTimestamp(dateTestAM)).toBe("2015-09-23T05:52:21");
        });

        it("should parse a timestamp to milliseconds (epoch)", function(){
            expect(Date.parse("2015-09-01T14:42:23")).toBe(1441111343000);
        });

        it("should convert time in ms to DD HH MM format", function(){
            expect(timeUtilTest.convertMillisecondsToDaysHoursMinutes(1122653000)).toBe("12 days, 23 hours, 51 minutes.");
        });
    });
});
