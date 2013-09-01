$(document).ready(function(){
	var root = $('html, body');
	var header = $('header');
	var nav = $('nav');
	var dockHeight = $(window).innerHeight() - nav.height();
	header.css('height', dockHeight);
	var docked = false;
	var docking = false;
	if (!window.getComputedStyle(document.querySelector('.sticky')).position.match('sticky')){
		nav.removeClass('sticky');
		docking = true;
	}
	$(window).scroll(function(){
		if (!docked && ($(window).scrollTop() > dockHeight)){
			if (docking) nav.addClass('docked');
			$('#sectionLabel').text('Projects');
			//$('#switch svg').transition({ perspective: '100px', rotateX: '180deg' });
			docked = true;
		} 
		else if (docked && ($(window).scrollTop() <= dockHeight)){
			if (docking) nav.removeClass('docked');
			$('#sectionLabel').text('Daniel Vogelnest');
			//$('#switch svg').transition({ perspective: '100px', rotateX: '0deg' });
			docked = false;
		}
	});
	$(window).resize(function(){
		dockHeight = $(window).innerHeight() - nav.height();
		header.css('height', dockHeight);
	});

	$('a').click(function(e){
		e.preventDefault();
		var href = $.attr(this, 'href');
		root.animate({ scrollTop: $(href).offset().top }, 500, function(){ window.location.hash = href; });
	});
});

/*
@media (scroll-top: 10px) {
.sticky {
postition: fixed;
background: red;
}
}
*/
