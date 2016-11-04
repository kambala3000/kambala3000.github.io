(function($) {
    $.fn.carousel = function(options) {
        var defaults = {
            animationDuration: 500
        };

        var settings = $.extend(defaults, options);

        var $leftElem = $(this).find('.carousel-arrow-left'),
            $rightElem = $(this).find('.carousel-arrow-right'),
            $carouselList = $(this).find('.carousel-list');

        var $pixelsOffset = 125,
            $currentLeftPosition = 0,
            $itemsCount = $carouselList.find('li').length,
            $minimumOffset = -(($itemsCount - 5) * $pixelsOffset),
            $maximumOffset = 0;

        $leftElem.click(function() {
            if ($currentLeftPosition != $maximumOffset) {
                $currentLeftPosition += 125;
                $carouselList.animate({
                    left: $currentLeftPosition + 'px'
                }, settings.animationDuration);
            };
        });

        $rightElem.click(function() {
            if ($currentLeftPosition != $minimumOffset) {
                $currentLeftPosition -= 125;
                $carouselList.animate({
                    left: $currentLeftPosition + 'px'
                }, settings.animationDuration);
            };
        });

        return this;
    };
})(jQuery);
