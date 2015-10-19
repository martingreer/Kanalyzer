/*jslint bitwise: true, plusplus: true, white: true, sub: true, nomen: true*/
/*global timeUtil, console, self:true, _, parseHistory*/

var DEBUG = true;
var DEBUG_COLUMNHISTORY = false;

/**
 * Narrows down raw api board design data.
 */
function parseBoardDesign(apiBoardDesignRaw){
    "use strict";

    return apiBoardDesignRaw.columnsData;
}

/**
* Current board structure with columns and their underlying statuses.
*/
function BoardDesign(apiColumnsData) {
    "use strict";

    self = _.cloneDeep(apiColumnsData);

    self.getColumnNames = function(){
      var columnNames = [];
      _.forEach(self.columns, function(column){
        columnNames.push(column.name);
      });
      return columnNames;
    };

    self.getColumnMatchingStatus = function(status){
        var columnName = null;
        _.forEach(self.columns, function(column){
            if(_.contains(column.statusIds,status)){
                columnName = column.name;
                return false;
            }
        });
        return columnName;
    };

    /**
    * Hard-code column category to each column for now. Categories are Delay and Execution. Special category: Done.
    * This should later be defined by the user after fetching board data.
    */
    self.setColumnCategories = function(){
        _.forEach(self.columns, function(column){
           switch(column.name){
               case "Ready to Refine":
                   column.category = "Ignore";
                   break;
               case "Refine Backlog":
                   column.category = "Ignore";
                   break;
               case "Ready to Analyze":
                   column.category = "Delay";
                   break;
               case "Ready for Development":
                   column.category = "Delay";
                   break;
               case "Ready for Test":
                   column.category = "Delay";
                   break;
               case "Ready to Accept":
                   column.category = "Delay";
                   break;
               case "Ready for Release":
                   column.category = "Done";
                   break;
               default:
                   column.category = "Execution";
           }
        });

        return self.columns;
    };

    self.getColumnCategory = function(columnName){
        var category = "";
        _.forEach(self.columns, function(column){
           if(column.name === columnName){
               category = column.category;
               return false;
           }
        });
        return category;
    };

    self.isExecutionColumn = function(columnName){
        return self.getColumnCategory(columnName) === "Execution";
    };

    self.isDelayColumn = function(columnName){
        return self.getColumnCategory(columnName) === "Delay";
    };

    self.isDoneColumn = function(columnName){
        return self.getColumnCategory(columnName) === "Done";
    };

    self.setColumnCategories();

    return self;
}

function Moves(histories, boardDesign){
    "use strict";

    var moves = [];

    _.forEach(histories, function(event){
        var moveTime = event.created.substr(0, event.created.indexOf('.'));
        _.forEach(event.items, function(eventItem){
            if(eventItem.field === "status"){
                var fromColumn = boardDesign.getColumnMatchingStatus(eventItem.from),
                    toColumn = boardDesign.getColumnMatchingStatus(eventItem.to);
                moves.push(new MoveItem(fromColumn, toColumn, moveTime));
            }
        });
    });

    return moves;
}

function MoveItem(fromColumn, toColumn, moveTime){
    "use strict";

    var self = this;
    self.fromColumn = fromColumn;
    self.toColumn = toColumn;
    self.moveTime = moveTime;
    return self;
}

function ColumnHistoryItem(columnName, enterTime, exitTime){
    "use strict";

    var self = this;
    self.columnName = columnName;
    self.enterTime = enterTime;
    self.exitTime = exitTime;

    self.timeSpentInColumn = function(){
        return Date.parse(self.exitTime) - Date.parse(self.enterTime);
    };

    return self;
}

/**
 * Narrows down raw api issues data to only the issues as objects in a json array.
 */
function parseMultipleApiIssues(apiIssuesRaw){
    "use strict";

    return apiIssuesRaw.issues;
}

