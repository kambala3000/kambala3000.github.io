$(document).ready(function() {
	$('.modal-window').hide();
})
$('.gallery__item').click(function() {
	console.log("log log");
	var tubik = $(this).find('img[data-link="modal"]').attr('src');
	console.log(tubik);
	$('.modal-window img[data-link="received"]').attr('src', tubik);
       console.log($('.modal-window img').attr("src"));
       $('.modal-window').fadeIn({}, 50);
})
$('.close-modal').click(function(){
	$('.modal-window').hide();
})
$('.cross-in-circle').click(function(){
	$('.modal-window').hide();
})
