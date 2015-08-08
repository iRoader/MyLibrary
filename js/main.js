
window.onload = function(){

	//个人中心下拉菜单
	$().getClass('member_ul').hover(function(){
		$(this).css('background', 'url(img/arrow2.png) no-repeat 70px 45%');
		$().getTagName('ul').show();
	},function(){
		$(this).css('background', 'url(img/arrow1.png) no-repeat 70px 45%');
		$().getTagName('ul').hide();

	})

	//登陆框弹出
	var login = $().getId('login');
	var screen = $().getClass('screen');
	login.center(400,300).addClass('a').removeClass('a');

	$().onresize(function(){
		login.center(400,300);
		screen.lock();

	});

	$().getClass('login').click(function(){
		login.css('display', 'block');
		// $().getClass('screen').css('display', 'block');
		screen.lock();
	});

	$().getClass('close').click(function(){
		login.css('display', 'none');
		// $().getClass('screen').css('display', 'none');
		screen.unlock();

	});

	// $().addRule(0, 'html', 'font-size: 200px', 0);
	// $().removeRule(0);
	// $().removeRule(0);

}