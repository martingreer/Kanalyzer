/**
 * Base64 encoding + decoding for use in http requests.
 */
application.factory('Base64', function () {
    "use strict";
    /*jslint regexp: true*/

    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = "",
                chr1, chr2, chr3 = "",
                enc1, enc2, enc3, enc4 = "",
                i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "",
                chr1, chr2, chr3 = "",
                enc1, enc2, enc3, enc4 = "",
                i = 0,
                base64test = /[^A-Za-z0-9\+\/\=]/g,
                alert;

            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);
            /*jslint regexp: false*/
            return output;
        }
    };
});

/**
 * Session storage for API info and "logged in" status.
 * These variables are not meant to be used while logged out, so they don't need to be in local storage.
 */
application.factory('apiServerData', function(){
    var data = {
        apiRoot: '',
        apiProject: '',
        isLoggedIn: false
    };

    return {
        getApiRoot: function () {
            return data.apiRoot;
        },
        setApiRoot: function (apiRoot) {
            data.apiRoot = apiRoot;
        },
        getApiProject: function () {
            return data.apiProject;
        },
        setApiProject: function (apiProject) {
            data.apiProject = apiProject;
        },
        getApiServer: function (apiType) {
            if(apiType === 'jira'){
                return data.apiRoot + 'rest/api/2/issue/createmeta';
            } else {
                return '';
            }
        },
        getIsLoggedIn: function () {
            return data.isLoggedIn;
        },
        setIsLoggedIn: function (isLoggedIn) {
            data.isLoggedIn = isLoggedIn;
        }
    }
});

/**
 * Local storage helper for remembering a users previous login username and URL.
 */
application.factory('previousLogin', function(){
    return {
        getPreviousLogin: function (callback) {
            chrome.storage.local.get(['url', 'userName'], callback);
        },
        setPreviousLogin: function (urlToSet, userNameToSet) {
            chrome.storage.local.set({url: urlToSet, userName: userNameToSet});
        }
    }
});

/**
 * Local storage helper for remembering a users previous Load Data choices.
 */
application.factory('previousLoadData', function(){
    return {
        getPreviousLoadData: function (callback) {
            chrome.storage.local.get(['boardId', 'projectKey', 'maxResults'], callback)
        },
        setPreviousLoadData: function (boardIdToSet, projectKeyToSet, maxResultsToSet) {
            chrome.storage.local.set({boardId: boardIdToSet, projectKey: projectKeyToSet, maxResults: maxResultsToSet});
        }
    }
});

/**
 * Local storage helper for board design, issues and configs.
 */
application.factory('localStorageHandler', function(){
    return {
        getBoardDesign: function (callback) {
            chrome.storage.local.get('boardDesign', callback);
        },
        setBoardDesign: function (boardDesignToSet) {
            chrome.storage.local.set({boardDesign: boardDesignToSet});
        },
        removeBoardDesign: function () {
            chrome.storage.local.remove('boardDesign');
        },
        getLoadedProject: function (callback) {
            return chrome.storage.local.get('loadedProject', callback);
        },
        setLoadedProject: function (loadedProjectToSet) {
            chrome.storage.local.set({loadedProject: loadedProjectToSet});
        },
        getIssues: function (callback) {
            chrome.storage.local.get('issues', callback);
        },
        setIssues: function (issuesToSet) {
            chrome.storage.local.set({issues: issuesToSet});
        },
        removeIssues: function () {
            StorageArea.sync.remove('issues');
        },
        getConfigs: function (callback) {
            chrome.storage.local.get('userConfigs', callback);
        },
        setConfigs: function (userConfigsToSet) {
            chrome.storage.local.set({userConfigs: userConfigsToSet});
        },
        removeConfigs: function () {
            StorageArea.sync.remove('userConfigs');
        },
        getSelectedConfig: function () {
            return chrome.storage.local.get('userConfigs', function (data) {
                var configs = data;
                var selectedConfig = {};
                if (configs) {
                    _.forEach(configs, function (config) {
                        if (config.name === name) {
                            selectedConfig = config;
                            return false;
                        }
                    });
                    return selectedConfig;
                } else {
                    return {};
                }
            });
        }
    }
});
