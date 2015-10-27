/**
 * Converts a timestamp to a custom format.
 *
 * Example:  today = new Date(Date.now());
 *           today = today.customFormat("#YYYY#-#MM#-#DD#T#hh#:#mm#:#ss#");
 */

Date.prototype.customFormat = function (formatString) {
    "use strict";

    var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    YY = ((YYYY = String(this.getFullYear()))).slice(-2);
    MM = (M = this.getMonth() + 1) < 10 ? ('0' + M) : M;
    MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
    DD = (D = this.getDate()) < 10 ? ('0' + D) : D;
    DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDay()]).substring(0, 3);
    th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) === 1) ? 'st' : (dMod === 2) ? 'nd' : (dMod === 3) ? 'rd' : 'th';
    formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
    h = (hhh = this.getHours());

    /*if (h === 0) {
        h = 24;
    }
    if (h > 12) {
        h -= 12;
    }*/

    hh = h < 10 ? ('0' + h) : h;
    hhhh = h < 10 ? ('0' + hhh) : hhh;
    AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
    mm = (m = this.getMinutes()) < 10 ? ('0' + m) : m;
    ss = (s = this.getSeconds()) < 10 ? ('0' + s) : s;

    return formatString.replace("#hhhh#", hhhh).replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
};

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

/**
 * Time Utility for manipulating epoch time and date timestamps.
 */

function TimeUtil() {
    "use strict";

    var self = this;

    self.getTimestamp = function (millisecondsSinceEpoch) {
        var today;

        if (millisecondsSinceEpoch) {
            today = new Date(millisecondsSinceEpoch);
        } else {
            today = new Date(Date.now());
        }

        today = today.customFormat("#YYYY#-#MM#-#DD#T#hh#:#mm#:#ss#");
        return today;
    };

    self.convertMsToDHM = function (ms) {
        var dayFactor = 24 * 60 * 60 * 1000,
            hourFactor = 60 * 60 * 1000,
            day = Math.floor(ms / dayFactor),
            hour = Math.floor( (ms - day * dayFactor) / hourFactor),
            minute = Math.round( (ms - day * dayFactor - hour * hourFactor) / 60000),
            pad = function(n){ return n < 10 ? '0' + n : n;},
            answer = "";

        if( minute === 60 ){
            hour++;
            minute = 0;
        }

        if( hour === 24 ){
            day++;
            hour = 0;
        }

        answer = day + " days, " + pad(hour) + " hours, " + pad(minute) + " minutes.";
        return answer;
        //return [day, pad(hour), pad(minute)].join(':');
    };

    self.convertDateToEpochDay = function (timeString) {
        return Date.parse(timeString.substring(0, timeString.indexOf('T')));
    };

    /**
     * Needs Epoch dates as input.
     */
    self.getDatesInInterval = function (startDate, stopDate) {
        var dateArray = [],
            currentDate = new Date(startDate),
            endDate = new Date(stopDate);
        while (currentDate <= endDate) {
            dateArray.push(Date.parse((new Date(currentDate))));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    };

    return self;
}

// Global variable for use in entire application.
var timeUtil = new TimeUtil();
