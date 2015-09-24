/*jslint bitwise: true, plusplus: true, white: true, sub: true, nomen: true*/
/*global timeUtil, console, self:true, _, parseHistory*/

var DEBUG = true;

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
        if(DEBUG){console.log(columnNames);}
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
    self.getColumnCategories = function(column){
        var columns = [];

        _.forEach(self.columns, function(column){
           switch(column.name){
               case "Ready to Refine":
                   column.category = "Delay";
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
               case "Ready for Releas":
                   column.category = "Done";
                   break;
               default:
                   column.category = "Execution";
           }
           columns.push({"columnName":column.name, "columnCategory":column.category});
        });
        //if(DEBUG){console.log(JSON.stringify(columns));}
        return columns;
    };

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
    return self;
}

/**
* Issues containing ID, title, column history.
*/
function Issue(apiIssue, boardDesign){
    "use strict";

    var self = {},
        counter = 0;

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
        if(DEBUG){console.log("ITERATION: 0 - " + columnHistory[0].fromColumn + " | " + createdTime + " | " + columnHistory[0].moveTime);}

        // Events in the middle.
        for(i = 1; i < columnHistory.length; i++){
            columnsWithEnterExit.push(new ColumnHistoryItem(columnHistory[i].fromColumn, columnHistory[i-1].moveTime, columnHistory[i].moveTime));
            if(DEBUG){console.log("ITERATION: " + i + " - " + columnHistory[i].fromColumn + " | " + columnHistory[i-1].moveTime + " | " + columnHistory[i].moveTime);}
        }

        // Last item is a special case because toColumn must become its own object and has no real exit time.
        columnsWithEnterExit.push(new ColumnHistoryItem(columnHistory[columnHistory.length-1].toColumn, columnHistory[columnHistory.length-1].moveTime, timeUtil.getTimestamp()));
        if(DEBUG){console.log("ITERATION: " + columnHistory.length + " - " + columnHistory[columnHistory.length-1].toColumn + " | " + columnHistory[columnHistory.length-1].moveTime + " | " + timeUtil.getTimestamp());}

        return columnsWithEnterExit;
    }

    function getTimeInColumns(columnsWithEnterExit){
        // TODO: Calculate the sum of time spent in each column and relate them to column category.
        var i,
            j,
            columnsWithTimeSpent = [],
            columnCategories = boardDesign.getColumnCategories();

        for(i = 0; i < 4; i++) {
            var columnName = columnsWithEnterExit[i].columnName,
                columnCategory,
                timeSpent = Date.parse(columnsWithEnterExit[i].exitTime) - Date.parse(columnsWithEnterExit[i].enterTime);
            for(j = 0; j < columnCategories.length; j++){
                if(columnCategories[j].columnName === columnsWithEnterExit[i].columnName){
                    columnCategory = columnCategories[j].columnCategory;
                }
            }
            columnsWithTimeSpent.push({"columnName": columnName, "columnCategory": columnCategory, "timeSpent": timeSpent});
        }

        if(DEBUG){console.log(JSON.stringify(columnsWithTimeSpent));}

        return columnsWithTimeSpent;
    }

    self.id = apiIssue.id;
    self.title = apiIssue.fields.issuetype.description;
    self.created = apiIssue.fields.created.substr(0, apiIssue.fields.created.indexOf('.'));
    self.currentStatus = parseCurrentStatus(apiIssue.fields.status);
    self.columnHistory = createColumnHistory(apiIssue);
    self.columnsWithTimeSpent = getTimeInColumns(self.columnHistory);
    return self;
  }
