/*********************************************************
 * Below is the parsing for the Execution vs Delay view. *
 *********************************************************/

function EtDtGraphData(key){
    var self = this;

    self.key = key;
    self.values = [];

    return self;
}

function EtDtValueItem(issueKey, delayTime, executionTime, cycleTime){
    var self = this;

    self.key = issueKey;
    self.x = timeUtil.msToHours(delayTime);
    self.y = timeUtil.msToHours(executionTime);
    self.size = timeUtil.msToHours(cycleTime);

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


/******************************************
 * Below is the parsing for the CFD view. *
 ******************************************/

function getLastHistoryDate(issues){
    var allExitTimes = [];

    _.forEach(issues, function (issue){
        allExitTimes.push(timeUtil.convertDateToEpochMidnight(_.last(issue.columnHistory).exitTime));
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
 * Column name is the key in CFD data array.
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

    return graphArray.reverse();
}


/**********************************************************
 * Below is the parsing for the Column Distribution view. *
 **********************************************************/

function ColDistItem (columnName) {
    var self = this;

    self.key = columnName;
    self.values = [];

    return self;
}

function ColDistValuesArray (issues, columnName, highestTime) {
    var valuesArray = [];
    var valuesItem = {};
    var issueNumber = 0;

    if(issues.constructor === Array) {
        _.forEach(issues, function (issue) {
            valuesItem = new ColDistValuesItem(issueNumber, getTimeSpentInColumn(issue, columnName, highestTime));
            issueNumber++;
            valuesArray.push(valuesItem);
        });
    } else {
        valuesItem = new ColDistValuesItem(issueNumber, getTimeSpentInColumn(issues, columnName, highestTime));
        issueNumber++;
        valuesArray.push(valuesItem);
    }

    return valuesArray;
}

function ColDistValuesItem (x, y) {
    var self = this;

    self.x = x;
    self.y = y;

    return self;
}

function HighestTime () {
    var self = this;

    self.time = 0;

    return self;
}

function setHighestTime (time, highestTime) {
    //console.log(time + " > " + highestTime.time + " = " + (time > highestTime.time));
    if(time > highestTime.time){
        highestTime.time = time;
    }
}

function getTimeSpentInColumn (issue, columnName, highestTime) {
    var time = 0;

    _.forEach(issue.columnHistory, function(columnHistoryItem){
        if(columnHistoryItem.columnName === columnName){
            time += Date.parse(columnHistoryItem.exitTime) - Date.parse(columnHistoryItem.enterTime);
        }
    });

    setHighestTime(time, highestTime);

    return time;
}

// Example: [{"key":"Ready to Refine", "values":[{"key":"Ready to Refine","x":40,"y":0},{"key":"Ready to Refine","x":20,"y":1}]}]
//          [{"key":"In Progress", "values":[{"key":"In Progress","x":60,"y":0},{"key":"In Progress","x":80,"y":1}]}]
function createColDistData (issues, boardDesign) {
    var graphArray = [],
        columnData,
        highestTime = new HighestTime;

    _.forEach(boardDesign.columns, function(column){
        columnData = new ColDistItem(column.name);
        columnData.values = ColDistValuesArray(issues, column.name, highestTime);
        graphArray.push(columnData);
    });

    return graphArray;
}
