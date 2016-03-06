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

/**
 * One entry of this in the graph array for each column in board design.
 */
function ColDistItem (columnName) {
    var self = this;

    self.key = columnName;
    self.values = [];

    return self;
}

/**
 * Contained in the values property in a ColDistItem.
 *
 * PSEUDO:
 * For each column that an issue was in, calculate highest time spent.
 */
function ColDistValuesArray (_issues, columnName, columnCategory) {
    var valuesArray = [];
    var valuesItem = {};
    var timeSpentInColumn = 0;
    var percentInColumn = 0;
    var issues = _.cloneDeep(_issues);

    issues.reverse(); // Reverse array in order to show oldest->newest issues from left to right in graph

    _.forEach(issues, function (issue) {
        timeSpentInColumn = getTimeSpentInColumn(issue, columnName);
        percentInColumn = convertTimeToPercent(timeSpentInColumn, issue.cycleTime, columnCategory);
        valuesItem = new ColDistValuesItem(issue.key, percentInColumn);
        valuesArray.push(valuesItem);
    });

    return valuesArray;
}

/**
 * One instance for each issue contained in ColDistValuesArray
 */
function ColDistValuesItem (x, y) {
    var self = this;

    self.x = x; // Issue key
    self.y = y; // Percent of max value for issue in column

    return self;
}

/**
 * Highest time spent that an issue spent in a column. This is used in order to determine percentages.
 * FIXME: REMOVE?
 */
function HighestTime () {
    var self = this;

    self.time = 0;

    return self;
}

/**
 * Set new highest time found if needed.
 * FIXME: REMOVE?
 */
function setHighestTime (time, highestTime) {
    //console.log(time + " > " + highestTime.time + " = " + (time > highestTime.time));
    if(time > highestTime.time){
        highestTime.time = time;
    }
}

/**
 * Converts the time spent in a column to a percentage of the total time
 * an issue spent on the board excluding ignored and done columns.
 */
function convertTimeToPercent (timeSpentInColumn, cycleTime, columnCategory) {
    var percent = 0;
    // Only consider columns that are not defined as ignored or done, since an
    // issue's cycleTime also don't include these.
    if (columnCategory !== ("Ignore" || "Done") && cycleTime !== (0 || null)) {
        percent = ((timeSpentInColumn/cycleTime)*100);
        if (percent !== 0) {
            return percent.toFixed(2);
        } else {
            return percent;
        }
    } else {
        return percent;
    }
}

/**
 * Iterate through an issue's column history and return total time spent in the given column.
 */
function getTimeSpentInColumn (issue, columnName) {
    var time = 0;

    _.forEach(issue.columnHistory, function (columnHistoryItem) {
        if(columnHistoryItem.columnName === columnName){
            time += Date.parse(columnHistoryItem.exitTime) - Date.parse(columnHistoryItem.enterTime);
        }
    });

    return time;
}

// Example structure:
//
//  [
//      {"key": "Ready to Refine", "values": [{"x": "KTD-1", "y": 50}, {"x": "KTD-2", "y": 70}, {"x": "KTD-3", "y": 10}]},
//      {"key": "In Progress",     "values": [{"x": "KTD-1", "y": 30}, {"x": "KTD-2", "y": 20}, {"x": "KTD-3", "y": 30}]},
//      {"key": "In Test",         "values": [{"x": "KTD-1", "y": 20}, {"x": "KTD-2", "y": 10}, {"x": "KTD-3", "y": 60}]}
//  ];
function createColDistData (issues, boardDesign) {
    var graphArray = [],
        columnData;

    _.forEach(boardDesign.columns, function (column) {
        columnData = new ColDistItem(column.name);
        columnData.values = ColDistValuesArray(issues, column.name, column.category);
        graphArray.push(columnData);
    });

    console.log(graphArray);
    return graphArray;
}
