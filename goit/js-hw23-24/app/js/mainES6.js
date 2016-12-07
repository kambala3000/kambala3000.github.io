"use strict";

function Model(data) {
    let self = this;
    self.data = data;
    self.addItemVal = function(item) {
        if (item.length === 0) {
            return;
        }
        self.data.push(item);
        return self.data;
    };

    self.changeItemVal = function(oldItem, newItem) {
        let index = self.data.indexOf(oldItem);
        if (index === -1) {
            return;
        }
        self.data[index] = newItem;
    };

    self.removeItemVal = function(item) {
        let index = self.data.indexOf(item);
        if (index === -1) {
            return;
        }
        self.data.splice(index, 1);
        return self.data;
    };
}

function View(model) {
    let self = this;

    function init() {
        self.elements = {
            input: $('.js-input'),
            addBtn: $('.js-btn-add'),
            listContainer: $('.js-tasks-list')
        };
        self.renderList(model.data);
    };

    self.renderList = function(data) {
        let list = tmpl($('#list-template').html(), {
            data: data
        });
        self.elements.listContainer.html(list);
    };

    init();
}

function Controller(model, view) {
    let self = this;
    view.elements.addBtn.on('click', addItem);
    view.elements.listContainer.on('click', '.js-btn-edit', editItem);
    view.elements.listContainer.on('click', '.js-btn-del', removeItem);

    function addItem() {
        let newItem = view.elements.input.val();
        model.addItemVal(newItem);
        view.renderList(model.data);
        view.elements.input.val('');
    };

    let clickChek = true;
    let oldItemText;

    function editItem() {
        if (clickChek) {
            $(this).html('Ok');
            let textfield = $(this).prevAll('.js-textfield');
            oldItemText = textfield.text().trim();
            textfield.replaceWith($('<input type="text" class="js-edit-input tasks-list__edit-input" value="' + oldItemText + '"></input>'));
            clickChek = false;
        } else {
            $(this).html('Edit');
            let editInput = $(this).prevAll('.js-edit-input');
            let newItemText = editInput.val();
            editInput.replaceWith($('<p class="tasks-list__text js-textfield">' + newItemText + '</p>'));
            model.changeItemVal(oldItemText, newItemText);
            oldItemText = '';
            clickChek = true;
        }
    };

    function removeItem() {
        let item = $(this).prevAll('.js-textfield').text().trim();
        model.removeItemVal(item);
        view.renderList(model.data);
    };
}

$(function() {
    let defaultData = ['Проснуться', 'Позавтракать', 'Пойти на работу'];
    let model = new Model(defaultData),
        view = new View(model),
        controller = new Controller(model, view);
});
