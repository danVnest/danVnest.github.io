$(document).ready(function(){
	$("body").append('<div id="introMessage">website is in <a href="https://github.com/danVnest/website">live development</a></div>');
	$("#introMessage")
		.fadeIn(1000)
		.delay(5000)
		.fadeOut(1000, function(){ $(this).remove() });

//	$("#navigationBar")
//		.css("top", $(window).innerHeight())
//		.delay(2000)
//		.css("display", "block")
//		.animate({ top: $(window).innerHeight() - $("#navigationBar").height() }, 1000)
//		//.css({
//		//	"position" 
//	$("#face")
//		.css("bottom", $("#navigationBar").height())
//		.delay(2000)
//		.css("display", "block")
//		.animate({ left: 0 }, 1000)
});	
