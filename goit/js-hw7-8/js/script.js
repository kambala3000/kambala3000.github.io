$('.tabs-list__link').click(function() {
    var linkId = $(this).attr('id');
    if (linkId != $('.tabs-list__link.active').attr('id')) {
        $('.tabs-list__link').removeClass('active');
        $(this).addClass('active');
        $('.tab-container').removeClass('active');
        $('#' + linkId + '__cont').addClass('active');
    }
    event.preventDefault();
});


$('.forms__textarea').hover(function() {
    var linkId = $(this).attr('id');
    $('#' + linkId + '__tooltip')
        .removeClass('hide')
        .animate({
            opacity: 1
        }, 500);
}, function() {
    var linkId = $(this).attr('id');
    $('#' + linkId + '__tooltip').animate({
        opacity: 0
    }, 500, function() {
        $(this).addClass('hide');
    });
});

$('.forms__label').click(function() {
    var labelFor = $(this).attr('for');
    $('#' + labelFor + '__tooltip')
        .removeClass('hide')
        .animate({
            opacity: 1
        }, 500);
});

$('#button-help').click(function() {
    $('.tooltip')
        .removeClass('hide')
        .animate({
            opacity: 1
        }, 500);
});
