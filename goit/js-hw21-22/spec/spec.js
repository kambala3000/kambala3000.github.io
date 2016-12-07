'use strict';

let obj = require('../app/js/tested.js');


describe("Testing object pow method result", function() {
    it("result should be '8'", function() {
        let result,
            testRes,
            x = 2,
            n = 3;

        testRes = Math.pow(x, n);
        result = obj.pow(x, n);

        expect(result).toEqual(testRes);
    });

    it("result should be defined", function() {
        let result,
            x = -2,
            n = -4;

        result = obj.pow(x, n);

        expect(result).toBeDefined();
    });

    it("testing default values", function() {
        let result;

        result = obj.pow();
        //default x = 0, n = 0

        expect(result).toEqual(1);
    });

});
