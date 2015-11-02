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

application.factory('localStorageHandler', function(){
    return {
        getBoardDesign: function () {
            if(localStorage.getItem('boardDesign')){
                return JSON.parse(localStorage.getItem('boardDesign'));
            } else {
                return [];
            }
        },
        setBoardDesign: function (data) {
            localStorage.setItem('boardDesign', JSON.stringify(data));
        },
        removeBoardDesign: function () {
            localStorage.removeItem('boardDesign');
        },
        getLoadedProject: function () {
            if(localStorage.getItem('loadedProject')){
                return JSON.parse(localStorage.getItem('loadedProject'));
            } else {
                return '';
            }
        },
        setLoadedProject: function (data) {
            localStorage.setItem('loadedProject', JSON.stringify(data));
        },
        getIssues: function () {
            if(localStorage.getItem('issues')){
                return JSON.parse(localStorage.getItem('issues'));
            } else {
                return [];
            }
        },
        setIssues: function (data) {
            localStorage.setItem('issues', JSON.stringify(data));
        },
        removeIssues: function () {
            localStorage.removeItem('issues');
        },
        getConfigs: function () {
            if(localStorage.getItem('userConfigs')){
                return JSON.parse(localStorage.getItem('userConfigs'));
            } else {
                return [];
            }
        },
        setConfigs: function (data) {
            localStorage.setItem('userConfigs', JSON.stringify(data));
        },
        removeConfigs: function () {
            localStorage.removeItem('userConfigs');
        }
    }
});
