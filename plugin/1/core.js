
window.$ = function(){
	return new Base();
}
//核心库
function Base(){
	this.elements = [];
}
//getId
Base.prototype.getId = function(id){
	var element = document.getElementById(id);
	this.elements.push(element)
	return this;
}
//getName
Base.prototype.getName = function(name){
	var elements = document.getElementsByName(name);
	for(var i = 0; i < elements.length; i++){
		this.elements.push(elements[i]);
	}
	return this;
}
//getTagName
Base.prototype.getTagName = function(tag){
	var elements = document.getElementsByTagName(tag);
	for(var i = 0; i < elements.length; i++){
		this.elements.push(elements[i]);
	}
	return this;
}
/**
	1.getComputedStyle style

	2.document.defaultView&&document.defaultView.getComputedStyle
	iframe https://github.com/jquery/jquery/pull/524
	
	3.element.currentStyle
	
	4.

 **/
Base.prototype.css = function(attr,value){
	for(var i = 0; i < this.elements.length; i++){
		if(!arguments.length){
			if(typeof window.getComputedStyle != 'undefined'){
				return getComputedStyle(this.elements[i],null)[attr];
			}else if(typeof this.elements[i].currentStyle != 'undefined'){
				return this.elements[i].currentStyle[attr];
			}
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}
//html
Base.prototype.html = function(html){
	for(var i = 0; i < this.elements.length; i++){
		if(!arguments.length){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = html;
	}
	return this;
}
//text
Base.prototype.text = function(text){
	for(var i = 0; i < this.elements.length; i++){
		if(!arguments.length){
			return this.elements[i].innerText;
		}
		this.elements[i].innerText = text;
	}
	return this;
}








