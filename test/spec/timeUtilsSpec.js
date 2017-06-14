/**
 * Tests for timeUtil.js
 */

describe("Time Util", function () {
    "use strict";

    var timeUtilTest,
        dateTestPM,
        dateTestAM;

    beforeAll(function () {
        timeUtilTest = new TimeUtil();
        dateTestPM = new Date(1443016341000); // 2015-09-23 14:52:21
        dateTestAM = new Date(1442980341000); // 2015-09-23 04:52:21
    });

    describe("Epoch to date converter", function () {
        it("should be a correct format for PM time", function () {
            expect(dateTestPM.customFormat("#YYYY#-#MM#-#DD#T#hh#:#mm#:#ss#")).toBe("2015-09-23T15:52:21");
        });

        it("should be a correct format for AM time", function () {
            expect(dateTestAM.customFormat("#YYYY#-#MM#-#DD#T#hh#:#mm#:#ss#")).toBe("2015-09-23T05:52:21");
        });
    });

    describe("TimeUtil", function () {
        it("should be a correct format", function () {
            expect(timeUtilTest.getTimestamp(dateTestAM)).toBe("2015-09-23T05:52:21");
        });

        it("should convert time in ms to DD HH MM format", function () {
            expect(timeUtilTest.convertMsToDHM(1122653000)).toBe("12 days, 23 hours, 51 minutes.");
        });

        it("should return an array of dates in the interval", function () {
            expect(timeUtil.getDatesInInterval(1445292000000, 1445464800000)).toEqual([1445292000000, 1445378400000,
                1445464800000]);
        });
    });
});
