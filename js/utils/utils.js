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
    
    return self;
}

var timeUtil = new TimeUtil();