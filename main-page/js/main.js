"use strict";var owl=$(".slider");owl.owlCarousel({items:5,loop:!0,autoWidth:!0,margin:15,autoplay:!0,autoplayTimeout:2e3,autoplayHoverPause:!0}),$(document).width()<752?$(".about").trigger("sticky_kit:detach"):$(".about").stick_in_parent(),$(window).resize(function(){$(document).width()<761?$(".about").trigger("sticky_kit:detach"):$(".about").stick_in_parent()});
