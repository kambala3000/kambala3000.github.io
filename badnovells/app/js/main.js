"use strict";

(function () {

    $(document).ready(function () {
        $('.js-top-slider').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            initialSlide: 0,
            arrows: false,
            dots: false,
            fade: true,
            speed: 1800,
            pauseOnHover: false,
            swipe: false
        });
    });

    $('.js-up').click(function () {
        $(window).scrollTo(0);
    });

    $('.js-watch-proj').click(function () {
        $(window).scrollTo('.js-proj-arch', 500, {
            axis: 'y'
        });
    });
})();