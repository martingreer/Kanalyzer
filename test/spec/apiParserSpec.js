/**
 * Test for apiParser.js
 */

/*global describe, it, expect, beforeEach, beforeAll, module, inject, BoardDesign, approveIt, Issue*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

(function(){
    "use strict";
}());

/**
* Temporary data for testing.
*/
var columnsData = {
  "rapidViewId": 2,
  "columns": [
    {
      "id": 11,
      "name": "Ready to Refine",
      "statusIds": [
        "10000"
      ],
      "statisticsFieldValue": 1.0
    },
    {
      "id": 21,
      "name": "Refine Backlog",
      "statusIds": [
        "10010"
      ],
      "statisticsFieldValue": 1.0
    },
    {
      "id": 22,
      "name": "Ready to Analyze",
      "statusIds": [
        "10012"
      ],
      "statisticsFieldValue": 2.0
    },
    {
      "id": 12,
      "name": "Analyze",
      "statusIds": [
        "10002"
      ],
      "statisticsFieldValue": 0.0
    },
    {
      "id": 13,
      "name": "Ready for Development",
      "statusIds": [
        "10003"
      ],
      "statisticsFieldValue": 0.0
    },
    {
      "id": 14,
      "name": "In Progress",
      "statusIds": [
        "3",
        "10004"
      ],
      "statisticsFieldValue": 2.0
    },
    {
      "id": 15,
      "name": "Under Review",
      "statusIds": [
        "10005"
      ],
      "statisticsFieldValue": 0.0
    },
    {
      "id": 16,
      "name": "Ready for Test",
      "statusIds": [
        "10006"
      ],
      "statisticsFieldValue": 0.0
    },
    {
      "id": 17,
      "name": "Under Test",
      "statusIds": [
        "10007"
      ],
      "statisticsFieldValue": 0.0
    },
    {
      "id": 18,
      "name": "Ready to Accept",
      "statusIds": [
        "10008"
      ],
      "statisticsFieldValue": 0.0
    },
    {
      "id": 19,
      "name": "Accept",
      "statusIds": [
        "10009"
      ],
      "statisticsFieldValue": 1.0
    },
    {
      "id": 20,
      "name": "Ready for Releas",
      "statusIds": [
        "10001"
      ],
      "statisticsFieldValue": 6.0
    }
  ]
};

