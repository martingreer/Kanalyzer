const columnsData = {
    "id": 12,
    "name": "Kanalyzes Delivery Board",
    "self": "https://dummy_domain.atlassian.net/rest/agile/1.0/board/12/configuration",
    "filter": {
        "id": "10603",
        "self": "https://dummy_domain.atlassian.net/rest/api/2/filter/10603"
    },
    "columnConfig": {
        "columns": [
            {
                "name": "Ready to Refine",
                "statuses": [
                    {
                        "id": "10000",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10000"
                    }
                ]
            },
            {
                "name": "Refine Backlog",
                "statuses": [
                    {
                        "id": "10010",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10213"
                    }
                ],
                "min": 2,
                "max": 2
            },
            {
                "name": "Ready to Analyze",
                "statuses": [
                    {
                        "id": "10012",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10204"
                    }
                ]
            },
            {
                "name": "Analyze",
                "statuses": [
                    {
                        "id": "10002",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10205"
                    }
                ]
            },
            {
                "name": "Ready for Development",
                "statuses": [
                    {
                        "id": "10003",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10212"
                    }
                ]
            },
            {
                "name": "In Progress",
                "statuses": [
                    {
                        "id": "3",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/3"
                    },
                    {
                        "id": "10004",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10203"
                    }
                ]
            },
            {
                "name": "Under Review",
                "statuses": [
                    {
                        "id": "10005",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10211"
                    }
                ]
            },
            {
                "name": "Ready for Test",
                "statuses": [
                    {
                        "id": "10006",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10206"
                    }
                ]
            },
            {
                "name": "Under Test",
                "statuses": [
                    {
                        "id": "10007",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10207"
                    }
                ]
            },
            {
                "name": "Ready to Accept",
                "statuses": [
                    {
                        "id": "10008",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10208"
                    }
                ]
            },
            {
                "name": "Accept",
                "statuses": [
                    {
                        "id": "10009",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10209"
                    }
                ]
            },
            {
                "name": "Ready for Release",
                "statuses": [
                    {
                        "id": "10001",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10001"
                    }
                ]
            }
        ],
        "constraintType": "issueCountExclSubs"
    },
    "ranking": {
        "rankCustomFieldId": 10200
    }
};

/**
 * Use this for all tests using the new KAN-XY issues that are stored in a local Jira server.
 */
const columnsDataLocalKANProject = {
    "id": 4,
    "name": "Kanalyzer Team Board",
    "self": "http://localhost:8080/rest/agile/1.0/board/4/configuration",
    "filter": {
        "id": "10000",
        "self": "http://localhost:8080/rest/api/2/filter/10000"
    },
    "columnConfig": {
        "columns": [
            {
                "name": "Ready to Analyze",
                "statuses": [
                    {
                        "id": "10004",
                        "self": "http://localhost:8080/rest/api/2/status/10004"
                    }
                ]
            },
            {
                "name": "Analyzing",
                "statuses": [
                    {
                        "id": "10012",
                        "self": "http://localhost:8080/rest/api/2/status/10012"
                    }
                ],
                "max": 3
            },
            {
                "name": "Ready for Development",
                "statuses": [
                    {
                        "id": "10006",
                        "self": "http://localhost:8080/rest/api/2/status/10006"
                    }
                ]
            },
            {
                "name": "In Progress",
                "statuses": [
                    {
                        "id": "3",
                        "self": "http://localhost:8080/rest/api/2/status/3"
                    }
                ],
                "max": 4
            },
            {
                "name": "Ready for Test",
                "statuses": [
                    {
                        "id": "10007",
                        "self": "http://localhost:8080/rest/api/2/status/10007"
                    }
                ]
            },
            {
                "name": "Testing",
                "statuses": [
                    {
                        "id": "10008",
                        "self": "http://localhost:8080/rest/api/2/status/10008"
                    }
                ],
                "max": 4
            },
            {
                "name": "Done",
                "statuses": [
                    {
                        "id": "10001",
                        "self": "http://localhost:8080/rest/api/2/status/10001"
                    }
                ]
            }
        ],
        "constraintType": "issueCount"
    },
    "ranking": {
        "rankCustomFieldId": 10000
    }
};

const columnsDataOldApi = {
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
            "name": "Ready for Release",
            "statusIds": [
                "10001"
            ],
            "statisticsFieldValue": 6.0
        }
    ]
};

var coachAppColumnsData = {
    "id": 9,
    "name": "CoachApp Board",
    "type": "scrum",
    "self": "https://dummy_domain.atlassian.net/rest/agile/1.0/board/9/configuration",
    "filter": {
        "id": "10501",
        "self": "https://dummy_domain.atlassian.net/rest/api/2/filter/10501"
    },
    "columnConfig": {
        "columns": [
            {
                "name": "To Do",
                "statuses": [
                    {
                        "id": "10000",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10000"
                    }
                ]
            },
            {
                "name": "In Progress",
                "statuses": [
                    {
                        "id": "3",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/3"
                    }
                ]
            },
            {
                "name": "Done",
                "statuses": [
                    {
                        "id": "10001",
                        "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10001"
                    }
                ]
            }
        ],
        "constraintType": "none"
    },
    "estimation": {
        "type": "field",
        "field": {
            "fieldId": "timeoriginalestimate",
            "displayName": "Original Estimate"
        }
    },
    "ranking": {
        "rankCustomFieldId": 10200
    }
};


const coachAppColumnsDataOldApi = {
    "rapidViewId": 9,
    "columns": [
        {
            "id": 35,
            "name": "To Do",
            "statusIds": [
                "10000"
            ]
        },
        {
            "id": 36,
            "name": "In Progress",
            "statusIds": [
                "3"
            ]
        },
        {
            "id": 39,
            "name": "Done",
            "statusIds": [
                "10001"
            ]
        }
    ]
};

