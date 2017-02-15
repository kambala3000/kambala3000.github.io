(function () {
	$('.gallery__item').click(function () {
		if ($('.modal-window').length > 0) return;
		var imgPath = $(this).find('img[data-link="modal"]').attr('src');
		var format = imgPath.slice(imgPath.indexOf('.'));
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
				this.remove()
			});
		}
	});
})();