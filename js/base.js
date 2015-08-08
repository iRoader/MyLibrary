//每次返回对象Base， 解决tags数量的冲突
var $ = function(_this){
	return new Base(_this);
}

function Base(_this){
	//创建一个数组，用来保存获取的节点和节点数组
	this.elements = [];	
	if(_this != undefined){		//注意：_this是一个对象，undefined也是一个对象，区别于typeof带单引号的undefined
		this.elements[0] = _this;
	}
}

//获取ID节点
Base.prototype.getId = function(id){
	this.elements.push(document.getElementById(id));
	return this;
};

//获取元素节点
Base.prototype.getTagName = function(tag){
	var tags = document.getElementsByTagName(tag);

	for(var i = 0; i < tags.length; i++){
		this.elements.push(tags[i]);
		// alert(this.elements[i].innerHTML);
	}		
	return this;
};

//获取class节点
Base.prototype.getClass = function(className, idName){
	var node = null;
	if(arguments.length == 2){
		node = document.getElementById(idName);
	}else{
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for(var i = 0; i < all.length; i++){
		if (all[i].className == className) {
			this.elements.push(all[i]);
		}
	}
	return this;
}

//添加class
Base.prototype.addClass = function(className){
	for (var i = 0; i < this.elements.length; i++) {
		if(!hasClass(this.elements[i], className)){
			this.elements[i].className += ' ' + className;
		}		
	}
	return this;
}

//移除class
Base.prototype.removeClass = function(className){
	for (var i = 0; i < this.elements.length; i++) {
		if(hasClass(this.elements[i], className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), '');
		}
	}
	return this;
}

//获取节点数组的某一个
Base.prototype.getElement = function(num){
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}

//封装css方法
Base.prototype.css = function(attr, value) {
	for (var i = 0; i < this.elements.length; i++) {
		if (arguments.length == 1) {
			return getStyle(this.elements[i], attr);
		}else{
			this.elements[i].style[attr] = value;
		}
	}
	return this;
}

//添加link或style的css规则
Base.prototype.addRule = function(num, selectorText, cssText, position){
	var sheet = document.styleSheets[num];
	insertRule(sheet, selectorText, cssText, position);	
	return this;
}

//移除link或style的css规则
Base.prototype.removeRule = function (num, index) {
	var sheet = document.styleSheets[num];
	deleteRule(sheet, index);
	return this;
}

//设置innerHTML
Base.prototype.html = function(value){	
	for(var i = 0; i < this.elements.length; i++){
		if (arguments.length == 0) {				//判断没有参数
			return this.elements[i].innerHTML;		//返回内容
		}else{
			this.elements[i].innerHTML = value;
		}		
	}
	return this;
};

//触发点击事件
Base.prototype.click = function(fn){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].onclick = fn;
	}
	return this;
}

//设置鼠标移入移出事件
Base.prototype.hover = function(over, out){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
	return this;
}

//设置显示
Base.prototype.show = function(fn){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = "block";
	}
	return this;
}

//设置隐藏
Base.prototype.hide = function(fn){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = "none";
	}
	return this;
}

//设置盒子居中显示
Base.prototype.center = function(width, height){
	var left = (getInner().width - width) / 2;
	var top = (getInner().height - height) / 2;

	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.left = left + 'px';
		this.elements[i].style.top = top + 'px';

	}
	return this;
}

//改变浏览器大小
Base.prototype.onresize = function(fn){
	for (var i = 0; i < this.elements.length; i++) {
		var element = this.elements[i];
		window.onresize = function(){
			fn();
			if(element.offsetLeft > getInner().width - element.offsetWidth){
				element.style.left = getInner().width - element.offsetWidth + 'px';
			}
			if(element.offsetTop > getInner().height - element.offsetWidth){
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}

		};
	}

	

	return this;
}

//锁屏功能
Base.prototype.lock = function(){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.width = getInner().width + 'px';
		this.elements[i].style.height = getInner().height + 'px';

		this.elements[i].style.display = 'block';
	}
	return this;
}

Base.prototype.unlock = function(){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'none';
	}
	return this;
}


//拖拽功能
Base.prototype.drag = function(element){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].onmousedown = function(e){
			getEvent(e);
			var _this = this;

			var difX = e.clientX - _this.offsetLeft;
			var difY = e.clientY - _this.offsetTop;

			document.onmousemove = function(e){
				getEvent(e);
				var left = e.clientX - difX;
				var top = e.clientY - difY;

				if(left < 0){
					left = 0;
				}else if(left > getInner().width - _this.offsetWidth){
					left = getInner().width - _this.offsetWidth;
				}

				if(top < 0){
					top = 0;
				}else if(top > getInner().height - _this.offsetHeight){
					top = getInner().height - _this.offsetHeight;
				}

				_this.style.left = left + 'px';
				_this.style.top = top + 'px';
			}

			document.onmouseup = function(){
				this.onmousemove = null;
				this.onmouseup = null;
			}
		}
	}
	return this;
	
}