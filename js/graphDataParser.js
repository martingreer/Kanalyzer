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

function getLastHistoryDate(issues){
    var allExitTimes = [];

    _.forEach(issues, function (issue){
        allExitTimes.push(Date.parse(_.last(issue.columnHistory).exitTime));
    });

    return Math.max.apply(null, allExitTimes);
}

function getDates(issues){
    var startDate = Date.parse(_.last(issues).columnHistory[0].enterTime),
        endDate = getLastHistoryDate(issues),
        dates = [];

    dates.push(startDate);
    dates = timeUtil.getDatesInInterval(startDate, endDate);
    dates.push(endDate);

    return dates;
}

function parseAmountOfIssues(issues, boardDesign){

}

// Structure: [ { column, [[day1,amountOfIssues],[day2,amountOfIssues]] }   ,   { column, [[day1,amountOfIssues],[day2,amountOfIssues]] } ]
// Example:   [ { "key":Ready to Refine", "values":[[1444428000000,5],[1444514400000,3]] }   ,   { "key":"Refine Backlog", "values":[[1444428000000,2],[1444514400000,2]] } ]
function createCfdData(issues, boardDesign){

}
