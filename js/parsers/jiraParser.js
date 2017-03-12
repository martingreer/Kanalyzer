/*jslint bitwise: true, plusplus: true, white: true, sub: true, nomen: true*/
/*global timeUtil, console, self:true, _, parseHistory*/

const DEBUG_COLUMNHISTORY = false;

const CATEGORY_DELAY = "Delay";
const CATEGORY_IGNORE = "Ignore";
const CATEGORY_EXECUTION = "Execution";
const CATEGORY_DONE = "Done";

/**
 * Create a new instance of a board design object.
 * Will detect whether the incoming board design is raw data from API or has already been parsed.
 */
function createBoardDesign(boardDesignToParse) {
    var boardDesign;

    if (boardDesignToParse.columnConfig) {
        // Incoming board design is raw data from API and contains the "columnConfig" property.
        delete boardDesignToParse.columnConfig.constraintType; // Not interested in this property
        boardDesign = new BoardDesign(boardDesignToParse.columnConfig, boardDesignToParse.name);
    } else {
        // Incomfing board design has been parsed already and instead stores the column config in a "columns" property.
        boardDesign = new BoardDesign(boardDesignToParse, boardDesignToParse.name);
    }

    return boardDesign;
}

/**
 * Current board structure with columns and their underlying statuses.
 */
function BoardDesign(apiColumnsData, boardName) {
    "use strict";

    var self = _.cloneDeep(apiColumnsData);

    self.getColumnNames = function () {
        var columnNames = [];
        _.forEach(self.columns, function (column) {
            columnNames.push(column.name);
        });
        return columnNames;
    };

    self.getColumnMatchingStatus = function (status) {
        var columnName = null;
        _.forEach(self.columns, function (column) {
            _.forEach(column.statuses, function (columnStatus) {
                if (columnStatus.id === status) {
                    columnName = column.name;
                    return false; // break loop
                }
            });
        });
        return columnName;
    };

    /**
     * Try to guess initial values of the column categories based on the column name.
     */
    self.createColumnCategories = function () {
        var hasCategories;

        hasCategories = _.first(self.columns).hasOwnProperty('category');

        if (!hasCategories) {
            _.forEach(self.columns, function (column) {
                if (column.name.toLowerCase().indexOf("ready") >= 0) {
                    column.category = CATEGORY_DELAY;
                } else if (column.name.toLowerCase().indexOf("backlog") >= 0) {
                    column.category = CATEGORY_IGNORE;
                } else if (column.name.toLowerCase().trim().indexOf("todo") >= 0) {
                    column.category = CATEGORY_IGNORE;
                } else {
                    column.category = CATEGORY_EXECUTION;
                }
            });

            _.first(self.columns).category = CATEGORY_IGNORE;
            _.last(self.columns).category = CATEGORY_DONE;
        }

        return self.columns;
    };

    self.getColumnCategory = function (columnName) {
        var category = "";
        _.forEach(self.columns, function (column) {
            if (column.name === columnName) {
                category = column.category;
                return false; // break here, assuming there are no duplicate column names
            }
        });
        return category;
    };

    self.isIncludedInBoardDesign = function (columnName) {
        var result = false;
        _.forEach(self.columns, function (column) {
            if (column.name === columnName) {
                result = true;
                return false; // break here, column match found
            }
        });
        return result;
    };

    self.isIgnoreColumn = function (columnName) {
        return self.getColumnCategory(columnName) === CATEGORY_IGNORE;
    };

    self.isExecutionColumn = function (columnName) {
        return self.getColumnCategory(columnName) === CATEGORY_EXECUTION;
    };

    self.isDelayColumn = function (columnName) {
        return self.getColumnCategory(columnName) === CATEGORY_DELAY;
    };

    self.isDoneColumn = function (columnName) {
        var result = false;
        if (columnName) {
            result = self.getColumnCategory(columnName) === CATEGORY_DONE;
        }
        return result;
    };

    self.name = boardName;
    self.createColumnCategories();

    return self;
}

function Moves(histories, boardDesign) {
    "use strict";

    var moves = [];

    _.forEach(histories, function (event) {
        var moveTime = event.created.substr(0, event.created.indexOf('.'));
        _.forEach(event.items, function (eventItem) {
            if (eventItem.field === "status") {
                var fromColumn = boardDesign.getColumnMatchingStatus(eventItem.from),
                    toColumn = boardDesign.getColumnMatchingStatus(eventItem.to);
                moves.push(new MoveItem(fromColumn, toColumn, moveTime));
            }
        });
    });

    return moves;
}

function MoveItem(fromColumn, toColumn, moveTime) {
    "use strict";

    var self = this;
    self.fromColumn = fromColumn;
    self.toColumn = toColumn;
    self.moveTime = moveTime;
    return self;
}

