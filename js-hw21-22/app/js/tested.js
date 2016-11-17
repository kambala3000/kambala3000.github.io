'use strict';

let obj = {
    pow: function(x = 0, n = 0) {
        let result = Math.pow(x, n);
        return result;
    }
};

module.exports = obj;
