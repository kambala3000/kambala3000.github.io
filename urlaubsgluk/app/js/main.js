"use strict";

var slidr1 = slidr.create('slidr-div', {
    transition: 'none'
}).add('h', ['one', 'two', 'three', 'one']).start();
var slidr2 = slidr.create('slidr-div2', {
    transition: 'none'
}).add('h', ['one', 'two', 'three', 'one']).start();
var slidr3 = slidr.create('slidr-div3', {
    transition: 'none'
}).add('h', ['one', 'two', 'three', 'one']).start();

$(function () {
    function gridBuild() {
        var $grid = $('.grid');
        $grid.imagesLoaded(function () {
            $grid.masonry({
                itemSelector: '.grid-item',
                percentPosition: true,
                columnWidth: '.grid-sizer'
            });
        });
    };
    window.pixabayCallback = function () {
        return;
    };
    function search() {
        $('.ideas__container').find('div').remove();
        var $inputValue = $('.search-form__input').val();
        $.ajax({
            url: 'https://pixabay.com/api/',
            data: {
                key: '3629924-63e5f9f547b9ecefc6648f55f',
                q: $inputValue,
                callback: pixabayCallback()
            },
            method: 'GET',
            dataType: 'jsonp',
            error: function error() {
                console.log('Some error happened');
            },
            success: function success(data) {
                var $html = $('#masonry-tmpl').html();
                var $content = tmpl($html, data);
                $('.ideas__container').append($content);
                gridBuild();
            }
        });
    };
    search();
    $('.js-btn-search').on('click', function (e) {
        e.preventDefault();
        search();
        $('.search-form__input').val('');
    });
});