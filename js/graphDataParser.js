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
        allExitTimes.push(timeUtil.convertDateToEpochMidnight(_.last(issue.columnHistory).exitTime));
        //console.log(_.last(issue.columnHistory).exitTime);
        //console.log(new Date(timeUtil.convertDateToEpochMidnight(_.last(issue.columnHistory).exitTime)).customFormat("#YYYY#-#MM#-#DD#T#hh#:#mm#:#ss#"));
        //console.log("--------------------------------");
    });

    return Math.max.apply(null, allExitTimes);
}

function getFirstHistoryDate(issues){
    var allEnterTimes = [];

    _.forEach(issues, function (issue){
        allEnterTimes.push(timeUtil.convertDateToEpochMidnight(_.first(issue.columnHistory).enterTime));
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

    _.forEach(dates, function(date){
        amountOfIssues = 0;
        _.forEach(_issues, function(issue){
            _.forEach(issue.columnHistory, function(historyItem){
                if(issue.wasInColumn(date, historyItem) && historyItem.columnName === columnName){
                    //console.log(issue.key + " was in column " + historyItem.columnName + " at the time: " + date);
                    amountOfIssues++;
                }
            });
        });
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

// Example:   [{"key":"Ready to Refine", "values":[{"x":1444428000000,"y":5},{"x":1444514400000,"y":3}]},
//             {"key":"Refine Backlog", "values":[{"x":1444428000000,"y":2},{"x":1444514400000,"y":2}]}]
function createCfdData(issues, boardDesign){
    var graphArray = [],
        columnData,
        dates = getDates(issues);

    _.forEach(boardDesign.columns, function(column){
        columnData = new CfdColumnItem(column.name);
        columnData.values = CfdColumnValuesArray(dates, issues, boardDesign, column.name);
        graphArray.push(columnData);
    });

    return graphArray;
}
