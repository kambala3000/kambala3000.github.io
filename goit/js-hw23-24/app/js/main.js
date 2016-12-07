"use strict";

requirejs.config({
    paths: {
        'jquery': 'https://code.jquery.com/jquery-1.12.4.min'
    },
    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'tmpl': {
            exports: 'tmpl'
        }
    }
});

require(
    ['model', 'view', 'controller', 'tmpl', 'jquery'],
    function(Model, View, Controller, tmpl, jquery) {
        $(function() {
            var defaultData = ['Проснуться', 'Позавтракать', 'Пойти на работу'];
            var model = new Model(defaultData),
                view = new View(model),
                controller = new Controller(model, view);
        });

    }
);