/**
* Create new issue object containing ID, summary, key, column history.
*/
function Issue(apiIssue, boardDesign){
    "use strict";

    var self = {};

    function parseCurrentStatus(currentStatus){
      var status = {};
      status.id = currentStatus.id;
      status.name = currentStatus.name;
      return status;
    }

    function parseApiIssueHistories(apiIssueHistories){
        return new Moves(apiIssueHistories, boardDesign);
    }

    function startColumn(apiIssue){
        return new ColumnHistoryItem(boardDesign.getColumnMatchingStatus(apiIssue.fields.status.id), self.created, timeUtil.getTimestamp());
    }

    function createColumnHistory(apiIssue){
        var columnHistory = [];

        if(apiIssue.changelog.histories.length === 0){
            columnHistory.push(startColumn(apiIssue));
        } else {
            columnHistory = parseMoves(parseApiIssueHistories(apiIssue.changelog.histories));
        }

        return columnHistory;
    }

    /**
    * Format the parsed history into [COLUMN, ENTER, EXIT].
    * Example: [{"columnName":"Ready to Refine", "enterTime":"2015-09-01T14:42:01", "exitTime":"2015-09-01T14:42:23"}]
    */
    function parseMoves(columnHistory){
        var i,
            createdTime = apiIssue.fields.created.substr(0, apiIssue.fields.created.indexOf('.')),
            columnsWithEnterExit = [];

        // First item is a special case because we need to set the time which the issue was created as enter time.
        columnsWithEnterExit.push(new ColumnHistoryItem(columnHistory[0].fromColumn, createdTime, columnHistory[0].moveTime));
        if(DEBUG_COLUMNHISTORY){console.log("ITERATION: 0 - " + columnHistory[0].fromColumn + " | " + createdTime + " | " + columnHistory[0].moveTime);}

        // Events in the middle.
        for(i = 1; i < columnHistory.length; i++){
            columnsWithEnterExit.push(new ColumnHistoryItem(columnHistory[i].fromColumn, columnHistory[i-1].moveTime, columnHistory[i].moveTime));
            if(DEBUG_COLUMNHISTORY){console.log("ITERATION: " + i + " - " + columnHistory[i].fromColumn + " | " + columnHistory[i-1].moveTime + " | " + columnHistory[i].moveTime);}
        }

        // Last item is a special case because toColumn must become its own object and has no real exit time.
        columnsWithEnterExit.push(new ColumnHistoryItem(columnHistory[columnHistory.length-1].toColumn, columnHistory[columnHistory.length-1].moveTime, timeUtil.getTimestamp()));
        if(DEBUG_COLUMNHISTORY){console.log("ITERATION: " + columnHistory.length + " - " + columnHistory[columnHistory.length-1].toColumn + " | " + columnHistory[columnHistory.length-1].moveTime + " | " + timeUtil.getTimestamp());}

        return columnsWithEnterExit;
    }

    /**
     *  Calculates the sum of time spent in each column and relates them to a matching column category.
     *
     *  <<DEPRECATED>>
     */
    function getTimeInColumns(){
        var i,
            j,
            columnsWithTimeSpent = [],
            columnCategories = boardDesign.setColumnCategories();

        for(i = 0; i < self.columnHistory.length; i++){
            var columnName = self.columnHistory[i].columnName,
                columnCategory,
                timeSpent = self.columnHistory[i].timeSpentInColumn();
            for(j = 0; j < columnCategories.length; j++){
                if(columnCategories[j].columnName === self.columnHistory[i].columnName){
                    columnCategory = columnCategories[j].columnCategory;
                }
            }
            columnsWithTimeSpent.push({"columnName": columnName, "columnCategory": columnCategory, "timeSpent": timeSpent});
        }

        if(DEBUG){console.log(JSON.stringify(columnsWithTimeSpent));}

        return columnsWithTimeSpent;
    }

    function isExecutionColumn (columnName) {
        return boardDesign.isExecutionColumn(columnName);
    }

    function isDelayColumn (columnName) {
        return boardDesign.isDelayColumn(columnName);
    }

    /**
     * Check if issue is in a column which is Done category.
     */
    self.isDone = function(){
        var columnName = _.last(self.columnHistory).columnName;
        return boardDesign.isDoneColumn(columnName);
    };

    /**
     * Calculate Cycle Time for the issue.
     */
    function getCycleTime(){
        var cycleTime = 0,
            columnHistory = _.cloneDeep(self.columnHistory);

        if(self.isDone()){
            columnHistory.pop();
            _.forEach(columnHistory, function(item){
                cycleTime += item.timeSpentInColumn();
            });
            return cycleTime;
        } else {
            return null;
        }
    }

    function getExecutionTime(){
        var executionTime = 0,
            columnHistory = _.cloneDeep(self.columnHistory);

        if(self.isDone()) {
            columnHistory.pop();
        }

        _.forEach(columnHistory, function(item){
            if(isExecutionColumn(item.columnName)) {
                executionTime += item.timeSpentInColumn();
            }
        });
        return executionTime;
    }

    function getDelayTime(){
        var delayTime = 0,
            columnHistory = _.cloneDeep(self.columnHistory);

        if(self.isDone()) {
            columnHistory.pop();
        }

        _.forEach(columnHistory, function(item){
            if(isDelayColumn(item.columnName)) {
                delayTime += item.timeSpentInColumn();
            }
        });
        return delayTime;
    }

    function getProcessEfficiency(executionTime, cycleTime){
        if(cycleTime) {
            return executionTime / cycleTime;
        } else {
            return 0;
        }
    }

    self.id = apiIssue.id;
    self.key = apiIssue.key;
    self.summary = apiIssue.fields.summary;
    self.created = apiIssue.fields.created.substr(0, apiIssue.fields.created.indexOf('.'));
    self.currentStatus = parseCurrentStatus(apiIssue.fields.status);
    self.columnHistory = createColumnHistory(apiIssue);
    self.cycleTime = getCycleTime();
    self.executionTime = getExecutionTime();
    self.delayTime = getDelayTime();
    self.processEfficiency = getProcessEfficiency(self.executionTime, self.cycleTime);
    return self;
  }
