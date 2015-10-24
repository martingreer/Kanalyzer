function EtDtGraphData(key){
    var self = this;

    self.key = key;
    self.values = [];

    return self;
}

function EtDtValueItem(issueKey, delayTime, executionTime, cycleTime){
    var self = this;

    self.key = issueKey;
    self.x = Math.round(((delayTime/1000)/60)/60);
    self.y = Math.round(((executionTime/1000)/60)/60);
    self.size = Math.round(cycleTime);

    return self;
}

function createEtDtData(key, issues){
    var graphArray = [],
        graphData = new EtDtGraphData(key);

    _.forEach(issues, function(issue){
        graphData.values.push(new EtDtValueItem(issue.key, issue.delayTime, issue.executionTime, issue.cycleTime));
    });

    graphArray.push(graphData);

    return graphArray;
}

function getLastHistoryDate(issues){
    var allExitTimes = [];

    _.forEach(issues, function (issue){
        allExitTimes.push(timeUtil.parseOnlyDayEpochFromDateString(_.last(issue.columnHistory).exitTime));
    });

    return Math.max.apply(null, allExitTimes);
}

function getDates(issues){
    var startDate = Date.parse(timeUtil.parseOnlyDayEpochFromDateString(_.last(issues).columnHistory[0].enterTime)),
        endDate = getLastHistoryDate(issues),
        dates = [];

    dates.push(startDate);
    dates = timeUtil.getDatesInInterval(startDate, endDate);
    dates.push(endDate);

    console.log(dates);
    return dates;
}

/**
 * For each date, calculate the amount of issues in the given column.
 * Column will be the key in CFD data array.
 */
function parseAmountOfIssues(dates, issues, columnName){
    var valuesArray = [],
        amountOfIssues;

    //console.log(timeUtil.parseOnlyDayEpochFromDateString(issues[0].columnHistory[0].enterTime));

    _.forEach(dates, function(date){
        amountOfIssues = 0;
        _.forEach(issues, function(issue){
            _.forEach(issue.columnHistory, function(historyItem){
                /*console.log("Iteration: " + (historyItem.columnName === columnName) + " and " + (timeUtil.getDatesInInterval(Date.parse(historyItem.enterTime.substring(0, historyItem.enterTime.indexOf('T'))),
                        Date.parse(historyItem.exitTime.substring(0, historyItem.exitTime.indexOf('T')))).indexOf(date)));*/
                if(historyItem.columnName === columnName && timeUtil.getDatesInInterval(historyItem.enterTime, historyItem.exitTime).indexOf(date)){
                    console.log("Got in!");
                    amountOfIssues++;
                }
            });
        });
        valuesArray.push([date, amountOfIssues]);
    });

    console.log(valuesArray);
    return valuesArray;
}

function CfdGraphData(columnName){
    var self = this;

    self.key = columnName;
    self.values = [];

    return self;
}

function CfdValueItem(date, amountOfIssues){
    var dateInMilliseconds = Date.parse(date);

    return [dateInMilliseconds, amountOfIssues];
}

// Structure: [ { column, [[day1,amountOfIssues],[day2,amountOfIssues]] }   ,   { column, [[day1,amountOfIssues],[day2,amountOfIssues]] } ]
// Example:   [ { "key":Ready to Refine", "values":[[1444428000000,5],[1444514400000,3]] }   ,   { "key":"Refine Backlog", "values":[[1444428000000,2],[1444514400000,2]] } ]
function createCfdData(issues, boardDesign){

}