var apiIssueWithHistory = {
        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
        "id": "10000",
        "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/10000",
        "key": "KTD-1",
        "fields": {
            "issuetype": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/issuetype/10000",
                "id": "10000",
                "description": "A task that needs to be done.",
                "iconUrl": "https://kanalyzer.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10500&avatarType=issuetype",
                "name": "Task",
                "subtask": false,
                "avatarId": 10500
            },
            "timespent": null,
            "project": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/project/10000",
                "id": "10000",
                "key": "KTD",
                "name": "Kanalyzer Test Data",
                "avatarUrls": {
                    "48x48": "https://kanalyzer.atlassian.net/secure/projectavatar?pid=10000&avatarId=10325",
                    "24x24": "https://kanalyzer.atlassian.net/secure/projectavatar?size=small&pid=10000&avatarId=10325",
                    "16x16": "https://kanalyzer.atlassian.net/secure/projectavatar?size=xsmall&pid=10000&avatarId=10325",
                    "32x32": "https://kanalyzer.atlassian.net/secure/projectavatar?size=medium&pid=10000&avatarId=10325"
                }
            },
            "fixVersions": [

            ],
            "aggregatetimespent": null,
            "resolution": null,
            "resolutiondate": null,
            "workratio": -1,
            "lastViewed": "2015-09-09T16:35:12.898+0200",
            "watches": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/KTD-1/watchers",
                "watchCount": 1,
                "isWatching": true
            },
            "created": "2015-09-01T14:42:01.000+0200",
            "customfield_10020": null,
            "customfield_10021": null,
            "customfield_10022": null,
            "priority": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/priority/3",
                "iconUrl": "https://kanalyzer.atlassian.net/images/icons/priorities/medium.png",
                "name": "Medium",
                "id": "3"
            },
            "customfield_10023": "Not Started",
            "customfield_10024": null,
            "labels": [

            ],
            "customfield_10016": null,
            "customfield_10017": null,
            "customfield_10018": null,
            "customfield_10019": null,
            "timeestimate": null,
            "aggregatetimeoriginalestimate": null,
            "versions": [

            ],
            "issuelinks": [

            ],
            "assignee": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
                "name": "martin.w.greer",
                "key": "martin.w.greer",
                "emailAddress": "martin.w.greer@gmail.com",
                "avatarUrls": {
                    "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                    "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                    "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                    "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                },
                "displayName": "Martin Greer",
                "active": true,
                "timeZone": "Europe/Berlin"
            },
            "updated": "2015-09-09T16:35:12.000+0200",
            "status": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/status/10009",
                "description": "This status is managed internally by JIRA Agile",
                "iconUrl": "https://kanalyzer.atlassian.net/",
                "name": "Accept",
                "id": "10009",
                "statusCategory": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/statuscategory/4",
                    "id": 4,
                    "key": "indeterminate",
                    "colorName": "yellow",
                    "name": "In Progress"
                }
            },
            "components": [

            ],
            "timeoriginalestimate": null,
            "description": "Write and hand in planning report.",
            "customfield_10012": "0|hzzzzz:",
            "customfield_10013": null,
            "customfield_10014": null,
            "customfield_10015": null,
            "customfield_10007": null,
            "customfield_10009": null,
            "aggregatetimeestimate": null,
            "summary": "Write planning report",
            "creator": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
                "name": "martin.w.greer",
                "key": "martin.w.greer",
                "emailAddress": "martin.w.greer@gmail.com",
                "avatarUrls": {
                    "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                    "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                    "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                    "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                },
                "displayName": "Martin Greer",
                "active": true,
                "timeZone": "Europe/Berlin"
            },
            "subtasks": [

            ],
            "reporter": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
                "name": "martin.w.greer",
                "key": "martin.w.greer",
                "emailAddress": "martin.w.greer@gmail.com",
                "avatarUrls": {
                    "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                    "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                    "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                    "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                },
                "displayName": "Martin Greer",
                "active": true,
                "timeZone": "Europe/Berlin"
            },
            "customfield_10000": null,
            "aggregateprogress": {
                "progress": 0,
                "total": 0
            },
            "customfield_10001": null,
            "customfield_10002": null,
            "customfield_10003": null,
            "customfield_10004": null,
            "environment": null,
            "duedate": null,
            "progress": {
                "progress": 0,
                "total": 0
            },
            "votes": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/KTD-1/votes",
                "votes": 0,
                "hasVoted": false
            }
        },
        "changelog": {
            "startAt": 0,
            "maxResults": 6,
            "total": 6,
            "histories": [
                {
                    "id": "10000",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
                        "name": "martin.w.greer",
                        "key": "martin.w.greer",
                        "emailAddress": "martin.w.greer@gmail.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Martin Greer",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-01T14:42:23.667+0200",
                    "items": [
                        {
                            "field": "status",
                            "fieldtype": "jira",
                            "from": "10000",
                            "fromString": "To Do",
                            "to": "3",
                            "toString": "In Progress"
                        }
                    ]
                },
                {
                    "id": "10002",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
                        "name": "martin.w.greer",
                        "key": "martin.w.greer",
                        "emailAddress": "martin.w.greer@gmail.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Martin Greer",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-02T10:40:22.627+0200",
                    "items": [
                        {
                            "field": "status",
                            "fieldtype": "jira",
                            "from": "3",
                            "fromString": "In Progress",
                            "to": "10005",
                            "toString": "Under Review"
                        }
                    ]
                },
                {
                    "id": "10003",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
                        "name": "martin.w.greer",
                        "key": "martin.w.greer",
                        "emailAddress": "martin.w.greer@gmail.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Martin Greer",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-02T10:43:50.955+0200",
                    "items": [
                        {
                            "field": "assignee",
                            "fieldtype": "jira",
                            "from": null,
                            "fromString": null,
                            "to": "martin.w.greer",
                            "toString": "Martin Greer"
                        }
                    ]
                },
                {
                    "id": "10019",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
                        "name": "martin.w.greer",
                        "key": "martin.w.greer",
                        "emailAddress": "martin.w.greer@gmail.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Martin Greer",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-02T11:18:39.546+0200",
                    "items": [
                        {
                            "field": "issuetype",
                            "fieldtype": "jira",
                            "from": "10003",
                            "fromString": "Story",
                            "to": "10000",
                            "toString": "Task"
                        }
                    ]
                },
                {
                    "id": "10021",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
                        "name": "martin.w.greer",
                        "key": "martin.w.greer",
                        "emailAddress": "martin.w.greer@gmail.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Martin Greer",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-02T11:21:36.098+0200",
                    "items": [
                        {
                            "field": "summary",
                            "fieldtype": "jira",
                            "from": null,
                            "fromString": "Planning report",
                            "to": null,
                            "toString": "Write planning report"
                        }
                    ]
                },
                {
                    "id": "10111",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
                        "name": "martin.w.greer",
                        "key": "martin.w.greer",
                        "emailAddress": "martin.w.greer@gmail.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Martin Greer",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-09T16:35:12.918+0200",
                    "items": [
                        {
                            "field": "status",
                            "fieldtype": "jira",
                            "from": "10005",
                            "fromString": "Under Review",
                            "to": "10009",
                            "toString": "Accept"
                        }
                    ]
                }
            ]
        }
    };

 var apiIssueWithoutHistory =
    {
        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
        "id": "10303",
        "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/10303",
        "key": "KTD-33",
        "fields": {
          "issuetype": {
            "self": "https://kanalyzer.atlassian.net/rest/api/2/issuetype/10000",
            "id": "10000",
            "description": "A task that needs to be done.",
            "iconUrl": "https://kanalyzer.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10500&avatarType=issuetype",
            "name": "Task",
            "subtask": false,
            "avatarId": 10500
          },
          "timespent": null,
          "project": {
            "self": "https://kanalyzer.atlassian.net/rest/api/2/project/10000",
            "id": "10000",
            "key": "KTD",
            "name": "Kanalyzer Test Data",
            "avatarUrls": {
              "48x48": "https://kanalyzer.atlassian.net/secure/projectavatar?pid=10000&avatarId=10325",
              "24x24": "https://kanalyzer.atlassian.net/secure/projectavatar?size=small&pid=10000&avatarId=10325",
              "16x16": "https://kanalyzer.atlassian.net/secure/projectavatar?size=xsmall&pid=10000&avatarId=10325",
              "32x32": "https://kanalyzer.atlassian.net/secure/projectavatar?size=medium&pid=10000&avatarId=10325"
            }
          },
          "fixVersions": [

          ],
          "aggregatetimespent": null,
          "resolution": null,
          "resolutiondate": null,
          "workratio": -1,
          "lastViewed": "2015-09-22T10:39:28.402+0200",
          "watches": {
            "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/KTD-33/watchers",
            "watchCount": 1,
            "isWatching": true
          },
          "created": "2015-09-22T10:39:28.000+0200",
          "customfield_10020": null,
          "customfield_10021": null,
          "customfield_10022": null,
          "priority": {
            "self": "https://kanalyzer.atlassian.net/rest/api/2/priority/3",
            "iconUrl": "https://kanalyzer.atlassian.net/images/icons/priorities/medium.svg",
            "name": "Medium",
            "id": "3"
          },
          "customfield_10023": "Not Started",
          "customfield_10024": null,
          "labels": [

          ],
          "customfield_10016": null,
          "customfield_10017": null,
          "customfield_10018": null,
          "customfield_10019": null,
          "timeestimate": null,
          "aggregatetimeoriginalestimate": null,
          "versions": [

          ],
          "issuelinks": [

          ],
          "assignee": null,
          "updated": "2015-09-22T10:39:28.000+0200",
          "status": {
            "self": "https://kanalyzer.atlassian.net/rest/api/2/status/10000",
            "description": "",
            "iconUrl": "https://kanalyzer.atlassian.net/images/icons/statuses/open.png",
            "name": "To Do",
            "id": "10000",
            "statusCategory": {
              "self": "https://kanalyzer.atlassian.net/rest/api/2/statuscategory/2",
              "id": 2,
              "key": "new",
              "colorName": "blue-gray",
              "name": "To Do"
            }
          },
          "components": [

          ],
          "timeoriginalestimate": null,
          "description": null,
          "customfield_10012": "0|i0007b:",
          "customfield_10013": null,
          "customfield_10014": null,
          "customfield_10015": null,
          "customfield_10007": null,
          "customfield_10009": null,
          "aggregatetimeestimate": null,
          "summary": "Testing testing",
          "creator": {
            "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
            "name": "martin.w.greer",
            "key": "martin.w.greer",
            "emailAddress": "martin.w.greer@gmail.com",
            "avatarUrls": {
              "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
              "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
              "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
              "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
            },
            "displayName": "Martin Greer",
            "active": true,
            "timeZone": "Europe/Berlin"
          },
          "subtasks": [

          ],
          "reporter": {
            "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.greer",
            "name": "martin.w.greer",
            "key": "martin.w.greer",
            "emailAddress": "martin.w.greer@gmail.com",
            "avatarUrls": {
              "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
              "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
              "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
              "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
            },
            "displayName": "Martin Greer",
            "active": true,
            "timeZone": "Europe/Berlin"
          },
          "customfield_10000": null,
          "aggregateprogress": {
            "progress": 0,
            "total": 0
          },
          "customfield_10001": null,
          "customfield_10002": null,
          "customfield_10003": null,
          "customfield_10004": null,
          "environment": null,
          "duedate": null,
          "progress": {
            "progress": 0,
            "total": 0
          },
          "votes": {
            "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/KTD-33/votes",
            "votes": 0,
            "hasVoted": false
          }
        },
        "changelog": {
          "startAt": 0,
          "maxResults": 0,
          "total": 0,
          "histories": [

          ]
        }
  };

