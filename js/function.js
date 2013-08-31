$(document).ready(function(){
	$('#controls li').click(function(e){
		e.preventDefault();
		$('#controls .active').removeClass('active');
		$(this).addClass('active');
	});
	var cycleTimer = setInterval(cycle, 5000);
	function cycle(){ 
		var next = parseInt($('#controls .active').removeClass('active').attr('data-cycle-order')) + 1;
		if ($('[data-cycle-order="'+next+'"]').addClass('active').length == 0) {
			$('[data-cycle-order="0"]').addClass('active');
		}
	}
});
