
window.onload = function(){
	$().getClass('member').hover(function(){
		// $().getClass('member').css('background', 'url(img/arrow2.png) no-repeat 70px 45%');
		$(this).css('background', 'url(img/arrow2.png) no-repeat 70px 45%');
		$().getTagName('ul').show();
	},function(){
		// $().getClass('member').css('background', 'url(img/arrow1.png) no-repeat 70px 45%');
		$(this).css('background', 'url(img/arrow1.png) no-repeat 70px 45%');
		$().getTagName('ul').hide();

	})

}