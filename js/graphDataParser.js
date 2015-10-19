function EtDtGraphData(key){
    var self = this;

    self.key = key;
    self.values = [];

    return self;
}

function EtDtValueItem(delayTime, executionTime, cycleTime){
    var self = this;

    self.x = (delayTime/1000)/60;
    self.y = (executionTime/1000)/60;
    self.size = cycleTime;

    return self;
}

function createEtDtData(key, issues){
    var graphArray = [],
        graphData = new EtDtGraphData(key);

    _.forEach(issues, function(issue){
        graphData.values.push(new EtDtValueItem(issue.delayTime, issue.executionTime, 1));
    });

    graphArray.push(graphData);

    return graphArray;
}