/**
* Test specs below.
*/

describe("BoardDesign", function(){
    "use strict";

    var boardDesign,
        columnCategories;

    beforeAll(function(){
        boardDesign = new BoardDesign(columnsData);
        columnCategories =  boardDesign.getColumnCategories();
    });

    it("should have columns", function(){
        expect(boardDesign.getColumnNames()).toEqual(['Ready to Refine', 'Refine Backlog', 'Ready to Analyze', 'Analyze', 'Ready for Development', 'In Progress', 'Under Review', 'Ready for Test', 'Under Test', 'Ready to Accept', 'Accept', 'Ready for Releas']);
    });

    it("should return column name when status id is matching", function(){
        expect(boardDesign.getColumnMatchingStatus("10004")).toEqual("In Progress");
    });

    it("should return null when status id is not matching any column", function(){
        expect(boardDesign.getColumnMatchingStatus("100100")).toBe(null);
    });

    approveIt("should have appropriate column categories", function(approvals){
        approvals.verify(columnCategories);
    });
});

describe("Issue", function(){
    "use strict";

    describe("With history", function(){
        var issue;

        beforeAll(function(){
            issue = new Issue(apiIssueWithHistory, new BoardDesign(columnsData));
        });

        it("should have id", function(){
            expect(issue.id).toBe("10000");
        });

        it("should have title", function(){
            expect(issue.title).toBe("A task that needs to be done.");
        });

        it("should be created", function(){
            expect(issue.created).toBe("2015-09-01T14:42:01");
        });

        it("should have current status", function(){
            expect(issue.currentStatus).toEqual({id:"10009",name:"Accept"});
        });

        describe("History parser", function(){
            var columnHistory;

            beforeAll(function(){
               columnHistory = issue.columnHistory;
            });

            it("issue should always start in first column", function(){
                expect(columnHistory[0].columnName).toBe("Ready to Refine");
            });

            it("issue should have an enter time for a column", function(){
                expect(columnHistory[0].enterTime).toBe("2015-09-01T14:42:01");
            });

            it("issue should have an exit time for a column", function(){
                expect(columnHistory[0].exitTime).toBe("2015-09-01T14:42:23");
            });

            // This fails every test since the "now" date will change every time.
            /*approveIt("should have been moved", function(approvals){
                approvals.verify(columnHistory);
            });*/
        });

        describe("Cycle time calculations", function(){
            var columnsWithTimeSpent;

            beforeAll(function(){
                columnsWithTimeSpent = issue.columnsWithTimeSpent;
            });

            it("should calculate time spent in first column", function(){
                expect(columnsWithTimeSpent[0].timeSpent).toBe(1441114943000-1441114921000);
            });
        });
    });

    describe("Without history", function(){
        var issue,
            columnHistory;

        beforeAll(function(){
            issue = new Issue(apiIssueWithoutHistory, new BoardDesign(columnsData));
            columnHistory = issue.columnHistory;
        });

        it("should be in first column", function(){
            expect(columnHistory[0].columnName).toBe("Ready to Refine");
            expect(columnHistory.length).toBe(1);
        });
    });
});
