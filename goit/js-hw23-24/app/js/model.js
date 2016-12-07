"use strict";

define(
    'model', ['jquery'],
    function(jquery) {
        function Model(data) {
            var self = this;
            self.data = data;
            self.addItemVal = function(item) {
                if (item.length === 0) {
                    return;
                }
                self.data.push(item);
                return self.data;
            };

            self.changeItemVal = function(oldItem, newItem) {
                var index = self.data.indexOf(oldItem);
                if (index === -1) {
                    return;
                }
                self.data[index] = newItem;
                return self.data;
            };

            self.removeItemVal = function(item) {
                var index = self.data.indexOf(item);
                if (index === -1) {
                    return;
                }
                self.data.splice(index, 1);
                return self.data;
            };
        }
        return Model;
    }
);
