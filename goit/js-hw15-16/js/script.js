'use strict';

$(function() {
    var resultBox = $('.js-results');
    $('.js-search-form').on('submit', function(e) {
        e.preventDefault();
        var request = $('.js-search-input').val();
        $.getJSON('https://pixabay.com/api/?key=3629924-63e5f9f547b9ecefc6648f55f&q=' + request + '&image_type=photo&pretty=true',
            function(data) {
                $.each(data.hits, function(i, item) {
                    let $imageBlock = $('<a class="results-box__link" target="_blank" href="' + item.webformatURL + '" title="' + item.tags + '"><img src="' + item.previewURL + '"></a>');
                    $imageBlock.appendTo(".js-results");
                    if (i == 3) return false;
                });
            });
        resultBox.css({
            display: 'block'
        });
    });

    $('.js-reset-btn').click(function(e) {
        e.preventDefault();
        $('.js-results').empty();
        $('.js-search-input').val('');
        resultBox.css({
            display: 'none'
        });
    });

    // работа с прототипами

    var Human, Worker, Student;

    function Human(name, age, gender, height, weight) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.walk = true;
    };

    function Worker(name, age, gender, height, weight, job) {
        Human.apply(this, arguments);
        this.job = job;
    };

    function Student(name, age, gender, height, weight, study, grants) {
        Human.apply(this, arguments);
        this.study = study;
        this.grants = grants;
    };

    Worker.prototype = Object.create(Human.prototype);
    Worker.prototype.constructor = Worker;
    Student.prototype = Object.create(Human.prototype);
    Student.prototype.constructor = Student;

    Human.prototype.eat = function() {
        console.log(this.name + " eating...");
    };
    Student.prototype.watchSeries = function() {
        console.log(this.name + ' watching "Game Of Thrones"...');
    };
    Worker.prototype.working = function() {
        console.log(this.name + " working as " + this.job + "...");
    };

    var human1 = new Human("Иван", "30", "мужчина", "170", "75");
    var worker1 = new Worker("Василий", "25", "мужчина", "190", "80", "сварщик");
    var student1 = new Student("Петр", "20", "мужчина", "180", "70", "КрНУ", "800 грн");

    console.log(human1);
    console.log(worker1);
    console.log(student1);
    human1.eat();
    worker1.working();
    worker1.eat();
    student1.watchSeries();
    student1.eat();

});
