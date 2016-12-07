$(function() {
    $('div.carousel').carousel({
        animationDuration: 400
    });

    var html = $('#profile').html();
    var usersProfiles = [{
        name: 'Иван',
        source: 'img/14675692422260.jpg',
        text: 'lorem ipsum dolor',
        tel: '555-35-35',
        link: 'https://vk.com/'
    }, {
        name: 'Петя',
        source: 'img/85369856454.jpg',
        text: 'lorem ipsum dolor',
        tel: '555-35-35',
        link: 'https://vk.com/'
    }, {
        name: 'Федор',
        source: 'img/945235676583.jpg',
        text: 'lorem ipsum dolor',
        tel: '555-35-35',
        link: 'https://vk.com/'
    }];

    var content = tmpl(html, {
        data: usersProfiles
    });


    $('body').append(content);

});
