"use strict";

(function () {

    $(document).ready(function () {
        if ($('html').attr('lang') === 'en') {
            $('.js-lang-item:first-child').removeClass('main-header__lang-item--transparent');
            $('.js-lang-item:last-child').addClass('main-header__lang-item--transparent');
        }
        $('.js-top-slider').slick({
            autoplay: true,
            lazyLoad: 'progressive',
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

    $('.gallery__item').click(function () {
        if ($('.modal-window').length > 0) return;
        var imgPath = $(this).find('img[data-link="modal"]').attr('src');
        var format = imgPath.slice(-4);
        imgPath = imgPath.slice(0, imgPath.length - format.length) + '-full' + format;
        var modalContent = '<div class="modal-window js-close-modal"><div class="modal-frame"><div class="close-modal js-close-modal"></div><div class="cross-in-circle js-close-modal"></div><img src="' + imgPath + '"alt="screen" width="100%"></div>';
        $('body').prepend(modalContent);
        $('.modal-window').animate({
            opacity: 1
        }, 300);
    });

    $('body').on('click', '.js-close-modal', function (e) {
        var targ = $(e.target);
        if (targ.hasClass('js-close-modal')) {
            $('.modal-window').animate({
                opacity: 0
            }, 300, function () {
                this.remove();
            });
        }
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