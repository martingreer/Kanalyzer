/*jslint regexp: true*/

/**
This script is not used yet. Might be deleted.
**/

function syntaxHighlight(jsonData) {
    "use strict";
    
    if (typeof jsonData !== 'string') {
        jsonData = JSON.stringify(jsonData, undefined, 2);
    }
    jsonData = jsonData.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return jsonData.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

/*jslint regexp: false*/