$(document).ready(function(){
	$("body").append('<div id="introMessage">more than words</div>');
	$("#introMessage")
		.fadeIn(1000)
		.delay(1000)
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
