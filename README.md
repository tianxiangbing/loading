# loading
loading...
效果图如下：
![loading](example/loading.jpg)

**[DEMO请点击这里查看.](http://www.lovewebgames.com/jsmodule/loading.html "loading demo")**

[https://github.com/tianxiangbing/network](network)有对loading作一个完美的演示

# 调用示例
html:

	<p>
		<input type="button" id="loading1" value="loading我自己">
		<input type="button" id="loading2" value="loading下面这个div">
		<input type="button" id="loading3" value="loading全屏">
	</p>
	<div id="loading-content" style="width:300px;height:200px;border:1px solid #ccc;background-color:#f2f2f2;">这是个内容的例子</div>
	<script src="../src/jquery-1.11.2.js"></script>
	<script src="../src/loading.js"></script>
js:

	//loading我自己
	$('#loading1').click(function(){
		var load = new Loading();
		load.init({
			target: this
		});
		load.start();
		setTimeout(function() {
			load.stop();
		}, 3000)
	});
	//loading下面这个div
	$('#loading2').click(function(){
		var load = new Loading();
		load.init({
			target: "#loading-content"
		});
		load.start();
		setTimeout(function() {
			load.stop();
		}, 3000)
	});
	//loading全屏
	$('#loading3').click(function(){
		var load = new Loading();
		load.init();
		load.start();
		setTimeout(function() {
			load.stop();
		}, 30000)
	});
# API
## 属性
### target:string||dom
	需要显示loading的节点，不传值时显示全屏的loading
## 方法
### start:function()
	开始loading
### stop:function()
	结束loading,这里会销毁loading节点
## 事件
### stop
	target的stop事件触发时，结束loading. 如
	$('html').trigger('stop')会结束全屏的loading动画.
