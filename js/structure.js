$(window).on('beforeunload', function() {
	    $(window).scrollTop(0);
});
$(document).ready(function(){
	var root = $('html, body');
	var animationDuration = 1000;
	var header = $('header');
	var nav = $('nav');
	var projectList = $('#project-list');
	var project = $('#project');
	var sectionHeight = $(window).innerHeight() - nav.height();
	var name = 'daniel.vogelnest';
	var domain = 'me.com';
	$('.email').attr('href', 'mailto:' + name + '@' + domain).text(name + '@' + domain);
	header.height($(window).innerHeight() + $('#face').height() + $('header .controls .horizontal').height());
	projectList.height(sectionHeight);
	project.height(sectionHeight);
	projectListCount = $('.project-summary').last().data('item');
	projectListRows = Math.floor((sectionHeight - $('#project-list-intro').outerHeight(true) - $('#project-list .controls').outerHeight(true)) / 140);
	projectListColumns = Math.ceil(projectListCount / projectListRows);
	if (projectListColumns > 1) {
		for (i = projectListRows; i < projectListCount; i += projectListRows) {
			$('.project-summary').slice(i - projectListRows, i).wrapAll('<div class="list-column"></div>');
		}
	}
	$('.project-summary').slice((projectListColumns-1)*projectListRows).wrapAll('<div class="list-column"></div>');
	$('.list-column').each(function(index) {
		$(this).attr('data-column', index);
		$('#project-list .controls ol').append('<li data-column="'+index+'"></li>');
	});
	$('#project-list .controls li').first().addClass('active');
	$('.list-carousel').width($('.list-column').outerWidth() * projectListColumns);
	header.transition({ height: sectionHeight }, animationDuration);
	setTimeout(function(){ $('header [data-item="0"]').addClass('active').filter('.item').transition({ opacity: '1' }, animationDuration); }, 1000);
	$('#circle-arrow').attr('d','m20,30 q0,' + sectionHeight*.3 + ' ' + -root.width()*.5 + ',' + sectionHeight*.4);
	$('#switch-arrow').attr('d','m20,30 q' + root.width()*.1 + ',' + sectionHeight*.2 + ' ' + -root.width()*.2 + ',' + sectionHeight*.55);
	$('#search-arrow').attr('d','m20,30 q' + root.width()*.1 + ',' + sectionHeight*.2 + ' ' + root.width()*.2 + ',' + sectionHeight*.5);
	$('#search-arrow2').attr('d','m10,5 q' + root.width()*.2 + ',20 ' + root.width()*.2 + ',-30');
	$('#project-arrow').attr('d','m10,5 q' + root.width()*.1 + ',-10 ' + root.width()*.1 + ',25');
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
				$('#sectionLabel span').text('Daniel Vogelnest');
				$('#switch svg').transition({ perspective: '100px', rotateX: '0deg' }, animationDuration);
				section = 0;
			}
		} 
		else if ($(window).scrollTop() < (header.height() + projectList.height())) {
			if (section != 1) {
				$('#sectionLabel span').text('Projects');
				$('#switch svg').transition({ perspective: '100px', rotateX: '180deg' }, animationDuration);
				if (docking && (section == 0)) nav.addClass('docked');
				section = 1;
			}
		}
		else if (section != 2) {
			$('#sectionLabel span').text($('section .project-summary.selected h3').text());
			$('#switch svg').transition({ perspective: '100px', rotateX: '540deg' }, animationDuration);
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
	var clicked = false;
	var cycleTimer = setInterval(cycle, 10000);
	function cycle(){ 
		$('header .controls .active').removeClass('active');
		var current = $('header .items .active').transition({ opacity: '0' }, animationDuration);
		var next = current.data('item') + 1;
		if ($('header [data-item="'+next+'"]').length == 0) { next = 0; }
		setTimeout(function(){
			current.removeClass('active');
			if (!clicked) {
				$('header [data-item="'+next+'"]').addClass('active').filter('.item').transition({ opacity: '1' }, animationDuration);
			}
		}, animationDuration);
	}
	$('header .controls li').click(function(e){
		e.preventDefault();
		if (!$(this).hasClass('active')) {
			clicked = true;
			clearInterval(cycleTimer);
			cycleTimer = setInterval(cycle, 10000);
			$('header .controls .active').removeClass('active');
			$(this).addClass('active');
			var current = $('header .items .active').transition({ opacity: '0' }, animationDuration);
			var next = $(this).data('item');
			setTimeout(function(){
				current.removeClass('active');
				if (clicked) {
					$('header [data-item="'+next+'"]').addClass('active').filter('.item').transition({ opacity: '1' }, animationDuration);
				}
				clicked = false;
			}, animationDuration);
		}
	});
	$('.project-summary').click(function(e){
		e.preventDefault();
		$('#project').fadeIn();
		$('section .selected').removeClass('selected');
		$('section [data-item="'+$(this).data('item')+'"]').addClass('selected');
		root.animate({ scrollTop: header.height() + projectList.height() }, 500);
	});
	$('#project-list .controls li').click(function(e){
		e.preventDefault();
		$('#project-list .active').removeClass('active');
		$('#project-list [data-column="'+$(this).data('column')+'"]').addClass('active');
		$('.list-carousel').transition({ left: -$('.list-column.active').position().left });
	});
	$('#project-list .uni-control.left').click(function(e){
		e.preventDefault();
		var current = $('#project-list .active').removeClass('active');
		var next = current.data('column') - 1;
		if ($('#project-list [data-column="'+next+'"]').length == 0) { next = projectListColumns - 1; }
		$('#project-list [data-column="'+next+'"]').addClass('active');
		$('.list-carousel').transition({ left: -$('.list-column.active').position().left });
	});
	$('#project-list .uni-control.right').click(function(e){
		e.preventDefault();
		var current = $('#project-list .active').removeClass('active');
		var next = current.data('column') + 1;
		if ($('#project-list [data-column="'+next+'"]').length == 0) { next = 0; }
		$('#project-list [data-column="'+next+'"]').addClass('active');
		$('.list-carousel').transition({ left: -$('.list-column.active').position().left });
	});
});
