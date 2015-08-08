
window.onload = function(){
	//个人中心下拉菜单
	$().getClass('member_ul').hover(function(){
		// $().getClass('member').css('background', 'url(img/arrow2.png) no-repeat 70px 45%');
		$(this).css('background', 'url(img/arrow2.png) no-repeat 70px 45%');
		$().getTagName('ul').show();
	},function(){
		// $().getClass('member').css('background', 'url(img/arrow1.png) no-repeat 70px 45%');
		$(this).css('background', 'url(img/arrow1.png) no-repeat 70px 45%');
		$().getTagName('ul').hide();

	})

	//登陆框
	// var left = (document.documentElement.clientWidth - 400) / 2;
	// var top = (document.documentElement.clientHeight - 300) / 2;
	// $().getId('login').css('left', left + 'px').css('top', top + 'px');

	$().getId('login').center(400,300).onresize(function(){
		$().getId('login').center(400,300);
	});
	$().getClass('close').click(function(){
		$().getId('login').css('display', 'none');
	})
	$().getClass('login').click(function(){
		$().getId('login').css('display', 'block');
	})

}