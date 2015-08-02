//每次返回对象Base， 解决tags数量的冲突
var $ = function(){
	return new Base();
}

function Base(){
	//创建一个数组，用来保存获取的节点和节点数组
	this.elements = [];

	//获取ID节点
	this.getId = function(id){
		this.elements.push(document.getElementById(id));
		return this;
	};

	//获取元素节点
	this.getTagName = function(tag){
		var tags = document.getElementsByTagName(tag);

		for(var i = 0; i < tags.length; i++){
			this.elements.push(tags[i]);
			// alert(this.elements[i].innerHTML);
		}		
		return this;
	};
}

Base.prototype.css = function(attr, value) {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style[attr] = value;
	}
	return this;
};

Base.prototype.html = function(value){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].innerHTML = value;
	}
	return this;
}