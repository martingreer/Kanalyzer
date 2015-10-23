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

function parseAmountOfIssues(issues, boardDesign){

}

// Structure: [ { column, [[day1,amountOfIssues],[day2,amountOfIssues]] }   ,   { column, [[day1,amountOfIssues],[day2,amountOfIssues]] } ]
// Example:   [ { "Ready to Refine", [[1444428000000,5],[1444514400000,3]] }   ,   { "Refine Backlog", [[1444428000000,2],[1444514400000,2]] } ]
function createCfdData(issues, boardDesign){

}
