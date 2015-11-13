/**
 * Time Utility for manipulating epoch time and date timestamps.
 */

function TimeUtil() {
    "use strict";

    var self = this;

    self.msToHours = function (ms){
        var hours;
        hours = +(((ms/1000)/60)/60).toFixed(2);
        return hours;
    };

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
            days,
            hours,
            minutes,
            answer;

        if( minute === 60 ){
            hour++;
            minute = 0;
        }

        if( hour === 24 ){
            day++;
            hour = 0;
        }

        days = day + " days, ";
        hours = hour + " hours, ";
        minutes = minute + " minutes.";

        if(day === 0){
            days = "";
        } else if (day > 0 && hour === 0 && minute === 0){
            days = day + " days.";
            if (day === 1) {
                days = day + " day.";
            }
        } else if (day === 1 && (hour > 0 || minute > 0)){
            days = day + " day, ";
        }

        if (hour === 0) {
            hours = "";
        } else if (hour > 0 && minute === 0){
            hours = hour + " hours.";
            if (hour === 1) {
                hours = hour + " hour.";
            }
        } else if (hour === 1 && minute > 0){
            hours = hour + " hour, ";
        }

        if (minute === 0) {
            minutes = "";
        } else if (minute === 1){
            minutes = minute + " minute.";
        }

        answer = days + hours + minutes;
        //answer = day + " days, " + pad(hour) + " hours, " + pad(minute) + " minutes.";
        return answer;
        //return [day, pad(hour), pad(minute)].join(':');
    };

    self.convertDateToEpochMidnight = function (timeString) {
        var date = new Date(timeString.substring(0, timeString.indexOf('T'))),
            offsetInMs = date.getTimezoneOffset()*60000;
        return Date.parse(date)+offsetInMs;
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
