$(document).ready(function(){
	var root = $('html, body');
	var header = $('header');
	var nav = $('nav');
	var projectList = $('#project-list');
	var project = $('#project');
	var footer = $('footer');
	header.height($(window).innerHeight() + $('#face').height() + $('header .controls .horizontal').height());
	projectList.height($(window).innerHeight());
	project.height($(window).innerHeight());
	header.transition({ height: $(window).innerHeight() - nav.height() }, 1000);
	setTimeout(function(){ $('header .items [data-item="0"]').addClass('active'); }, 1000);
	var section = 0;
	var docking = false;
	var searchWidthInit = $('#search').innerWidth();
	if (!window.getComputedStyle(document.querySelector('.sticky')).position.match('sticky')){
		nav.removeClass('sticky');
		docking = true;
	}
	$(window).scroll(function(){
		if ($(window).scrollTop() < header.height()) {
			if (section != 0) {
				if (docking) nav.removeClass('docked');
				$('#sectionLabel').text('Daniel Vogelnest');
				$('#switch svg').transition({ perspective: '100px', rotateX: '0deg' }, 1000);
				section = 0;
			}
		} 
		else if ($(window).scrollTop() < (header.height() + projectList.height() + footer.height())) {
			if (section != 1) {
				$('#sectionLabel').text('Projects');
				$('#switch svg').transition({ perspective: '100px', rotateX: '180deg' }, 1000);
				if (docking && (section == 0)) nav.addClass('docked');
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
		header.height($(window).innerHeight() - nav.height());
		projectList.height($(window).innerHeight());
		project.height($(window).innerHeight());
	});
	$('#switch').click(function(e){
		e.preventDefault();
		if (section == 1) root.animate({ scrollTop: 0 }, 500);
		else root.animate({ scrollTop: header.height() }, 500);
	});
	$('#searchBox').focusin(function() {
		root.animate({ scrollTop: header.height() }, 500);
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
	$('header .controls li').click(function(e){
		e.preventDefault();
		$('header .active').removeClass('active');
		$('header [data-item="'+$(this).data('item')+'"]').addClass('active');
	});
	$('.project-summary').click(function(e){
		e.preventDefault();
		$('#project').fadeIn();
		$('section .active').removeClass('active');
		$('section [data-item="'+$(this).data('item')+'"]').addClass('active');
	});
	$('#project-list .controls li').click(function(e){
		e.preventDefault();
		$('project-list .active').removeClass('active');
		$('project-list [data-item="'+$(this).data('item')+'"]').addClass('active');
	});
	var cycleTimer = setInterval(cycle, 10000);
	function cycle(){ 
		$('header .active').removeClass('active');
		var next = parseInt($('header .controls .active').data('item')) + 1;
		if ($('header [data-item="'+next+'"]').length == 0) {
			next = 0;
		}
		$('header [data-item="'+next+'"]').addClass('active');
	}
});

/*
@media (scroll-top: 10px) {
.sticky {
postition: fixed;
background: red;
}
}
*/