const apiIssueWithHistoryAndNotDone = {
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
        "fixVersions": [],
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
        "labels": [],
        "customfield_10016": null,
        "customfield_10017": null,
        "customfield_10018": null,
        "customfield_10019": null,
        "timeestimate": null,
        "aggregatetimeoriginalestimate": null,
        "versions": [],
        "issuelinks": [],
        "assignee": {
            "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
            "name": "martin.w.ausername",
            "key": "martin.w.ausername",
            "emailAddress": "dummy@dummy.com",
            "avatarUrls": {
                "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
            },
            "displayName": "Dummy Name",
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
        "components": [],
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
            "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
            "name": "martin.w.ausername",
            "key": "martin.w.ausername",
            "emailAddress": "dummy@dummy.com",
            "avatarUrls": {
                "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
            },
            "displayName": "Dummy Name",
            "active": true,
            "timeZone": "Europe/Berlin"
        },
        "subtasks": [],
        "reporter": {
            "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
            "name": "martin.w.ausername",
            "key": "martin.w.ausername",
            "emailAddress": "dummy@dummy.com",
            "avatarUrls": {
                "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
            },
            "displayName": "Dummy Name",
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
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
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
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
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
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
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
                        "to": "martin.w.ausername",
                        "toString": "Dummy Name"
                    }
                ]
            },
            {
                "id": "10019",
                "author": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
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
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
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
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
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

const apiIssueWithoutHistory =
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
            "fixVersions": [],
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
            "labels": [],
            "customfield_10016": null,
            "customfield_10017": null,
            "customfield_10018": null,
            "customfield_10019": null,
            "timeestimate": null,
            "aggregatetimeoriginalestimate": null,
            "versions": [],
            "issuelinks": [],
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
            "components": [],
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
                "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                "name": "martin.w.ausername",
                "key": "martin.w.ausername",
                "emailAddress": "dummy@dummy.com",
                "avatarUrls": {
                    "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                    "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                    "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                    "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                },
                "displayName": "Dummy Name",
                "active": true,
                "timeZone": "Europe/Berlin"
            },
            "subtasks": [],
            "reporter": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                "name": "martin.w.ausername",
                "key": "martin.w.ausername",
                "emailAddress": "dummy@dummy.com",
                "avatarUrls": {
                    "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                    "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                    "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                    "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                },
                "displayName": "Dummy Name",
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
            "histories": []
        }
    };

const apiIssueIsDone =
    {
        "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
        "id": "10006",
        "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/10006",
        "key": "KTD-7",
        "fields": {
            "issuetype": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/issuetype/10001",
                "id": "10001",
                "description": "The sub-task of the issue",
                "iconUrl": "https://kanalyzer.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10501&avatarType=issuetype",
                "name": "Sub-task",
                "subtask": true,
                "avatarId": 10501
            },
            "parent": {
                "id": "10109",
                "key": "KTD-19",
                "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/10109",
                "fields": {
                    "summary": "As a user, I want to download data from my JIRA project to the app",
                    "status": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/status/10001",
                        "description": "",
                        "iconUrl": "https://kanalyzer.atlassian.net/images/icons/statuses/closed.png",
                        "name": "Done",
                        "id": "10001",
                        "statusCategory": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/statuscategory/3",
                            "id": 3,
                            "key": "done",
                            "colorName": "green",
                            "name": "Done"
                        }
                    },
                    "priority": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/priority/3",
                        "iconUrl": "https://kanalyzer.atlassian.net/images/icons/priorities/medium.svg",
                        "name": "Medium",
                        "id": "3"
                    },
                    "issuetype": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/issuetype/10003",
                        "id": "10003",
                        "description": "Created by JIRA Agile - do not edit or delete. Issue type for a user story.",
                        "iconUrl": "https://kanalyzer.atlassian.net/images/icons/issuetypes/story.png",
                        "name": "Story",
                        "subtask": false
                    }
                }
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
            "fixVersions": [],
            "aggregatetimespent": null,
            "resolution": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/resolution/10000",
                "id": "10000",
                "description": "Work has been completed on this issue.",
                "name": "Done"
            },
            "resolutiondate": "2015-09-15T11:02:23.000+0200",
            "workratio": -1,
            "lastViewed": "2015-09-30T13:28:49.873+0200",
            "watches": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/KTD-7/watchers",
                "watchCount": 1,
                "isWatching": true
            },
            "created": "2015-09-02T11:11:30.000+0200",
            "customfield_10020": null,
            "customfield_10021": null,
            "customfield_10022": null,
            "priority": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/priority/3",
                "iconUrl": "https://kanalyzer.atlassian.net/images/icons/priorities/medium.svg",
                "name": "Medium",
                "id": "3"
            },
            "customfield_10023": "Not started",
            "customfield_10024": null,
            "labels": [],
            "customfield_10016": null,
            "customfield_10017": null,
            "customfield_10018": null,
            "customfield_10019": null,
            "timeestimate": null,
            "aggregatetimeoriginalestimate": null,
            "versions": [],
            "issuelinks": [],
            "assignee": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                "name": "martin.w.ausername",
                "key": "martin.w.ausername",
                "emailAddress": "dummy@dummy.com",
                "avatarUrls": {
                    "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                    "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                    "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                    "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                },
                "displayName": "Dummy Name",
                "active": true,
                "timeZone": "Europe/Berlin"
            },
            "updated": "2015-09-15T11:02:23.000+0200",
            "status": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/status/10001",
                "description": "",
                "iconUrl": "https://kanalyzer.atlassian.net/images/icons/statuses/closed.png",
                "name": "Done",
                "id": "10001",
                "statusCategory": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/statuscategory/3",
                    "id": 3,
                    "key": "done",
                    "colorName": "green",
                    "name": "Done"
                }
            },
            "components": [],
            "timeoriginalestimate": null,
            "description": null,
            "customfield_10012": "0|i0004f:",
            "customfield_10013": null,
            "customfield_10014": null,
            "customfield_10015": null,
            "customfield_10007": null,
            "customfield_10009": null,
            "aggregatetimeestimate": null,
            "summary": "Download data to app via API",
            "creator": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                "name": "martin.w.ausername",
                "key": "martin.w.ausername",
                "emailAddress": "dummy@dummy.com",
                "avatarUrls": {
                    "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                    "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                    "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                    "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                },
                "displayName": "Dummy Name",
                "active": true,
                "timeZone": "Europe/Berlin"
            },
            "subtasks": [],
            "reporter": {
                "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                "name": "martin.w.ausername",
                "key": "martin.w.ausername",
                "emailAddress": "dummy@dummy.com",
                "avatarUrls": {
                    "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                    "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                    "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                    "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                },
                "displayName": "Dummy Name",
                "active": true,
                "timeZone": "Europe/Berlin"
            },
            "customfield_10000": null,
            "aggregateprogress": {
                "progress": 0,
                "total": 0
            },
            "customfield_10001": "10000_*:*_1_*:*_364349_*|*_10010_*:*_1_*:*_1057415515_*|*_10012_*:*_1_*:*_64843615_*|*_10001_*:*_1_*:*_0_*|*_10004_*:*_1_*:*_29386",
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
                "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/KTD-7/votes",
                "votes": 0,
                "hasVoted": false
            }
        },
        "changelog": {
            "startAt": 0,
            "maxResults": 8,
            "total": 8,
            "histories": [
                {
                    "id": "10011",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                        "name": "martin.w.ausername",
                        "key": "martin.w.ausername",
                        "emailAddress": "dummy@dummy.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Dummy Name",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-02T11:12:10.736+0200",
                    "items": [
                        {
                            "field": "assignee",
                            "fieldtype": "jira",
                            "from": null,
                            "fromString": null,
                            "to": "martin.w.ausername",
                            "toString": "Dummy Name"
                        }
                    ]
                },
                {
                    "id": "10017",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                        "name": "martin.w.ausername",
                        "key": "martin.w.ausername",
                        "emailAddress": "dummy@dummy.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Dummy Name",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-02T11:17:34.765+0200",
                    "items": [
                        {
                            "field": "status",
                            "fieldtype": "jira",
                            "from": "10000",
                            "fromString": "To Do",
                            "to": "10010",
                            "toString": "Refine Backlog"
                        }
                    ]
                },
                {
                    "id": "10116",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                        "name": "martin.w.ausername",
                        "key": "martin.w.ausername",
                        "emailAddress": "dummy@dummy.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Dummy Name",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-10T10:13:15.061+0200",
                    "items": [
                        {
                            "field": "summary",
                            "fieldtype": "jira",
                            "from": null,
                            "fromString": "Use JIRA-data in CFD",
                            "to": null,
                            "toString": "Download data to app via API"
                        }
                    ]
                },
                {
                    "id": "10139",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                        "name": "martin.w.ausername",
                        "key": "martin.w.ausername",
                        "emailAddress": "dummy@dummy.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Dummy Name",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-11T14:13:13.731+0200",
                    "items": [
                        {
                            "field": "Parent Issue",
                            "fieldtype": "custom",
                            "from": "KTD-4",
                            "fromString": "KTD-4",
                            "to": "KTD-19",
                            "toString": "KTD-19"
                        }
                    ]
                },
                {
                    "id": "10144",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                        "name": "martin.w.ausername",
                        "key": "martin.w.ausername",
                        "emailAddress": "dummy@dummy.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Dummy Name",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-11T14:17:23.136+0200",
                    "items": [
                        {
                            "field": "Rank",
                            "fieldtype": "custom",
                            "from": "",
                            "fromString": "",
                            "to": "",
                            "toString": "Ranked lower"
                        }
                    ]
                },
                {
                    "id": "10204",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                        "name": "martin.w.ausername",
                        "key": "martin.w.ausername",
                        "emailAddress": "dummy@dummy.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Dummy Name",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-14T17:01:10.280+0200",
                    "items": [
                        {
                            "field": "status",
                            "fieldtype": "jira",
                            "from": "10010",
                            "fromString": "Refine Backlog",
                            "to": "10012",
                            "toString": "Ready to Analyze"
                        }
                    ]
                },
                {
                    "id": "10213",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                        "name": "martin.w.ausername",
                        "key": "martin.w.ausername",
                        "emailAddress": "dummy@dummy.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Dummy Name",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-15T11:01:53.895+0200",
                    "items": [
                        {
                            "field": "status",
                            "fieldtype": "jira",
                            "from": "10012",
                            "fromString": "Ready to Analyze",
                            "to": "10004",
                            "toString": "Develop"
                        }
                    ]
                },
                {
                    "id": "10214",
                    "author": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                        "name": "martin.w.ausername",
                        "key": "martin.w.ausername",
                        "emailAddress": "dummy@dummy.com",
                        "avatarUrls": {
                            "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                            "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                            "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                            "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                        },
                        "displayName": "Dummy Name",
                        "active": true,
                        "timeZone": "Europe/Berlin"
                    },
                    "created": "2015-09-15T11:02:23.281+0200",
                    "items": [
                        {
                            "field": "resolution",
                            "fieldtype": "jira",
                            "from": null,
                            "fromString": null,
                            "to": "10000",
                            "toString": "Done"
                        },
                        {
                            "field": "status",
                            "fieldtype": "jira",
                            "from": "10004",
                            "fromString": "Develop",
                            "to": "10001",
                            "toString": "Done"
                        }
                    ]
                }
            ]
        }
    };

