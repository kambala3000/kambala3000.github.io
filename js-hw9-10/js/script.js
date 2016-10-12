$(function() {
    $('.jcarousel').jcarousel({});
    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');
        }).jcarouselPagination({
            item: function(page) {
                return '<a>' + page + '</a>';
            }
        });

    $('.jcarousel-prev')
        .on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-next')
        .on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=1'
        });

    $('.throw').styler();
    $('.niceCheck').click(function() {
        changeCheck($(this));
    });
    $('.niceCheck').each(function() {
        changeCheckStart($(this));
    });

    function changeCheck(el) {
        var el = el,
            input = el.find("input").eq(0);
        if (!input.attr("checked")) {
            el.css("background-position", "0 -17px");
            input.attr("checked", "true");
        } else {
            el.css("background-position", "0 0");
            input.removeAttr("checked");
        }
    }

    function changeCheckStart(el) {
        var el = el,
            input = el.find("input").eq(0);
        if (input.attr("checked")) {
            el.css("background-position", "0 -17px");
        }
    }
    $('.dropdown').hover(
        function() {
            $(this).children('.sub-menu')
                .slideDown(200)
                .animate({
                    backgroundColor: '#2e2e2e'
                }, 200);
        },
        function() {
            $(this).children('.sub-menu')
                .animate({
                    backgroundColor: '#414141'
                }, 200)
                .slideUp(200);

        }
    );
});
