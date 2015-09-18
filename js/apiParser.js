/*jslint bitwise: true, plusplus: true, white: true, sub: true, nomen: true*/
/*global console, self:true, _, parseHistory*/

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
    
    return self;
  }

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
    
    function parseHistory(histories){
        var moves = [];
        _.forEach(histories, function(event){
            var moveTime = event.created;
            _.forEach(event.items, function(eventItem){
                if(eventItem.field === "status"){
                    var fromColumn = boardDesign.getColumnMatchingStatus(eventItem.from),
                        toColumn = boardDesign.getColumnMatchingStatus(eventItem.to);
                    moves.push({"fromColumn":fromColumn, "toColumn":toColumn, "moveTime":moveTime});
                }
            });
        });
        counter++;
        console.log(counter + " " + JSON.stringify(moves));
        return moves;
    }

    self.id = apiIssue.id;
    self.title = apiIssue.fields.issuetype.description;
    self.created = apiIssue.fields.created;
    self.currentStatus = parseCurrentStatus(apiIssue.fields.status);
    self.moves = parseHistory(apiIssue.changelog.histories);
    return self;
  }