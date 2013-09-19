$(document).ready(function(){
	var root = $('html, body');
	var header = $('header');
	var nav = $('nav');
	var dockHeight = $(window).innerHeight() - nav.height();
	header.css('height', dockHeight);
	var docked = false;
	var docking = false;
	var searchWidthInit = $('#search').innerWidth();
	if (!window.getComputedStyle(document.querySelector('.sticky')).position.match('sticky')){
		nav.removeClass('sticky');
		docking = true;
	}
	$(window).scroll(function(){
		if (!docked && ($(window).scrollTop() >= dockHeight)){
			if (docking) nav.addClass('docked');
			$('#sectionLabel').text('Projects');
			$('#switch svg').transition({ perspective: '100px', rotateX: '180deg' });
			docked = true;
		} 
		else if (docked && ($(window).scrollTop() < dockHeight)){
			if (docking) nav.removeClass('docked');
			$('#sectionLabel').text('Daniel Vogelnest');
			$('#switch svg').transition({ perspective: '100px', rotateX: '0deg' });
			docked = false;
		}
	});
	$(window).resize(function(){
		dockHeight = $(window).innerHeight() - nav.height();
		header.css('height', dockHeight);
	});
	$('#switch').click(function(e){
		e.preventDefault();
		if (docked) {
			root.animate({ scrollTop: 0 }, 500);
		} else {
			root.animate({ scrollTop: dockHeight }, 500);
		}
	});
	$('#searchBox').focusin(function() {
		root.animate({ scrollTop: dockHeight }, 500);
		var searchWidth = $(window).innerWidth();
		$('#search').transition({ width: (searchWidth - 10) }); 
		$('#sectionLabel, #switch').transition({ opacity: 0 });
		$('#searchCancel').transition({ opacity: 1 });
	});
	$('#searchBox').focusout(function() {
		$('#search').transition({ width: searchWidthInit }); 
		$('#sectionLabel, #switch').transition({ opacity: 1 });
		$('#searchCancel').transition({ opacity: 0 });
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
