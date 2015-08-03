//每次返回对象Base， 解决tags数量的冲突
var $ = function(){
	return new Base();
}

function Base(){
	//创建一个数组，用来保存获取的节点和节点数组
	this.elements = [];	
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
		if(!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))){
			this.elements[i].className += ' ' + className;
		}		
	}
	return this;
}

//移除class
Base.prototype.removeClass = function(className){
	for (var i = 0; i < this.elements.length; i++) {
		if(this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))){
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
			if (typeof this.elements[i].currentStyle != 'undefined') {
				return this.elements[i].currentStyle[attr];
			}else if(typeof window.getComputedStyle != 'undefined'){
				return window.getComputedStyle(this.elements[i], false)[attr];
			}
		}else{
			this.elements[i].style[attr] = value;
		}		
	}
	return this;
};

//添加link或style的css规则
Base.prototype.addRule = function(num, selectorText, cssText, position){
	var sheet = document.styleSheets[num];

	if(typeof sheet.insertRule != 'undefined'){		//W3C
		// sheet.insertRule('body{background:red}', 0);
		sheet.insertRule(selectorText + '{' + cssText + '}', position);
	}else if(typeof sheet.addRule != 'undefined'){		//IE
		sheet.addRule(selectorText, cssText, position);
	}
	return this;
}

//移除link或style的css规则
Base.prototype.removeRule = function (num, index) {
	var sheet = document.styleSheets[num];
	if (typeof sheet.deleteRule != 'undefined') {//W3C
		sheet.deleteRule(index);
	} else if (typeof sheet.removeRule != 'undefined') {//IE
		sheet.removeRule(index);
	}
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

Base.prototype.click = function(fn){
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].onclick = fn;
	}
	return this;
}
