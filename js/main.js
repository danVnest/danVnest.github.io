$(document).ready(function(){
	var root = $('html, body');
	var header = $('header');
	var nav = $('nav');
	var list = $('#list');
	var animationDuration = 1000;

	// Preload random background image
	var maxColourID = 7;
	var colourID = Math.round(Math.random() * (maxColourID - 1)) + 1;
	$('.text-colour, .link-colour, .stroke-colour, .background-colour').attr('data-colour-id', colourID);
	var bg = '/images/backgrounds/bg' + (Math.round(Math.random() * 8) + 1) + '.jpg';
	$('<img src="' + bg + '" />').load(function() { 
		header.css('background', 'url("' + bg + '") center/cover no-repeat fixed');
		$('header .items').addClass('background-transition').removeClass('solid');
		setTimeout(function(){
			$('header .items').removeClass('background-transition');
		}, 1000);
	});

	// Structure adjustment for screen size
	var sectionHeight = $(window).innerHeight() - nav.height();
	function adjustStructure(firstTime) {
		if (firstTime) { header.height(sectionHeight*5); }
		else { header.height(sectionHeight); }
		list.height(sectionHeight);
	}
	adjustStructure(true);

	// List construction
	var listCount = $('#list .item').last().data('item') + 1;
	var listItemHeight = 140; // $('#list .item').css('height') // TODO: seems to return dramatically incorrect values
	var listHeight = sectionHeight - $('#list .intro').outerHeight() - $('#list .controls').outerHeight();
	var listRows = Math.floor(listHeight / listItemHeight);
	var listColumns = Math.ceil(listCount / listRows);
	var	listColumnsOnScreen = 0;
	function constructList() {
		if (listColumns > 1) {
			for (i = listRows; i < listCount; i += listRows) {
				$('#list .item').slice(i - listRows, i).wrapAll('<div class="column"></div>');
			}
		}
		$('#list .item').slice((listColumns - 1) * listRows).wrapAll('<div class="column"></div>');
		var windowWidth = $(window).innerWidth();
		listColumnsOnScreen = Math.floor(windowWidth / $('#list .column').outerWidth());
		if (listColumnsOnScreen == 0) {
			$('#list .column').wrap('<div class="scroller"></div>');
			$('#list .scroller').width(windowWidth);
		}
		$('#list .column').each(function(index) {
			$(this).attr('data-column', index);
			if (index % ((listColumnsOnScreen != 0) ? listColumnsOnScreen : 1) == 0) $('#list .controls ol').append('<li data-column="'+index+'"></li>');
		});
		$('#list .controls li').click(function(e){
			e.preventDefault();
			$('#list .scroller .column:not(.active)').parents('.scroller').scrollLeft(0);
			$('#list .active').removeClass('active');
			$('#list [data-column="'+$(this).data('column')+'"]').addClass('active');
			$('#list .carousel').animate({ left: -$('#list .column.active').position().left });
		});
		$('#list .column').first().addClass('active');
		$('#list .controls li').first().addClass('active');
		$('#list .carousel').animate({ left: -$('#list .column.active').position().left });
		$('#list .carousel').width($('#list .column').outerWidth() * listColumns).css('margin', (listHeight - listRows * listItemHeight)/2 + 'px 0');
	}
	function resizeList() {
		listHeight = sectionHeight - $('#list .intro').outerHeight() - $('#list .controls').outerHeight();
		var deltaY = listHeight - $('#list .carousel').height();
		var deltaX = listColumnsOnScreen - Math.floor($(window).innerWidth() / $('#list .column').outerWidth());
		if ((deltaY >= 0) && (deltaY <= listItemHeight) && (deltaX == 0)) { $('#list .carousel').css('margin', (listHeight - listRows * listItemHeight)/2 + 'px 0'); }
		else {
			listRows = Math.floor(listHeight / listItemHeight);
			listColumns = Math.ceil(listCount / listRows);
			if (listRows > 0) { 
				$('#list .scroller').contents().unwrap();
				$('#list .column').contents().unwrap();
				$('#list .controls li').remove();
				constructList();
			}
		}
	}
	constructList();

	// Nav positioning
	var section = 0;
	$(window).scroll(function(){
		if ($(window).scrollTop() < header.height()) {
			if (section != 0) {
				$('#switch svg').attr('class', 'stroke-colour');
				section = 0;
			}
		} 
		else {
			if (section != 1) {
				$('#switch svg').attr('class', 'stroke-colour up');
				section = 1;
			}
		}
	});

	// Draw SVG
	function drawSVG() {
		$('#circle-arrow').attr('d','m0,50 l' + ($('header .controls').width()*2 - root.width()*.5) + ',' + sectionHeight*.4 + ' ' + -$('header .controls').width()*.5 + ',0');
		$('#switch-arrow').attr('d','m50,15 l0,' + sectionHeight*.5 + ' ' + -root.width()*.05 + ',' + sectionHeight*.1);
		$('#intro-underline-arrow').attr('d','m' + root.width()*.35 + ',15 l' + root.width()*.3 + ',0 ' + root.width()*.05 + ',30');
	}
	drawSVG();

	// Adust notice text size
	var notice = $('#notice');
	var noticeContents = $('#notice h1');
	var noticeMaxFontSize = parseInt(noticeContents.css('font-size'));
	$('#notice .close').click(function(e){
		e.preventDefault();
		notice.animate({ opacity: 0 }, (animationDuration / 2), function() { $(this).addClass('inactive'); });
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
		if (++colourID > maxColourID) colourID = 1;
		$('.text-colour, .link-colour, .stroke-colour, .background-colour').attr('data-colour-id', colourID);
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
	$('#switch').click(function(e){
		e.preventDefault();
		if (section == 1) root.animate({ scrollTop: 0 }, 500);
		else root.animate({ scrollTop: header.height() }, 500);
	});

	// List control
	var leftFlipped = false;
	var rightFlipped = false;
	$('#list .control-arrow.left').click(function(e){
		e.preventDefault();
		$('#list .scroller .column:not(.active)').parents('.scroller').scrollLeft(0);
		var current = $('#list .active').removeClass('active');
		var next = current.data('column') - 1;
		if ($('#list [data-column="'+next+'"]').length == 0) { next = listColumns - 1; }
		$('#list [data-column="'+next+'"]').addClass('active');
		$('#list .carousel').animate({ left: -$('#list .column.active').position().left });
		if (leftFlipped) $('#list .control-arrow.left svg').attr('class', 'stroke-colour');	
		else $('#list .control-arrow.left svg').attr('class', 'stroke-colour flipped');
		leftFlipped ^= 1;
	});
	$('#list .control-arrow.right').click(function(e){
		e.preventDefault();
		$('#list .scroller .column:not(.active)').parents('.scroller').scrollLeft(0);
		var current = $('#list .active').removeClass('active');
		var next = current.data('column') + 1;
		if ($('#list [data-column="'+next+'"]').length == 0) { next = 0; }
		$('#list [data-column="'+next+'"]').addClass('active');
		$('#list .carousel').animate({ left: -$('#list .column.active').position().left });
		if (rightFlipped) $('#list .control-arrow.right svg').attr('class', 'stroke-colour');	
		else $('#list .control-arrow.right svg').attr('class', 'stroke-colour flipped');
		rightFlipped ^= 1;
	});

	// Resize adjustment
	$(window).resize(function(){
		sectionHeight = $(window).innerHeight() - nav.height();
		adjustStructure(false);
		drawSVG();
		resizeNotice();
		resizeList();
		$(window).scrollTop(sectionHeight * section);
	});
});

$(window).on('beforeunload', function() { $(window).scrollTop(0); });
