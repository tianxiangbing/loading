/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * github: https://github.com/tianxiangbing/format-number
 * User: 田想兵
 * Date: 2015-08-05
 * Time: 11:27:55
 * Contact: 55342775@qq.com
 */
;
(function(root, factory) {
	//amd
	if (typeof define === 'function' && define.amd) {
		define(['$'], factory);
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	} else {
		root.Loading = factory(window.Zepto || window.jQuery || $);
	}
})(this, function($) {
	var Loading = function() {};
	Loading.prototype = {
		loadingTpl: '<div class="ui-loading"><div class="ui-loading-mask"></div><i></i></div>',
		stop: function() {
			var content = $(this.target);
			this.loading.remove();
		},
		start: function() {
			var _this = this;
			var target = _this .target;
			var content = $(target);
			var loading = this.loading;
			if (!loading) {
				loading = $(_this.loadingTpl);
				$('body').append(loading);
			}
			this.loading = loading;
			var ch = $(content).outerHeight();
			var cw = $(content).outerWidth();
			if ($(target)[0].tagName == "HTML") {
				ch = Math.max($(target).height(), $(window).height());
				cw = Math.max($(target).width(), $(window).width());
			}
			//console.log(cw,ch)
			loading.height(ch).width(cw);
			loading.find('div').height(ch).width(cw);
			if (ch < 100) {
				loading.find('i').height(ch).width(ch);
			}
			var offset = $(content).offset();
			loading.css({
				top: offset.top,
				left: offset.left
			});
			var icon = loading.find('i');
			var h = target ? ch : $(window).height()+ $(window).scrollTop();
			var w = target ? cw :  $(window).width() + $(window).scrollLeft();
			var top = (h- icon.height()) / 2;
			var left = (w - icon.width()) / 2;
			icon.css({
				top: top,
				left: left
			})
		},
		init: function(settings) {
			settings = settings || {};
			this.loadingTpl = settings.loadingTpl || this.loadingTpl;
			this.target = settings.target || 'html';
			this.bindEvent();
		},
		bindEvent: function() {
			var _this = this;
			$(this.target).on('stop', function() {
				_this.stop();
			});
		}
	}
	return Loading;
});