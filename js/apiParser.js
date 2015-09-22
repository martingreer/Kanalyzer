/*jslint bitwise: true, plusplus: true, white: true, sub: true, nomen: true*/
/*global console, self:true, _, parseHistory*/

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
        console.log(columnNames);
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
        console.log(JSON.stringify(columns));
        return columns;
    };
    
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
    
    /**
    * TODO: Time stamps should be ENTER and EXIT.
    */
    function parseHistory(histories){
        var moves = [];
        _.forEach(histories, function(event){
            var moveTime = event.created.substr(0, event.created.indexOf('.'));
            _.forEach(event.items, function(eventItem){
                if(eventItem.field === "status"){
                    var fromColumn = boardDesign.getColumnMatchingStatus(eventItem.from),
                        toColumn = boardDesign.getColumnMatchingStatus(eventItem.to);
                    moves.push({"fromColumn":fromColumn, "toColumn":toColumn, "moveTime":moveTime});
                }
            });
        });
        
        counter++;
        console.log("Issue " + counter + ": " + JSON.stringify(moves));
        return moves;
    }
    
    /**
    * Format the parsed history into [COLUMN, ENTER, EXIT].
    * Example: [{"Ready to Refine", "2015-09-01T14:42:01", "2015-09-01T14:42:23"}]
    */
    function formatMoves(moves){
        var i,
            createdTime = apiIssue.fields.created.substr(0, apiIssue.fields.created.indexOf('.')),
            formattedMoves = [],
            today = new Date(Date.now());
        
        today = today.customFormat("#YYYY#-#MM#-#DD#T#hh#:#mm#:#ss#");
        
        // First item is a special case because we need to set the time which the issue was created as enter time.
        formattedMoves.push({"columnName":moves[0].fromColumn, "enterTime":createdTime, "exitTime":moves[0].moveTime});
        console.log("ITERATION: 0 - " + moves[0].fromColumn + " | " + createdTime + " | " + moves[0].moveTime);
        
        // Events in the middle.
        for(i = 1; i < moves.length; i++){
            formattedMoves.push({"columnName":moves[i].fromColumn, "enterTime":moves[i-1].moveTime, "exitTime":moves[i].moveTime});
            console.log("ITERATION: " + i + " - " + moves[i].fromColumn + " | " + moves[i-1].moveTime + " | " + moves[i].moveTime);
        }
        
        // Last item is a special case because toColumn must become its own object and has no real exit time.
        formattedMoves.push({"columnName":moves[moves.length-1].toColumn, "enterTime":moves[moves.length-1].moveTime, "exitTime":today});
        console.log("ITERATION: " + moves.length + " - " + moves[moves.length-1].toColumn + " | " + moves[moves.length-1].moveTime + " | " + today);
        
        return formattedMoves;
    }
    
    function getTimeInColumns(){
        // TODO: Calculate the sum of time spent in each column.
    }

    self.id = apiIssue.id;
    self.title = apiIssue.fields.issuetype.description;
    self.created = apiIssue.fields.created.substr(0, apiIssue.fields.created.indexOf('.'));
    self.currentStatus = parseCurrentStatus(apiIssue.fields.status);
    self.moves = formatMoves(parseHistory(apiIssue.changelog.histories));
    return self;
  }