function ColumnHistoryItem(columnName, enterTime, exitTime) {
    "use strict";

    var self = this;
    self.columnName = columnName;
    self.enterTime = enterTime;
    self.exitTime = exitTime;

    self.timeSpentInColumn = function () {
        return Date.parse(self.exitTime) - Date.parse(self.enterTime);
    };

    return self;
}

/**
 * Narrows down raw api issues data to only the issues as objects in a json array.
 */
function parseMultipleApiIssues(apiIssuesRaw) {
    "use strict";

    return apiIssuesRaw.issues;
}

/**
 * Constructs new issues from an array of issue data.
 */
function createIssuesFromArray(apiIssues, boardDesign) {
    var issues = [];

    _.forEach(apiIssues, function (issue) {
        var parsedIssue = new Issue(issue, boardDesign);
        if (parsedIssue.columnHistory.length > 0) {
            issues.push(parsedIssue);
        }
    });

    return issues;
}

/**
 * Create new issue object containing ID, summary, key, column history.
 */
function Issue(apiIssue, boardDesign, time) {
    "use strict";

    var self = {},
        isAlreadyParsed = apiIssue.changelog == null;

    if (!time) {
        time = timeUtil.getTimestamp();
    }

    function parseCurrentStatus(currentStatus) {
        var status = {};
        status.id = currentStatus.id;
        status.name = currentStatus.name;
        return status;
    }

    function parseApiIssueHistories(apiIssueHistories) {
        return new Moves(apiIssueHistories, boardDesign);
    }

    function getStartColumn(apiIssue) {
        return new ColumnHistoryItem(boardDesign.getColumnMatchingStatus(apiIssue.fields.status.id), self.created, time);
    }

    function createColumnHistoryAlreadyParsed(parsedIssue) {
        var columnHistory = [];

        _.forEach(parsedIssue.columnHistory, function (item) {
            columnHistory.push(new ColumnHistoryItem(item.columnName, item.enterTime, item.exitTime));
        });

        return columnHistory;
    }

    function createColumnHistory(apiIssue) {
        var columnHistory = [],
            issueHasHistory = !(apiIssue.changelog.histories.length === 0),
            issueHasStatusChangeInHistory = false;

        _.forEach(apiIssue.changelog.histories, function (event) {
            _.forEach(event.items, function (item) {
                if (item.field === "status") {
                    //console.log(apiIssue.key + " ||| StatusChange: false | FirstColumn: " + boardDesign.getColumnMatchingStatus(apiIssue.fields.status.id));
                    issueHasStatusChangeInHistory = true;
                    return false;
                }
            });
        });

        if (!issueHasHistory || !issueHasStatusChangeInHistory) {
            //console.log(apiIssue.key + " ||| History: " + issueHasHistory + " | StatusChange: " + issueHasStatusChangeInHistory + " | FirstColumn: " + boardDesign.getColumnMatchingStatus(apiIssue.fields.status.id));
            var startColumn = getStartColumn(apiIssue);
            if (isIncludedInBoardDesign(startColumn.columnName)) {
                columnHistory.push(startColumn);
            }
        } else {
            columnHistory = parseMoves(parseApiIssueHistories(apiIssue.changelog.histories));
        }

        return columnHistory;
    }

    /**
     * Format the parsed history into [COLUMN, ENTER, EXIT].
     * Example: [{"columnName":"Ready to Refine", "enterTime":"2015-09-01T14:42:01", "exitTime":"2015-09-01T14:42:23"}]
     */
    function parseMoves(columnHistory) {
        var i,
            createdTime = apiIssue.fields.created.substr(0, apiIssue.fields.created.indexOf('.')),
            columnsWithEnterExit = [];

        // First item is a special case because we need to set the time which the issue was created as enter time.
        if (isIncludedInBoardDesign(columnHistory[0].fromColumn)) {
            columnsWithEnterExit.push(new ColumnHistoryItem(columnHistory[0].fromColumn, createdTime, columnHistory[0].moveTime));
            if (DEBUG_COLUMNHISTORY) {
                console.log("ITERATION: 0 - " + columnHistory[0].fromColumn + " | " + createdTime + " | " + columnHistory[0].moveTime);
            }
        }

        // Events in the middle.
        for (i = 1; i < columnHistory.length; i++) {
            if (isIncludedInBoardDesign(columnHistory[i].fromColumn)) {
                columnsWithEnterExit.push(new ColumnHistoryItem(columnHistory[i].fromColumn, columnHistory[i - 1].moveTime, columnHistory[i].moveTime));
                if (DEBUG_COLUMNHISTORY) {
                    console.log("ITERATION: " + i + " - " + columnHistory[i].fromColumn + " | " + columnHistory[i - 1].moveTime + " | " + columnHistory[i].moveTime);
                }
            }
        }

        // Last item is a special case because toColumn must become its own object and has no real exit time.
        if (isIncludedInBoardDesign(columnHistory[columnHistory.length - 1].toColumn)) {
            columnsWithEnterExit.push(new ColumnHistoryItem(columnHistory[columnHistory.length - 1].toColumn, columnHistory[columnHistory.length - 1].moveTime, time));
            if (DEBUG_COLUMNHISTORY) {
                console.log("ITERATION: " + columnHistory.length + " - " + columnHistory[columnHistory.length - 1].toColumn + " | " + columnHistory[columnHistory.length - 1].moveTime + " | " + time);
            }
        }

        return columnsWithEnterExit;
    }

    function isIncludedInBoardDesign(columnName) {
        var result = false;
        if (columnName) {
            result = boardDesign.isIncludedInBoardDesign(columnName);
        }
        return result;
    }

    function isExecutionColumn(columnName) {
        return boardDesign.isExecutionColumn(columnName);
    }

    function isDelayColumn(columnName) {
        return boardDesign.isDelayColumn(columnName);
    }

    /**
     * Checks if issue was done and then reopened again. These issues need to be handled differently, as the time spent
     * in the Done column is effectively delay time.
     *
     * @returns {boolean} true if column has been reopened, false otherwise.
     */
    function issueWasReopened () {
        function historyContainsMultipleDoneColumns() {
            let numberOfInstances = 0;
            let columnHistory = _.cloneDeep(self.columnHistory);

            _.forEach(columnHistory, function (columnHistoryItem) {
                if (boardDesign.isDoneColumn(columnHistoryItem.columnName)) {
                    numberOfInstances++;
                }
            });
            return numberOfInstances > 1;
        }

        return historyContainsMultipleDoneColumns();
    }

    /**
     * Check if issue is in a column which is Done category.
     */
    self.isDone = function () {
        var result = false;
        if (self.columnHistory.length > 0) {
            var columnName = _.last(self.columnHistory).columnName;
            result = boardDesign.isDoneColumn(columnName);
        }
        return result;
    };

    /**
     * Check if issue is in a column which should be ignored in calculations.
     */
    self.isIgnored = function (columnName) {
        return boardDesign.isIgnoreColumn(columnName);
    };

    /**
     * Calculate Cycle Time for the issue.
     */
    function getCycleTime() {
        var cycleTime = 0,
            columnHistory = _.cloneDeep(self.columnHistory);

        if (self.isDone()) {
            columnHistory.pop(); // Remove the last Done column from calculation
            _.forEach(columnHistory, function (item) {
                if (!self.isIgnored(item.columnName)) {
                    cycleTime += item.timeSpentInColumn();
                }
            });
            return cycleTime;
        } else {
            return null;
        }
    }

    function getExecutionTime() {
        var executionTime = 0,
            columnHistory = _.cloneDeep(self.columnHistory);

        if (self.isDone()) {
            columnHistory.pop(); // Remove done column from calculation
        }

        _.forEach(columnHistory, function (item) {
            if (isExecutionColumn(item.columnName)) {
                executionTime += item.timeSpentInColumn();
            }
        });

        return executionTime;
    }

    function getDelayTime() {
        var delayTime = 0,
            columnHistory = _.cloneDeep(self.columnHistory);

        if (self.isDone()) {
            columnHistory.pop();
        }

        _.forEach(columnHistory, function (item) {
            if (isDelayColumn(item.columnName) || self.wasReopened) {
                // When issue has been reopened, all Done columns should also count as delay time.
                delayTime += item.timeSpentInColumn();
            }
        });
        return delayTime;
    }

    function getProcessEfficiency(executionTime, cycleTime) {
        if (cycleTime) {
            return executionTime / cycleTime;
        } else {
            return 0;
        }
    }

    self.isInBetween = function (x, startValue, endValue) {
        return x >= startValue && x <= endValue;
    };

    self.id = apiIssue.id;
    self.key = apiIssue.key;

    if (!isAlreadyParsed) {
        self.summary = apiIssue.fields.summary;
        self.created = apiIssue.fields.created.substr(0, apiIssue.fields.created.indexOf('.'));
        self.currentStatus = parseCurrentStatus(apiIssue.fields.status);
        self.columnHistory = createColumnHistory(apiIssue);
    } else {
        self.summary = apiIssue.summary;
        self.created = apiIssue.created;
        self.currentStatus = apiIssue.currentStatus;
        self.columnHistory = createColumnHistoryAlreadyParsed(apiIssue);
    }

    /**
     * Checks which column this issue was in at a given time.
     */
    self.wasInColumnAtTimeStamp = function (time, column) {
        return self.isInBetween(time, Date.parse(column.enterTime), Date.parse(column.exitTime));
    };

    self.wasReopened = issueWasReopened();
    self.cycleTime = getCycleTime();
    self.executionTime = getExecutionTime();
    self.delayTime = getDelayTime();
    self.processEfficiency = getProcessEfficiency(self.executionTime, self.cycleTime);
    return self;
}
