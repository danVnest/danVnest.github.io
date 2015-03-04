$(document).ready(function(){
	var root = $('html, body');
	var header = $('header');
	var nav = $('nav');
	var projectList = $('#project-list');
	var project = $('#project');
	var animationDuration = 1000;

	// Preload random background image
	var bg = '/images/bg' + (Math.round(Math.random() * 8) + 1) + '.jpg';
	$('<img src="' + bg + '" />').load(function() { 
		header.css('background', 'url("' + bg + '") no-repeat center center fixed');
		$('header .items').removeClass('solid');
	});

	// Structure adjustment for screen size
	var sectionHeight = $(window).innerHeight() - nav.height();
	function adjustStructure(firstTime) {
		if (firstTime) { header.height(sectionHeight*5); }
		else { header.height(sectionHeight); }
		projectList.height(sectionHeight);
		project.height(sectionHeight);
	}
	adjustStructure(true);

	// Project list construction
	var projectListCount = $('#project-list .item').last().data('item') + 1;
	var projectListItemHeight = 140; // $('#project-list .item').css('height') // TODO: seems to return dramitcally incorrect values
	var projectListHeight = sectionHeight - $('#project-list .intro').outerHeight() - $('#project-list .controls').outerHeight();
	var projectListRows = Math.floor(projectListHeight / projectListItemHeight);
	var projectListColumns = Math.ceil(projectListCount / projectListRows);
	function constructProjectList() {
		if (projectListColumns > 1) {
			for (i = projectListRows; i < projectListCount; i += projectListRows) {
				$('#project-list .item').slice(i - projectListRows, i).wrapAll('<div class="column"></div>');
			}
		}
		$('#project-list .item').slice((projectListColumns - 1) * projectListRows).wrapAll('<div class="column"></div>');
		$('#project-list .column').each(function(index) {
			$(this).attr('data-column', index);
			$('#project-list .controls ol').append('<li data-column="'+index+'"></li>');
		});
		$('#project-list .controls li').click(function(e){
			e.preventDefault();
			$('#project-list .active').removeClass('active');
			$('#project-list [data-column="'+$(this).data('column')+'"]').addClass('active');
			$('#project-list .carousel').animate({ left: -$('#project-list .column.active').position().left });
		});
		$('#project-list .column').first().addClass('active');
		$('#project-list .controls li').first().addClass('active');
		$('#project-list .carousel').animate({ left: -$('#project-list .column.active').position().left });
		$('#project-list .carousel').width($('#project-list .column').outerWidth() * projectListColumns).css('margin', (projectListHeight - projectListRows * projectListItemHeight)/2 + 'px 0');
	}
	function resizeProjectList() {
		projectListHeight = sectionHeight - $('#project-list .intro').outerHeight() - $('#project-list .controls').outerHeight();
		var delta = projectListHeight - $('#project-list .carousel').height();
		if ((delta >= 0) && (delta <= projectListItemHeight)) { $('#project-list .carousel').css('margin', (projectListHeight - projectListRows * projectListItemHeight)/2 + 'px 0'); }
		else {
			projectListRows = Math.floor(projectListHeight / projectListItemHeight);
			projectListColumns = Math.ceil(projectListCount / projectListRows);
			$('#project-list .column').contents().unwrap();
			$('#project-list .controls li').remove();
			constructProjectList();
		}
	}
	constructProjectList();

	// Nav positioning
	var docking = false;
	if (!window.getComputedStyle(document.querySelector('.sticky')).position.match('sticky')){
		nav.removeClass('sticky');
		docking = true;
	}
	var section = 0;
	$(window).scroll(function(){
		if ($(window).scrollTop() < header.height()) {
			if (section != 0) {
				if (docking) nav.removeClass('docked');
				$('#sectionLabel span').text('Daniel Vogelnest');
				$('#switch svg').attr('class', '');
				section = 0;
			}
		} 
		else if ($(window).scrollTop() < (header.height() + projectList.height())) {
			if (section != 1) {
				$('#sectionLabel span').text('Projects');
				$('#switch svg').attr('class', 'up');
				if (docking && (section == 0)) nav.addClass('docked');
				section = 1;
			}
		}
		else if (section != 2) {
			$('#sectionLabel span').text($('#project-list .item.selected h3').text());
			$('#switch svg').attr('class', 'flipped');
			section = 2;
		}
	});

	// Draw SVG
	function drawSVG() {
		$('#circle-arrow').attr('d','m20,30 q0,' + sectionHeight*.3 + ' ' + -root.width()*.5 + ',' + sectionHeight*.4);
		$('#switch-arrow').attr('d','m20,30 q' + root.width()*.1 + ',' + sectionHeight*.2 + ' ' + -root.width()*.2 + ',' + sectionHeight*.55);
		$('#search-arrow').attr('d','m20,30 q' + root.width()*.1 + ',' + sectionHeight*.2 + ' ' + root.width()*.2 + ',' + sectionHeight*.5);
		$('#search-arrow2').attr('d','m10,15 q' + root.width()*.2 + ',20 ' + root.width()*.2 + ',-30');
		$('#project-arrow').attr('d','m10,15 q' + root.width()*.1 + ',-10 ' + root.width()*.1 + ',25');
	}
	drawSVG();

	// Adust notice text size
	var notice = $('#notice');
	var noticeContents = $('#notice h1');
	var noticeMaxFontSize = parseInt(noticeContents.css('font-size'));
	$('#notice .close').click(function(e){
		e.preventDefault();
		notice.animate({ opacity: 0 }, (animationDuration / 2), function() { $(this).remove(); });
	});
	function resizeNotice() {
		while ((noticeContents.outerWidth() < notice.width()) && (parseInt(noticeContents.css('font-size')) < noticeMaxFontSize)) {
			noticeContents.css({
				'font-size': parseInt(noticeContents.css('font-size')) + 1,
				'padding': parseFloat(noticeContents.css('padding')) - 0.5
			});
		}
		while (noticeContents.outerWidth() > notice.width()) {
			noticeContents.css({
				'font-size': parseInt(noticeContents.css('font-size')) - 1,
				'padding': parseFloat(noticeContents.css('padding')) + 0.5
			});
		}
	}
	resizeNotice();

	// Email obfuscation
	var name = 'daniel.vogelnest';
	var domain = 'me.com';
	$('.email').attr('href', 'mailto:' + name + '@' + domain).text(name + '@' + domain);

	// Header control
	header.animate({ height: sectionHeight }, animationDuration);
	setTimeout(function(){ $('header [data-item="0"]').addClass('active').filter('.item').animate({ opacity: '1' }, animationDuration); }, animationDuration);
	var intervalLength = 10000;
	var clicked = false;
	var cycleTimer = setInterval(cycle, intervalLength);
	function cycle(){ 
		$('header .controls .active').removeClass('active');
		var current = $('header .items .active').animate({ opacity: '0' }, animationDuration);
		var next = current.data('item') + 1;
		if ($('header [data-item="'+next+'"]').length == 0) { next = 0; }
		setTimeout(function(){
			current.removeClass('active');
			if (!clicked) {
				$('header [data-item="'+next+'"]').addClass('active').filter('.item').animate({ opacity: '1' }, animationDuration);
			}
		}, animationDuration);
	}
	$('header .controls li').click(function(e){
		e.preventDefault();
		if (!$(this).hasClass('active')) {
			clicked = true;
			clearInterval(cycleTimer);
			cycleTimer = setInterval(cycle, intervalLength);
			$('header .controls .active').removeClass('active');
			$(this).addClass('active');
			var current = $('header .items .active').animate({ opacity: '0' }, animationDuration);
			var next = $(this).data('item');
			setTimeout(function(){
				current.removeClass('active');
				if (clicked) {
					$('header [data-item="'+next+'"]').addClass('active').filter('.item').animate({ opacity: '1' }, animationDuration);
				}
				clicked = false;
			}, animationDuration);
		}
	});

	// Nav control 
	var searchWidthInit = $('#search').innerWidth();
	$('#switch').click(function(e){
		e.preventDefault();
		if (section == 1) root.animate({ scrollTop: 0 }, 500);
		else root.animate({ scrollTop: header.height() }, 500);
	});
	$('#search div').focusin(function() {
		root.animate({ scrollTop: header.height() }, 500);
		var searchWidth = $(window).innerWidth();
		$('#search').animate({ width: (searchWidth - 10) }); 
		$('#sectionLabel, #switch').animate({ opacity: 0 });
		$('#search .cancel').animate({ opacity: 1 });
	});
	$('#search div').focusout(function() {
		$('#search').animate({ width: searchWidthInit }); 
		$('#sectionLabel, #switch').animate({ opacity: 1 });
		$('#search .cancel').animate({ opacity: 0 });
	});

	// Project list control
	$('#project-list .item').click(function(e){
		e.preventDefault();
		$('#project').fadeIn();
		$('section .selected').removeClass('selected');
		$('section [data-item="'+$(this).data('item')+'"]').addClass('selected');
		root.animate({ scrollTop: header.height() + projectList.height() }, 500);
	});
	$('#project-list .control-arrow.left').click(function(e){
		e.preventDefault();
		var current = $('#project-list .active').removeClass('active');
		var next = current.data('column') - 1;
		if ($('#project-list [data-column="'+next+'"]').length == 0) { next = projectListColumns - 1; }
		$('#project-list [data-column="'+next+'"]').addClass('active');
		$('#project-list .carousel').animate({ left: -$('#project-list .column.active').position().left });
	});
	$('#project-list .control-arrow.right').click(function(e){
		e.preventDefault();
		var current = $('#project-list .active').removeClass('active');
		var next = current.data('column') + 1;
		if ($('#project-list [data-column="'+next+'"]').length == 0) { next = 0; }
		$('#project-list [data-column="'+next+'"]').addClass('active');
		$('#project-list .carousel').animate({ left: -$('#project-list .column.active').position().left });
	});

	// Resize adjustment
	$(window).resize(function(){
		sectionHeight = $(window).innerHeight() - nav.height();
		adjustStructure(false);
		drawSVG();
		resizeNotice();
		resizeProjectList();
		$(window).scrollTop(sectionHeight * section);
	});
});

$(window).on('beforeunload', function() { $(window).scrollTop(0); });
