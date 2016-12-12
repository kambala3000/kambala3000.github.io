'use strict';

$(function() {
    var icons = {
        header: "ui-icon-plus",
        activeHeader: "ui-icon-minus"
    };
    $("#accordion").accordion({
        icons: icons
    });
    $("#toggle").button().on("click", function() {
        if ($("#accordion").accordion("option", "icons")) {
            $("#accordion").accordion("option", "icons", null);
        } else {
            $("#accordion").accordion("option", "icons", icons);
        }
    });
    $('.jcarousel')
        .jcarousel({
            wrap: 'circular'
        })
        .jcarouselAutoscroll({
            interval: 3000,
            target: '+=1',
            autostart: true
        });
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

    $.getJSON("https://raw.githubusercontent.com/goit-fe/markup_fe2o/master/js_19-20/data.json",
        function(dataSkills) {
            dataSkills = _.union(_.flattenDeep(_.map(dataSkills, 'skills'))).sort();
            var result = dataSkills;
            console.log(dataSkills);
        });

    $.getJSON("https://raw.githubusercontent.com/goit-fe/markup_fe2o/master/js_19-20/data.json",
        function(dataName) {
            dataName = _.map(_.sortBy(dataName, function(obj) {
                return obj.friends.length
            }), 'name').reverse();
            var result = dataName;
            console.log(dataName);
        });

    $.getJSON("https://raw.githubusercontent.com/goit-fe/markup_fe2o/master/js_19-20/data.json",
        function(dataFriends) {
            dataFriends = _.uniq(_.map(_.flattenDeep(_.map(dataFriends, 'friends')), 'name')).sort();
            var result = dataFriends;
            console.log(dataFriends);
        });
});
