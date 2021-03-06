(function(window,undefined){
/**
	action:'POP',
	block:()=>{},
	createHref:()=>{},
	go:()=>{},
	goBack:()=>{},
	goForward:()=>{},
	length:3,
	Listen:()=>{},
	location:{
		hash:"",
		pathname:"/host?from=xx",
		state:undefined
	},
	push:()=>{},
	replace:()=>{}
 **/

function noop(){

}
function cNoop(){
	console.log('需要子类去实现的方法');
}
function createHistory(){
//创建history的抽象类
	var options = arguments.length <= 0 || 
				  arguments[0] === undefined 
					? {} 
					: arguments[0];
  	var getCurrentLocation = options.getCurrentLocation;
	
	function listenBefore(){

	}
	function updateLocation(newLocation){
		//缓存location
		//计算新的location,更新所有的callbacks函数
		//PUSH REPLACE的特性处理
		location = newLocation;
		changeListeners.forEach(function(listener){
			listener(location);
		})
	}
/**
 *	listen
 *	观察者中的add
 **/
 	var allKeys = [];
 	var changeListeners = [];
 	var location = undefined;
	function listen(listener){
		//1.添加当前的callback到全局的数组中
		//2.立即更用当前的locaion更新callback函数（没有初始化）
		//3.返回排除当前函数的剩余callbacks作为unlisten，如果
		//调用unlisten当前的全局数组将被重置为排除当前listener的
		//数组
		changeListeners.push(listen);
		if(location){
			//没有缓存过location
			listener(location);
		}else{
			//hash、brower history获取的方式不同
			//通过参数传递进来获取计算location的方式
			var _location = getCurrentLocation();
			allKeys = [_location.key];
      		updateLocation(_location);
		}

		return function(){
			//过滤掉当前的listener
			changeListeners = changeListeners.filter(function(item){
				return item !== listener;
			});
		}
	}
	function transitionTo(){

	}
	function push(){

	}
	function replace(){

	}
	function go(){

	}
	function goBack(){

	}
	function goForward(){

	}
	function createKey(){

	}
	function createPath(){

	}
	function createHref(){

	}
	function createLocation(){

	}


	return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,

	    setState:cNoop,
	    registerTransitionHook:cNoop,
	    unregisterTransitionHook:cNoop,
	    pushState:cNoop,
	    replaceState:cNoop
  };
}
function createDOMHistory(){
	//创建DOMhistory的抽象方法
}
function createHashHistory(){
/**
 * 	创建一个history对象
 **/
	var history = createDOMHistory();
	function getCurrentLocation(){
		
	}
/**
 *	listen
 *	@param listener {Function}
 *	@return unlisten {Function}
 *	listener 
 *	@param location, action
 **/
	function listen(listener){

		var unlisten = history.listen(listener);

		return function(){
			//unlisten
			unlisten();
		}
	}



}







})(window);