const apiTwoIssues = {
    "expand": "schema,names",
    "startAt": 0,
    "maxResults": 1000,
    "total": 2,
    "issues": [
        {
            "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
            "id": "10409",
            "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/10409",
            "key": "KTD-43",
            "fields": {
                "issuetype": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/issuetype/10001",
                    "id": "10001",
                    "description": "The sub-task of the issue",
                    "iconUrl": "https://kanalyzer.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10501&avatarType=issuetype",
                    "name": "Sub-task",
                    "subtask": true,
                    "avatarId": 10501
                },
                "parent": {
                    "id": "10402",
                    "key": "KTD-36",
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/10402",
                    "fields": {
                        "summary": "Calculate Process Efficiency and display it on webapp",
                        "status": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/status/10004",
                            "description": "This status is managed internally by JIRA Agile",
                            "iconUrl": "https://kanalyzer.atlassian.net/",
                            "name": "Develop",
                            "id": "10004",
                            "statusCategory": {
                                "self": "https://kanalyzer.atlassian.net/rest/api/2/statuscategory/4",
                                "id": 4,
                                "key": "indeterminate",
                                "colorName": "yellow",
                                "name": "In Progress"
                            }
                        },
                        "priority": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/priority/3",
                            "iconUrl": "https://kanalyzer.atlassian.net/images/icons/priorities/medium.svg",
                            "name": "Medium",
                            "id": "3"
                        },
                        "issuetype": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/issuetype/10003",
                            "id": "10003",
                            "description": "Created by JIRA Agile - do not edit or delete. Issue type for a user story.",
                            "iconUrl": "https://kanalyzer.atlassian.net/images/icons/issuetypes/story.png",
                            "name": "Story",
                            "subtask": false
                        }
                    }
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
                "fixVersions": [],
                "aggregatetimespent": null,
                "resolution": null,
                "resolutiondate": null,
                "workratio": -1,
                "lastViewed": "2015-10-06T10:26:09.854+0200",
                "watches": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/KTD-43/watchers",
                    "watchCount": 1,
                    "isWatching": true
                },
                "created": "2015-10-06T10:25:55.000+0200",
                "customfield_10020": null,
                "customfield_10021": null,
                "customfield_10022": null,
                "priority": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/priority/3",
                    "iconUrl": "https://kanalyzer.atlassian.net/images/icons/priorities/medium.svg",
                    "name": "Medium",
                    "id": "3"
                },
                "customfield_10023": "Not started",
                "customfield_10024": null,
                "labels": [],
                "customfield_10016": null,
                "customfield_10017": null,
                "customfield_10018": null,
                "customfield_10019": null,
                "timeestimate": null,
                "aggregatetimeoriginalestimate": null,
                "versions": [],
                "issuelinks": [],
                "assignee": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "updated": "2015-10-06T10:26:09.000+0200",
                "status": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/status/10004",
                    "description": "This status is managed internally by JIRA Agile",
                    "iconUrl": "https://kanalyzer.atlassian.net/",
                    "name": "Develop",
                    "id": "10004",
                    "statusCategory": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/statuscategory/4",
                        "id": 4,
                        "key": "indeterminate",
                        "colorName": "yellow",
                        "name": "In Progress"
                    }
                },
                "components": [],
                "timeoriginalestimate": null,
                "description": null,
                "customfield_10012": "0|i0009b:",
                "customfield_10013": null,
                "customfield_10014": null,
                "customfield_10015": null,
                "customfield_10007": null,
                "customfield_10009": null,
                "aggregatetimeestimate": null,
                "summary": "Calculate Cycle Time for many issues and display them in a table",
                "creator": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "subtasks": [],
                "reporter": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
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
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/KTD-43/votes",
                    "votes": 0,
                    "hasVoted": false
                }
            },
            "changelog": {
                "startAt": 0,
                "maxResults": 2,
                "total": 2,
                "histories": [
                    {
                        "id": "10430",
                        "author": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                            "name": "martin.w.ausername",
                            "key": "martin.w.ausername",
                            "emailAddress": "dummy@dummy.com",
                            "avatarUrls": {
                                "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                                "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                                "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                                "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                            },
                            "displayName": "Dummy Name",
                            "active": true,
                            "timeZone": "Europe/Berlin"
                        },
                        "created": "2015-10-06T10:26:03.814+0200",
                        "items": [
                            {
                                "field": "assignee",
                                "fieldtype": "jira",
                                "from": null,
                                "fromString": null,
                                "to": "martin.w.ausername",
                                "toString": "Dummy Name"
                            }
                        ]
                    },
                    {
                        "id": "10431",
                        "author": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                            "name": "martin.w.ausername",
                            "key": "martin.w.ausername",
                            "emailAddress": "dummy@dummy.com",
                            "avatarUrls": {
                                "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                                "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                                "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                                "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                            },
                            "displayName": "Dummy Name",
                            "active": true,
                            "timeZone": "Europe/Berlin"
                        },
                        "created": "2015-10-06T10:26:09.877+0200",
                        "items": [
                            {
                                "field": "status",
                                "fieldtype": "jira",
                                "from": "10000",
                                "fromString": "To Do",
                                "to": "10004",
                                "toString": "Develop"
                            }
                        ]
                    }
                ]
            }
        },
        {
            "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
            "id": "10408",
            "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/10408",
            "key": "KTD-42",
            "fields": {
                "issuetype": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/issuetype/10001",
                    "id": "10001",
                    "description": "The sub-task of the issue",
                    "iconUrl": "https://kanalyzer.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10501&avatarType=issuetype",
                    "name": "Sub-task",
                    "subtask": true,
                    "avatarId": 10501
                },
                "parent": {
                    "id": "10402",
                    "key": "KTD-36",
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/10402",
                    "fields": {
                        "summary": "Calculate Process Efficiency and display it on webapp",
                        "status": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/status/10004",
                            "description": "This status is managed internally by JIRA Agile",
                            "iconUrl": "https://kanalyzer.atlassian.net/",
                            "name": "Develop",
                            "id": "10004",
                            "statusCategory": {
                                "self": "https://kanalyzer.atlassian.net/rest/api/2/statuscategory/4",
                                "id": 4,
                                "key": "indeterminate",
                                "colorName": "yellow",
                                "name": "In Progress"
                            }
                        },
                        "priority": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/priority/3",
                            "iconUrl": "https://kanalyzer.atlassian.net/images/icons/priorities/medium.svg",
                            "name": "Medium",
                            "id": "3"
                        },
                        "issuetype": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/issuetype/10003",
                            "id": "10003",
                            "description": "Created by JIRA Agile - do not edit or delete. Issue type for a user story.",
                            "iconUrl": "https://kanalyzer.atlassian.net/images/icons/issuetypes/story.png",
                            "name": "Story",
                            "subtask": false
                        }
                    }
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
                "fixVersions": [],
                "aggregatetimespent": null,
                "resolution": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/resolution/10000",
                    "id": "10000",
                    "description": "Work has been completed on this issue.",
                    "name": "Done"
                },
                "resolutiondate": "2015-10-02T16:22:55.000+0200",
                "workratio": -1,
                "lastViewed": "2015-10-02T16:22:55.683+0200",
                "watches": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/KTD-42/watchers",
                    "watchCount": 1,
                    "isWatching": true
                },
                "created": "2015-10-01T15:20:38.000+0200",
                "customfield_10020": null,
                "customfield_10021": null,
                "customfield_10022": null,
                "priority": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/priority/3",
                    "iconUrl": "https://kanalyzer.atlassian.net/images/icons/priorities/medium.svg",
                    "name": "Medium",
                    "id": "3"
                },
                "customfield_10023": "Not started",
                "customfield_10024": null,
                "labels": [],
                "customfield_10016": null,
                "customfield_10017": null,
                "customfield_10018": null,
                "customfield_10019": null,
                "timeestimate": null,
                "aggregatetimeoriginalestimate": null,
                "versions": [],
                "issuelinks": [],
                "assignee": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "updated": "2015-10-02T16:22:55.000+0200",
                "status": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/status/10001",
                    "description": "",
                    "iconUrl": "https://kanalyzer.atlassian.net/images/icons/statuses/closed.png",
                    "name": "Done",
                    "id": "10001",
                    "statusCategory": {
                        "self": "https://kanalyzer.atlassian.net/rest/api/2/statuscategory/3",
                        "id": 3,
                        "key": "done",
                        "colorName": "green",
                        "name": "Done"
                    }
                },
                "components": [],
                "timeoriginalestimate": null,
                "description": null,
                "customfield_10012": "0|i00093:",
                "customfield_10013": null,
                "customfield_10014": null,
                "customfield_10015": null,
                "customfield_10007": null,
                "customfield_10009": null,
                "aggregatetimeestimate": null,
                "summary": "Display Cycle Time result in PE tab",
                "creator": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "subtasks": [],
                "reporter": {
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                    "name": "martin.w.ausername",
                    "key": "martin.w.ausername",
                    "emailAddress": "dummy@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                        "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                        "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                        "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "customfield_10000": null,
                "aggregateprogress": {
                    "progress": 0,
                    "total": 0
                },
                "customfield_10001": "10000_*:*_1_*:*_4621_*|*_10001_*:*_1_*:*_0_*|*_10004_*:*_1_*:*_90132361",
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
                    "self": "https://kanalyzer.atlassian.net/rest/api/2/issue/KTD-42/votes",
                    "votes": 0,
                    "hasVoted": false
                }
            },
            "changelog": {
                "startAt": 0,
                "maxResults": 3,
                "total": 3,
                "histories": [
                    {
                        "id": "10423",
                        "author": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                            "name": "martin.w.ausername",
                            "key": "martin.w.ausername",
                            "emailAddress": "dummy@dummy.com",
                            "avatarUrls": {
                                "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                                "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                                "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                                "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                            },
                            "displayName": "Dummy Name",
                            "active": true,
                            "timeZone": "Europe/Berlin"
                        },
                        "created": "2015-10-01T15:20:43.344+0200",
                        "items": [
                            {
                                "field": "status",
                                "fieldtype": "jira",
                                "from": "10000",
                                "fromString": "To Do",
                                "to": "10004",
                                "toString": "Develop"
                            }
                        ]
                    },
                    {
                        "id": "10424",
                        "author": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                            "name": "martin.w.ausername",
                            "key": "martin.w.ausername",
                            "emailAddress": "dummy@dummy.com",
                            "avatarUrls": {
                                "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                                "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                                "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                                "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                            },
                            "displayName": "Dummy Name",
                            "active": true,
                            "timeZone": "Europe/Berlin"
                        },
                        "created": "2015-10-01T15:21:02.798+0200",
                        "items": [
                            {
                                "field": "assignee",
                                "fieldtype": "jira",
                                "from": null,
                                "fromString": null,
                                "to": "martin.w.ausername",
                                "toString": "Dummy Name"
                            }
                        ]
                    },
                    {
                        "id": "10429",
                        "author": {
                            "self": "https://kanalyzer.atlassian.net/rest/api/2/user?username=martin.w.ausername",
                            "name": "martin.w.ausername",
                            "key": "martin.w.ausername",
                            "emailAddress": "dummy@dummy.com",
                            "avatarUrls": {
                                "48x48": "https://kanalyzer.atlassian.net/secure/useravatar?avatarId=10346",
                                "24x24": "https://kanalyzer.atlassian.net/secure/useravatar?size=small&avatarId=10346",
                                "16x16": "https://kanalyzer.atlassian.net/secure/useravatar?size=xsmall&avatarId=10346",
                                "32x32": "https://kanalyzer.atlassian.net/secure/useravatar?size=medium&avatarId=10346"
                            },
                            "displayName": "Dummy Name",
                            "active": true,
                            "timeZone": "Europe/Berlin"
                        },
                        "created": "2015-10-02T16:22:55.705+0200",
                        "items": [
                            {
                                "field": "resolution",
                                "fieldtype": "jira",
                                "from": null,
                                "fromString": null,
                                "to": "10000",
                                "toString": "Done"
                            },
                            {
                                "field": "status",
                                "fieldtype": "jira",
                                "from": "10004",
                                "fromString": "Develop",
                                "to": "10001",
                                "toString": "Done"
                            }
                        ]
                    }
                ]
            }
        }
    ]
};

