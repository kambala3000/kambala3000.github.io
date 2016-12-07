"use strict";

define(
    'controller', ['model', 'view', 'jquery'],
    function(model, view, jquery) {
        function Controller(model, view) {
            var self = this;
            view.elements.addBtn.on('click', addItem);
            view.elements.listContainer.on('click', '.js-btn-edit', editItem);
            view.elements.listContainer.on('click', '.js-btn-del', removeItem);

            function addItem() {
                var newItem = view.elements.input.val();
                model.addItemVal(newItem);
                view.renderList(model.data);
                view.elements.input.val('');
            };

            var clickChek = true;
            var oldItemText = void 0;

            function editItem() {
                if (clickChek) {
                    $(this).html('Ok');
                    var textfield = $(this).prevAll('.js-textfield');
                    oldItemText = textfield.text().trim();
                    textfield.replaceWith($('<input type="text" class="js-edit-input tasks-list__edit-input" value="' + oldItemText + '"></input>'));
                    clickChek = false;
                } else {
                    $(this).html('Edit');
                    var editInput = $(this).prevAll('.js-edit-input');
                    var newItemText = editInput.val();
                    editInput.replaceWith($('<p class="tasks-list__text js-textfield">' + newItemText + '</p>'));
                    model.changeItemVal(oldItemText, newItemText);
                    oldItemText = '';
                    clickChek = true;
                }
            };

            function removeItem() {
                var item = $(this).prevAll('.js-textfield').text().trim();
                model.removeItemVal(item);
                view.renderList(model.data);
            };
        }
        return Controller;
    }
);
