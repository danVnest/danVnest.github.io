$(document).ready(function(){
	var root = $('html, body');
	var header = $('header');
	var projectList = $('#project-list');
	var nav = $('nav');
	var dockHeight = $(window).innerHeight() - nav.height();
	var projectHeight = $(document).height();
	header.css('height', dockHeight);
	var section = 0;
	var docking = false;
	var searchWidthInit = $('#search').innerWidth();
	if (!window.getComputedStyle(document.querySelector('.sticky')).position.match('sticky')){
		nav.removeClass('sticky');
		docking = true;
	}
	$(window).scroll(function(){
		/*if (!docked && ($(window).scrollTop() >= dockHeight)){
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
		*/
		if ($(window).scrollTop() < dockHeight) {
			if (section != 0) {
				if (docking) nav.removeClass('docked');
				$('#sectionLabel').text('Daniel Vogelnest');
				$('#switch svg').transition({ perspective: '100px', rotateX: '0deg' });
				section = 0;
			}
		} 
		else if ($(window).scrollTop() < projectHeight) {
			if (section != 1) {
				$('#sectionLabel').text('Projects');
				if (section == 0) {
					if (docking) nav.addClass('docked');
					$('#switch svg').transition({ perspective: '100px', rotateX: '180deg' });
				}
				else {
					$('#switch svg').transition({ perspective: '100px', rotateX: '180deg' }, 1000);
				}
				section = 1;
			}
		}
		else if (section != 2) {
			$('#sectionLabel').text('Building a Website');
			$('#switch svg').transition({ perspective: '100px', rotateX: '540deg' }, 1000);
			section = 2;
		}
	});
	$(window).resize(function(){
		dockHeight = $(window).innerHeight() - nav.height();
		header.css('height', dockHeight);
	});
	$('#switch').click(function(e){
		e.preventDefault();
		if (section == 1) {
			root.animate({ scrollTop: 0 }, 500);
		}
		else {
			root.animate({ scrollTop: dockHeight }, 500);
		}
	});
	$('#temp-project-brief').click(function(e){
		e.preventDefault();
		$('#project').fadeIn();
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
