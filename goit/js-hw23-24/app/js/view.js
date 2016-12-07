"use strict";

define(
    'view',
    ['model', 'jquery'],
    function(model, jquery) {
        function View(model) {
            var self = this;

            function init() {
                self.elements = {
                    input: $('.js-input'),
                    addBtn: $('.js-btn-add'),
                    listContainer: $('.js-tasks-list')
                };
                self.renderList(model.data);
            };

            self.renderList = function(data) {
                var list = tmpl($('#list-template').html(), {
                    data: data
                });
                self.elements.listContainer.html(list);
            };

            init();
        }
        return View;
    }
);
