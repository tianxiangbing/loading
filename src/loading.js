/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * github: https://github.com/tianxiangbing/loading
 * User: 田想兵
 * Date: 2015-08-05
 * Time: 11:27:55
 * Contact: 55342775@qq.com
 * desc:请尽量使用github上的代码，会修复一些问题，关注https://github.com/tianxiangbing/loading
 */
;
(function (root, factory) {
	//amd
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') { //umd
		module.exports = factory($);
	} else {
		root.Loading = factory(window.Zepto || window.jQuery || $);
	}
})(window, function ($) {
	var Loading = function () { };
	Loading.prototype = {
		loadingTpl: '<div class="ui-loading"><div class="ui-loading-mask"></div><i></i></div>',
		stop: function () {
			this.loading.remove();
			this.loading = null;
		},
		start: function () {
			var _this = this;
			var loading = this.loading;
			if (!loading) {
				loading = $(_this.loadingTpl);
				$('body').append(loading);
			}
			this.loading = loading;
			//console.log(cw,ch)
			this.setPosition();
		},
		setPosition: function () {
			var _this = this;
			var loading = this.loading;
			var target = _this.target;
			var content = $(target);
			var ch = $(content).outerHeight();
			var cw = $(content).outerWidth();
			if ($(target)[0].tagName == "HTML") {
				ch = Math.max($(target).height(), $(window).height());
				cw = Math.max($(target).width(), $(window).width());
			}
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
			var h = ch,
				w = cw,
				top = 0,
				left = 0;
			if ($(target)[0].tagName == "HTML") {
				h = $(window).height();
				w = $(window).width();
				top = (h - icon.height()) / 2 + $(window).scrollTop();
				left = (w - icon.width()) / 2 + $(window).scrollLeft();
			} else {
				top = (h - icon.height()) / 2;
				left = (w - icon.width()) / 2;
			}
			icon.css({
				top: top,
				left: left
			})
		},
		init: function (settings) {
			settings = settings || {};
			this.loadingTpl = settings.loadingTpl || this.loadingTpl;
			this.target = settings.target || 'html';
			this.bindEvent();
		},
		bindEvent: function () {
			var _this = this;
			$(this.target).on('stop', function () {
				_this.stop();
			});
			$(window).on('resize', function () {
				_this.loading && _this.setPosition();
			});
		}
	}
	return Loading;
});