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
        allExitTimes.push(timeUtil.convertDateToEpochDay(_.last(issue.columnHistory).exitTime));
    });

    return Math.max.apply(null, allExitTimes);
}

function getFirstHistoryDate(issues){
    var allEnterTimes = [];

    _.forEach(issues, function (issue){
        allEnterTimes.push(timeUtil.convertDateToEpochDay(_.first(issue.columnHistory).enterTime));
    });

    return Math.min.apply(null, allEnterTimes);
}

function getDates(issues){
    var startDate = getFirstHistoryDate(issues),
        endDate = getLastHistoryDate(issues);

    return timeUtil.getDatesInInterval(startDate, endDate);
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function CfdColumnItem(columnName){
    var self = this;

    self.key = columnName;
    self.values = [];

    return self;
}

/**
 * For each date, calculate the amount of issues in the given column.
 * Column will be the key in CFD data array.
 */
function CfdColumnValuesArray(dates, issues, boardDesign, columnName){
    var valuesArray = [],
        amountOfIssues,
        _boardDesign = createBoardDesign(boardDesign),
        _issues = createIssuesFromArray(issues, _boardDesign);

    //console.log(dates);
    //console.log(issues);
    //console.log(columnName);

    _.forEach(dates, function(date){
        amountOfIssues = 0;
        _.forEach(_issues, function(issue){
            _.forEach(issue.columnHistory, function(historyItem){
                if(issue.wasInColumn(date, historyItem.enterTime, historyItem.exitTime)){
                    amountOfIssues++;
                }
            });
            /*_.forEach(issue.columnHistory, function(historyItem){
                var datesInColumn = timeUtil.getDatesInInterval(timeUtil.convertDateToEpochDay(historyItem.enterTime), timeUtil.convertDateToEpochDay(historyItem.exitTime));
                if(historyItem.columnName === columnName && isInArray(date, datesInColumn)){
                    //console.log(timeUtil.getDatesInInterval(timeUtil.convertDateToEpochDay(historyItem.enterTime), timeUtil.convertDateToEpochDay(historyItem.exitTime)) + " contains " + date + "?");
                    //console.log(historyItem.columnName + " gets an issue!");
                    amountOfIssues++;
                }
            });*/
        });
        //console.log("Value added to array: " + (new Date(date)).customFormat("#YYYY#-#MM#-#DD#") + ", " + amountOfIssues);
        valuesArray.push(new CfdColumnValuesItem(date, amountOfIssues));
    });

    return valuesArray;
}

function CfdColumnValuesItem(x, y){
    var self = this;

    self.x = x;
    self.y = y;

    return self;
}

// Structure: [{column, [[day1,amountOfIssues],[day2,amountOfIssues]] }   ,   { column, [[day1,amountOfIssues],[day2,amountOfIssues]] } ]
// Example:   [{"key":Ready to Refine", "values":[{"x":1444428000000,"y":5},{"x":1444514400000,"y":3}]},
//             {"key":"Refine Backlog", "values":[{"x":1444428000000,"y":2],["x":1444514400000,"y":2}]}]
function createCfdData(issues, boardDesign){
    var graphArray = [],
        columnData,
        dates = getDates(issues);
        //_boardDesign = new BoardDesign(boardDesign),
        //_issues = new Issue(issues, _boardDesign);

    _.forEach(boardDesign.columns, function(column){
        columnData = new CfdColumnItem(column.name);
        columnData.values = CfdColumnValuesArray(dates, issues, boardDesign, column.name);
        graphArray.push(columnData);
    });

    return graphArray;
}