const apiIssueWithHistoryButNoStatusChange = {
    "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
    "id": "12008",
    "self": "https://dummy_domain.atlassian.net/rest/api/2/issue/12008",
    "key": "COAC-71",
    "fields": {
        "issuetype": {
            "self": "https://dummy_domain.atlassian.net/rest/api/2/issuetype/7",
            "id": "7",
            "description": "Created by JIRA Agile - do not edit or delete. Issue type for a user story.",
            "iconUrl": "https://dummy_domain.atlassian.net/secure/viewavatar?size=xsmall&avatarId=10615&avatarType=issuetype",
            "name": "Story",
            "subtask": false,
            "avatarId": 10615
        },
        "timespent": null,
        "project": {
            "self": "https://dummy_domain.atlassian.net/rest/api/2/project/10500",
            "id": "10500",
            "key": "COAC",
            "name": "CoachApp",
            "avatarUrls": {
                "48x48": "https://dummy_domain.atlassian.net/secure/projectavatar?avatarId=10703",
                "24x24": "https://dummy_domain.atlassian.net/secure/projectavatar?size=small&avatarId=10703",
                "16x16": "https://dummy_domain.atlassian.net/secure/projectavatar?size=xsmall&avatarId=10703",
                "32x32": "https://dummy_domain.atlassian.net/secure/projectavatar?size=medium&avatarId=10703"
            }
        },
        "fixVersions": [],
        "aggregatetimespent": null,
        "resolution": null,
        "resolutiondate": null,
        "workratio": 0,
        "lastViewed": null,
        "watches": {
            "self": "https://dummy_domain.atlassian.net/rest/api/2/issue/COAC-71/watchers",
            "watchCount": 1,
            "isWatching": false
        },
        "created": "2015-10-26T13:47:12.000+0100",
        "customfield_10020": null,
        "customfield_10021": "Not started",
        "priority": {
            "self": "https://dummy_domain.atlassian.net/rest/api/2/priority/3",
            "iconUrl": "https://dummy_domain.atlassian.net/images/icons/priorities/major.svg",
            "name": "Major",
            "id": "3"
        },
        "customfield_10100": null,
        "customfield_10300": null,
        "labels": [],
        "customfield_10016": null,
        "customfield_10017": null,
        "customfield_10018": null,
        "customfield_10019": null,
        "timeestimate": 10800,
        "aggregatetimeoriginalestimate": 10800,
        "versions": [],
        "issuelinks": [],
        "assignee": null,
        "updated": "2015-10-26T13:47:39.000+0100",
        "status": {
            "self": "https://dummy_domain.atlassian.net/rest/api/2/status/10000",
            "description": "",
            "iconUrl": "https://dummy_domain.atlassian.net/images/icons/subtask.gif",
            "name": "To Do",
            "id": "10000",
            "statusCategory": {
                "self": "https://dummy_domain.atlassian.net/rest/api/2/statuscategory/2",
                "id": 2,
                "key": "new",
                "colorName": "blue-gray",
                "name": "To Do"
            }
        },
        "components": [],
        "timeoriginalestimate": 10800,
        "description": null,
        "customfield_10012": null,
        "customfield_10013": null,
        "customfield_10014": null,
        "customfield_10015": null,
        "customfield_10005": null,
        "customfield_10401": null,
        "customfield_10006": "9223372036854775807",
        "customfield_10007": null,
        "customfield_10008": null,
        "aggregatetimeestimate": 10800,
        "summary": "Retro",
        "creator": {
            "self": "https://dummy_domain.atlassian.net/rest/api/2/user?username=Jonas+Jaconelli",
            "name": "Some Person",
            "key": "some person",
            "emailAddress": "dummy2@dummy.com",
            "avatarUrls": {
                "48x48": "https://dummy_domain.atlassian.net/secure/useravatar?ownerId=some+person&avatarId=10800",
                "24x24": "https://dummy_domain.atlassian.net/secure/useravatar?size=small&ownerId=some+person&avatarId=10800",
                "16x16": "https://dummy_domain.atlassian.net/secure/useravatar?size=xsmall&ownerId=some+person&avatarId=10800",
                "32x32": "https://dummy_domain.atlassian.net/secure/useravatar?size=medium&ownerId=some+person&avatarId=10800"
            },
            "displayName": "Some Person",
            "active": true,
            "timeZone": "Europe/Stockholm"
        },
        "subtasks": [],
        "reporter": {
            "self": "https://dummy_domain.atlassian.net/rest/api/2/user?username=Jonas+Jaconelli",
            "name": "Some Person",
            "key": "some person",
            "emailAddress": "dummy2@dummy.com",
            "avatarUrls": {
                "48x48": "https://dummy_domain.atlassian.net/secure/useravatar?ownerId=some+person&avatarId=10800",
                "24x24": "https://dummy_domain.atlassian.net/secure/useravatar?size=small&ownerId=some+person&avatarId=10800",
                "16x16": "https://dummy_domain.atlassian.net/secure/useravatar?size=xsmall&ownerId=some+person&avatarId=10800",
                "32x32": "https://dummy_domain.atlassian.net/secure/useravatar?size=medium&ownerId=some+person&avatarId=10800"
            },
            "displayName": "Some Person",
            "active": true,
            "timeZone": "Europe/Stockholm"
        },
        "customfield_10000": null,
        "aggregateprogress": {
            "progress": 0,
            "total": 10800,
            "percent": 0
        },
        "customfield_10001": null,
        "customfield_10200": "0|zzzb4m:3zzqlmy",
        "customfield_10002": null,
        "customfield_10003": null,
        "customfield_10004": null,
        "customfield_10400": null,
        "environment": null,
        "duedate": null,
        "progress": {
            "progress": 0,
            "total": 10800,
            "percent": 0
        },
        "votes": {
            "self": "https://dummy_domain.atlassian.net/rest/api/2/issue/COAC-71/votes",
            "votes": 0,
            "hasVoted": false
        }
    },
    "changelog": {
        "startAt": 0,
        "maxResults": 3,
        "total": 3,
        "histories": [
            {
                "id": "13752",
                "author": {
                    "self": "https://dummy_domain.atlassian.net/rest/api/2/user?username=Jonas+Jaconelli",
                    "name": "Some Person",
                    "key": "some person",
                    "emailAddress": "dummy2@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://dummy_domain.atlassian.net/secure/useravatar?ownerId=some+person&avatarId=10800",
                        "24x24": "https://dummy_domain.atlassian.net/secure/useravatar?size=small&ownerId=some+person&avatarId=10800",
                        "16x16": "https://dummy_domain.atlassian.net/secure/useravatar?size=xsmall&ownerId=some+person&avatarId=10800",
                        "32x32": "https://dummy_domain.atlassian.net/secure/useravatar?size=medium&ownerId=some+person&avatarId=10800"
                    },
                    "displayName": "Some Person",
                    "active": true,
                    "timeZone": "Europe/Stockholm"
                },
                "created": "2015-10-26T13:47:21.418+0100",
                "items": [
                    {
                        "field": "Rank",
                        "fieldtype": "custom",
                        "from": "",
                        "fromString": "",
                        "to": "",
                        "toString": "Ranked higher"
                    }
                ]
            },
            {
                "id": "13755",
                "author": {
                    "self": "https://dummy_domain.atlassian.net/rest/api/2/user?username=Jonas+Jaconelli",
                    "name": "Some Person",
                    "key": "some person",
                    "emailAddress": "dummy2@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://dummy_domain.atlassian.net/secure/useravatar?ownerId=some+person&avatarId=10800",
                        "24x24": "https://dummy_domain.atlassian.net/secure/useravatar?size=small&ownerId=some+person&avatarId=10800",
                        "16x16": "https://dummy_domain.atlassian.net/secure/useravatar?size=xsmall&ownerId=some+person&avatarId=10800",
                        "32x32": "https://dummy_domain.atlassian.net/secure/useravatar?size=medium&ownerId=some+person&avatarId=10800"
                    },
                    "displayName": "Some Person",
                    "active": true,
                    "timeZone": "Europe/Stockholm"
                },
                "created": "2015-10-26T13:47:39.501+0100",
                "items": [
                    {
                        "field": "timeoriginalestimate",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "10800",
                        "toString": "10800"
                    }
                ]
            },
            {
                "id": "13756",
                "author": {
                    "self": "https://dummy_domain.atlassian.net/rest/api/2/user?username=Jonas+Jaconelli",
                    "name": "Some Person",
                    "key": "some person",
                    "emailAddress": "dummy2@dummy.com",
                    "avatarUrls": {
                        "48x48": "https://dummy_domain.atlassian.net/secure/useravatar?ownerId=some+person&avatarId=10800",
                        "24x24": "https://dummy_domain.atlassian.net/secure/useravatar?size=small&ownerId=some+person&avatarId=10800",
                        "16x16": "https://dummy_domain.atlassian.net/secure/useravatar?size=xsmall&ownerId=some+person&avatarId=10800",
                        "32x32": "https://dummy_domain.atlassian.net/secure/useravatar?size=medium&ownerId=some+person&avatarId=10800"
                    },
                    "displayName": "Some Person",
                    "active": true,
                    "timeZone": "Europe/Stockholm"
                },
                "created": "2015-10-26T13:47:39.593+0100",
                "items": [
                    {
                        "field": "timeestimate",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "10800",
                        "toString": "10800"
                    }
                ]
            }
        ]
    }
};

