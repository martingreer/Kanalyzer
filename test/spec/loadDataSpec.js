/*global describe, it, expect, beforeEach, module, inject*/
/*jslint bitwise: true, plusplus: true, white: true, sub: true*/

describe("Load data functionality", function () {
    "use strict";
    
    var localStorageMock : {
        this.data    : {},
        this.setItem : function(key,content){
            this.data[key] = content;
        }
    }
    
    beforeEach(module('kanApp'));
    
    var $controller;
    
    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));
    
    describe('$scope.getAllIssues', function () {
        it("should return a valid json object", function () {
            localStorageMock.data;
            //expect($scope.allIssuesString).jsonToBe(expectedResult);
        });
    });
});