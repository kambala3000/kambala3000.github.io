"use strict";

$(function () {
    var testQuestions = {
        qw1: {
            question: "Mодем - это устройство, предназначенное для ...",
            answers: [["вывода информации на печать", false], ["хранения информации", false], ["обработки информации в данный момент времени", false], ["передачи информации по телефонным каналам связи", true]]
        },
        qw2: {
            question: "Web-страница - это ...",
            answers: [["документ, в котором хранится информация сервера", true], ["документ, в котором хранится вся информация по сети", false], ["документ, в котором хранится информация пользователя", false], ["сводка меню программных продуктов", false]]
        },
        qw3: {
            question: "За основную единицу измерения количества информации принят ...",
            answers: [["1 бод", false], ["1 бит", false], ["1 байт", true], ["1 кбайт", false]]
        },
        qw4: {
            question: "Файл – это ...",
            answers: [["единица измерения информации", false], ["программа в оперативной памяти", false], ["текст, распечатанный на принтере", false], ["программа или данные на диске", true]]
        },
        qw5: {
            question: "К единицам измерения информации относятся ... (возможно несколько вариантов)",
            answers: [["символ", false], ["файл", false], ["мегабайт", true], ["килобайт", true]]
        }
    };
    localStorage.setItem('testQuestions', JSON.stringify(testQuestions));

    var testObj = localStorage.getItem('testQuestions');
    testObj = JSON.parse(testObj);
    var htmlStr = $('#test').html();
    var content = tmpl(htmlStr, {
        data: testObj
    });
    $('.page').append(content);

    var result = 0;
    $('.main-form__button').click(function () {
        var _loop = function _loop(key) {
            var current = "#" + key + " input";
            $(current).each(function (j) {
                if ($(current).eq(j)[0].checked != testObj[key].answers[j][1]) {
                    result = 1;
                };
                $(current).eq(j)[0].checked = false;
            });
        };

        for (var key in testObj) {
            _loop(key);
        };
        var $modal = $("<div class='modal'><h5 class='modal__head'>Сообщение</h5><p class='modal__text'></p><a class='modal__button'>Okay</a></div><div class='darkArea'></div>");
        $('body').append($modal);
        if (result == 1) {
            $('.modal__text').text('Ответы неверны, пройдите тест ещё раз.');
        } else {
            $('.modal__text').text('Поздравляю! Ответы верны.');
        };

        function hideModal(e) {
            $modal.remove();
        };

        $('.modal__button').on('click', hideModal);
        $('.darkArea').on('click', hideModal);
        result = 0;
    });
});