"use strict";

(function () {

    $('.js-up').click(function () {
        $(window).scrollTo(0);
    });

    $('.js-watch-proj').click(function () {
        $(window).scrollTo('.js-proj-arch', 500, {
            axis: 'y'
        });
    });

})();