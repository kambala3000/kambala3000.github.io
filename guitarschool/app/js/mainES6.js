"use strict";

$(document).ready(function () {
    $('.proj-slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        initialSlide: 1,
        arrows: false,
        dots: true,
        fade: true,
        speed: 800,
        swipe: false
    });

    $('.js-gallery').slick({
        swipe: false,
        prevArrow: '<a href="#" class="slick-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></a>',
        nextArrow: '<a href="#" class="slick-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>'
    });
});