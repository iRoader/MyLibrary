//对象式写法
// var Base = {
// 	getId:function(id){
// 		return document.getElementById(id);
// 	},
// 	getName: function(name){
// 		return document.getElementsByName(name);
// 	},
// 	getTagName: function(tag){
// 		return document.getElementsByTagName(tag);
// 	}
// }

//函数式写法
function $(id){
	return document.getElementById(id);
}

// 使用函数式写法
// function Main(){
// 	this.elements = [];

// 	this.getId: function(id){
// 		this.elements.push(document.getElementById(id));
// 		return this;
// 	}
// }

