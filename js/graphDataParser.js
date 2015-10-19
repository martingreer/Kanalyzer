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
    console.log(JSON.stringify(graphArray));

    return graphArray;
}