const jiraIssueThatWasReopenedThenDoneAgain = {
    "expand": "operations,versionedRepresentations,editmeta,changelog,transitions,renderedFields",
    "id": "10004",
    "self": "http://localhost:8080/rest/api/2/issue/10004",
    "key": "KAN-5",
    "fields": {
        "issuetype": {
            "self": "http://localhost:8080/rest/api/2/issuetype/10003",
            "id": "10003",
            "description": "The sub-task of the issue",
            "iconUrl": "http://localhost:8080/secure/viewavatar?size=xsmall&avatarId=10316&avatarType=issuetype",
            "name": "Sub-task",
            "subtask": true,
            "avatarId": 10316
        },
        "parent": {
            "id": "10002",
            "key": "KAN-3",
            "self": "http://localhost:8080/rest/api/2/issue/10002",
            "fields": {
                "summary": "As a user I want a graph that shows how long each issue has been in each column, in percent.",
                "status": {
                    "self": "http://localhost:8080/rest/api/2/status/10001",
                    "description": "",
                    "iconUrl": "http://localhost:8080/",
                    "name": "Done",
                    "id": "10001",
                    "statusCategory": {
                        "self": "http://localhost:8080/rest/api/2/statuscategory/3",
                        "id": 3,
                        "key": "done",
                        "colorName": "green",
                        "name": "Done"
                    }
                },
                "priority": {
                    "self": "http://localhost:8080/rest/api/2/priority/3",
                    "iconUrl": "http://localhost:8080/images/icons/priorities/medium.svg",
                    "name": "Medium",
                    "id": "3"
                },
                "issuetype": {
                    "self": "http://localhost:8080/rest/api/2/issuetype/10001",
                    "id": "10001",
                    "description": "gh.issue.story.desc",
                    "iconUrl": "http://localhost:8080/images/icons/issuetypes/story.svg",
                    "name": "Story",
                    "subtask": false
                }
            }
        },
        "components": [],
        "timespent": null,
        "timeoriginalestimate": null,
        "description": null,
        "project": {
            "self": "http://localhost:8080/rest/api/2/project/10000",
            "id": "10000",
            "key": "KAN",
            "name": "Kanalyzer",
            "avatarUrls": {
                "48x48": "http://localhost:8080/secure/projectavatar?avatarId=10324",
                "24x24": "http://localhost:8080/secure/projectavatar?size=small&avatarId=10324",
                "16x16": "http://localhost:8080/secure/projectavatar?size=xsmall&avatarId=10324",
                "32x32": "http://localhost:8080/secure/projectavatar?size=medium&avatarId=10324"
            }
        },
        "fixVersions": [],
        "aggregatetimespent": null,
        "resolution": {
            "self": "http://localhost:8080/rest/api/2/resolution/10000",
            "id": "10000",
            "description": "Work has been completed on this issue.",
            "name": "Done"
        },
        "aggregatetimeestimate": null,
        "resolutiondate": "2017-03-11T01:19:44.000+0100",
        "workratio": -1,
        "summary": "Setup MultiBar options.",
        "lastViewed": "2017-03-11T01:19:44.815+0100",
        "watches": {
            "self": "http://localhost:8080/rest/api/2/issue/KAN-5/watchers",
            "watchCount": 1,
            "isWatching": true
        },
        "creator": {
            "self": "http://localhost:8080/rest/api/2/user?username=ausername",
            "name": "ausername",
            "key": "ausername",
            "emailAddress": "dummymail@mail.com",
            "avatarUrls": {
                "48x48": "http://localhost:8080/secure/useravatar?ownerId=ausername&avatarId=10501",
                "24x24": "http://localhost:8080/secure/useravatar?size=small&ownerId=ausername&avatarId=10501",
                "16x16": "http://localhost:8080/secure/useravatar?size=xsmall&ownerId=ausername&avatarId=10501",
                "32x32": "http://localhost:8080/secure/useravatar?size=medium&ownerId=ausername&avatarId=10501"
            },
            "displayName": "Dummy Name",
            "active": true,
            "timeZone": "Europe/Berlin"
        },
        "subtasks": [],
        "created": "2016-07-06T23:17:39.000+0200",
        "reporter": {
            "self": "http://localhost:8080/rest/api/2/user?username=ausername",
            "name": "ausername",
            "key": "ausername",
            "emailAddress": "dummymail@mail.com",
            "avatarUrls": {
                "48x48": "http://localhost:8080/secure/useravatar?ownerId=ausername&avatarId=10501",
                "24x24": "http://localhost:8080/secure/useravatar?size=small&ownerId=ausername&avatarId=10501",
                "16x16": "http://localhost:8080/secure/useravatar?size=xsmall&ownerId=ausername&avatarId=10501",
                "32x32": "http://localhost:8080/secure/useravatar?size=medium&ownerId=ausername&avatarId=10501"
            },
            "displayName": "Dummy Name",
            "active": true,
            "timeZone": "Europe/Berlin"
        },
        "customfield_10000": "0|i0000v:",
        "aggregateprogress": {
            "progress": 0,
            "total": 0
        },
        "priority": {
            "self": "http://localhost:8080/rest/api/2/priority/3",
            "iconUrl": "http://localhost:8080/images/icons/priorities/medium.svg",
            "name": "Medium",
            "id": "3"
        },
        "customfield_10001": null,
        "customfield_10002": null,
        "labels": [],
        "environment": null,
        "timeestimate": null,
        "aggregatetimeoriginalestimate": null,
        "versions": [],
        "duedate": null,
        "progress": {
            "progress": 0,
            "total": 0
        },
        "issuelinks": [],
        "votes": {
            "self": "http://localhost:8080/rest/api/2/issue/KAN-5/votes",
            "votes": 0,
            "hasVoted": false
        },
        "assignee": {
            "self": "http://localhost:8080/rest/api/2/user?username=ausername",
            "name": "ausername",
            "key": "ausername",
            "emailAddress": "dummymail@mail.com",
            "avatarUrls": {
                "48x48": "http://localhost:8080/secure/useravatar?ownerId=ausername&avatarId=10501",
                "24x24": "http://localhost:8080/secure/useravatar?size=small&ownerId=ausername&avatarId=10501",
                "16x16": "http://localhost:8080/secure/useravatar?size=xsmall&ownerId=ausername&avatarId=10501",
                "32x32": "http://localhost:8080/secure/useravatar?size=medium&ownerId=ausername&avatarId=10501"
            },
            "displayName": "Dummy Name",
            "active": true,
            "timeZone": "Europe/Berlin"
        },
        "updated": "2017-03-11T01:19:44.000+0100",
        "status": {
            "self": "http://localhost:8080/rest/api/2/status/10001",
            "description": "",
            "iconUrl": "http://localhost:8080/",
            "name": "Done",
            "id": "10001",
            "statusCategory": {
                "self": "http://localhost:8080/rest/api/2/statuscategory/3",
                "id": 3,
                "key": "done",
                "colorName": "green",
                "name": "Done"
            }
        }
    },
    "changelog": {
        "startAt": 0,
        "maxResults": 6,
        "total": 6,
        "histories": [
            {
                "id": "10005",
                "author": {
                    "self": "http://localhost:8080/rest/api/2/user?username=ausername",
                    "name": "ausername",
                    "key": "ausername",
                    "emailAddress": "dummymail@mail.com",
                    "avatarUrls": {
                        "48x48": "http://localhost:8080/secure/useravatar?ownerId=ausername&avatarId=10501",
                        "24x24": "http://localhost:8080/secure/useravatar?size=small&ownerId=ausername&avatarId=10501",
                        "16x16": "http://localhost:8080/secure/useravatar?size=xsmall&ownerId=ausername&avatarId=10501",
                        "32x32": "http://localhost:8080/secure/useravatar?size=medium&ownerId=ausername&avatarId=10501"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "created": "2016-07-06T23:28:46.812+0200",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10002",
                        "fromString": "Ready to Refine",
                        "to": "10012",
                        "toString": "Analyzing"
                    }
                ]
            },
            {
                "id": "10213",
                "author": {
                    "self": "http://localhost:8080/rest/api/2/user?username=ausername",
                    "name": "ausername",
                    "key": "ausername",
                    "emailAddress": "dummymail@mail.com",
                    "avatarUrls": {
                        "48x48": "http://localhost:8080/secure/useravatar?ownerId=ausername&avatarId=10501",
                        "24x24": "http://localhost:8080/secure/useravatar?size=small&ownerId=ausername&avatarId=10501",
                        "16x16": "http://localhost:8080/secure/useravatar?size=xsmall&ownerId=ausername&avatarId=10501",
                        "32x32": "http://localhost:8080/secure/useravatar?size=medium&ownerId=ausername&avatarId=10501"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "created": "2016-07-09T16:05:08.739+0200",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10012",
                        "fromString": "Analyzing",
                        "to": "10006",
                        "toString": "Ready for Development"
                    }
                ]
            },
            {
                "id": "10312",
                "author": {
                    "self": "http://localhost:8080/rest/api/2/user?username=ausername",
                    "name": "ausername",
                    "key": "ausername",
                    "emailAddress": "dummymail@mail.com",
                    "avatarUrls": {
                        "48x48": "http://localhost:8080/secure/useravatar?ownerId=ausername&avatarId=10501",
                        "24x24": "http://localhost:8080/secure/useravatar?size=small&ownerId=ausername&avatarId=10501",
                        "16x16": "http://localhost:8080/secure/useravatar?size=xsmall&ownerId=ausername&avatarId=10501",
                        "32x32": "http://localhost:8080/secure/useravatar?size=medium&ownerId=ausername&avatarId=10501"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "created": "2016-07-10T14:29:55.998+0200",
                "items": [
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10006",
                        "fromString": "Ready for Development",
                        "to": "10007",
                        "toString": "Ready for Test"
                    }
                ]
            },
            {
                "id": "10600",
                "author": {
                    "self": "http://localhost:8080/rest/api/2/user?username=ausername",
                    "name": "ausername",
                    "key": "ausername",
                    "emailAddress": "dummymail@mail.com",
                    "avatarUrls": {
                        "48x48": "http://localhost:8080/secure/useravatar?ownerId=ausername&avatarId=10501",
                        "24x24": "http://localhost:8080/secure/useravatar?size=small&ownerId=ausername&avatarId=10501",
                        "16x16": "http://localhost:8080/secure/useravatar?size=xsmall&ownerId=ausername&avatarId=10501",
                        "32x32": "http://localhost:8080/secure/useravatar?size=medium&ownerId=ausername&avatarId=10501"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "created": "2016-07-12T23:11:30.807+0200",
                "items": [
                    {
                        "field": "resolution",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "10000",
                        "toString": "Done"
                    },
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10007",
                        "fromString": "Ready for Test",
                        "to": "10001",
                        "toString": "Done"
                    }
                ]
            },
            {
                "id": "10904",
                "author": {
                    "self": "http://localhost:8080/rest/api/2/user?username=ausername",
                    "name": "ausername",
                    "key": "ausername",
                    "emailAddress": "dummymail@mail.com",
                    "avatarUrls": {
                        "48x48": "http://localhost:8080/secure/useravatar?ownerId=ausername&avatarId=10501",
                        "24x24": "http://localhost:8080/secure/useravatar?size=small&ownerId=ausername&avatarId=10501",
                        "16x16": "http://localhost:8080/secure/useravatar?size=xsmall&ownerId=ausername&avatarId=10501",
                        "32x32": "http://localhost:8080/secure/useravatar?size=medium&ownerId=ausername&avatarId=10501"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "created": "2017-03-11T01:11:05.773+0100",
                "items": [
                    {
                        "field": "resolution",
                        "fieldtype": "jira",
                        "from": "10000",
                        "fromString": "Done",
                        "to": null,
                        "toString": null
                    },
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10001",
                        "fromString": "Done",
                        "to": "10008",
                        "toString": "Testing"
                    }
                ]
            },
            {
                "id": "10906",
                "author": {
                    "self": "http://localhost:8080/rest/api/2/user?username=ausername",
                    "name": "ausername",
                    "key": "ausername",
                    "emailAddress": "dummymail@mail.com",
                    "avatarUrls": {
                        "48x48": "http://localhost:8080/secure/useravatar?ownerId=ausername&avatarId=10501",
                        "24x24": "http://localhost:8080/secure/useravatar?size=small&ownerId=ausername&avatarId=10501",
                        "16x16": "http://localhost:8080/secure/useravatar?size=xsmall&ownerId=ausername&avatarId=10501",
                        "32x32": "http://localhost:8080/secure/useravatar?size=medium&ownerId=ausername&avatarId=10501"
                    },
                    "displayName": "Dummy Name",
                    "active": true,
                    "timeZone": "Europe/Berlin"
                },
                "created": "2017-03-11T01:19:44.820+0100",
                "items": [
                    {
                        "field": "resolution",
                        "fieldtype": "jira",
                        "from": null,
                        "fromString": null,
                        "to": "10000",
                        "toString": "Done"
                    },
                    {
                        "field": "status",
                        "fieldtype": "jira",
                        "from": "10008",
                        "fromString": "Testing",
                        "to": "10001",
                        "toString": "Done"
                    }
                ]
            }
        ]
    }
};