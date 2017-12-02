/*
 plugin name : Coloring page
 Author		 : Najrul Ahmed
 Author Uri	 : https://www.facebook.com/najrul787
 Description : you can control your page color on onclick;
 ---------------------------------------------------------
 Structure   :
 
$(document).coloring({
	caption:'',
	default:'coloring/default.css',
	colors:{
		red:'coloring/red.css',
		green:'coloring/green.css',
		yellow:'coloring/green.css',
		indigo:'coloring/green.css',
		"#a90000":'coloring/green.css',
	}
});
 */
(function($) {
	$.fn.coloring = function(opt) {
		opt = opt || {};
		const that = $(this);
		var mainBox = '';
		var source = '';
		const options = {
			caption: opt.caption || null,
			default: opt.default || null,
			colors: opt.colors || null
		}
		// define box classes 
		const classes = {
			box: 'qcolor-box',
			toggleBtn: 'toggle',
		}
		// Box css (include style tag with css in document head)
		that.style = function() {
			let style = $('<style>');
			let head = $('head');
			let box = '.' + classes.box;
			let css = '';
			css += box + '{width: 150px;padding:4px;box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);position: absolute;top:40px;left: -150px;background: #fff!important;font-family: arial;transition: all .3s}';
			css += box + ' .' + classes.toggleBtn + '{border: 1px solid #eee;cursor:pointer;position: absolute;right: -30px;top: 0;width: 30px;height: 30px;background-color: #fff!important;line-height: 30px;}';
			css += box + ' ul{margin:0;padding:0;list-style: none;}';
			css += box + ' li{width: 23px;height: 23px;transition:all .3s;background: #eee;float: left;border:2px solid #ddd;margin: 4px;cursor: pointer;border-radius: 3px}';
			css += box + ' li:hover{border-radius:initial}';
			css += box + ' p{font-size: 14px;margin-bottom: 10px;color: #555;}';
			style.html(css);
			head.append(style);
		}
		// genaret all color list in li tag. this function return full list of color 
		that.colorList = function() {
			var _ul = $("<ul>");
			for (var color in options.colors) {
				var _li = '<li style="background:' + color + '" data-key="' + color + '"></li>';
				_ul.append(_li);
			}
			return _ul;
		}
		// This is the main template function 
		that.template = function() {
			// Elements
			var _box = $('<div>');
			var _caption = $('<p>');
			var _toggleBtn = $('<button>');
			var _source = $('<link rel="stylesheet" type="text/css">');
			// Set property
			_box.addClass(classes.box);
			_caption.html(options.caption);
			_toggleBtn.addClass(classes.toggleBtn);
			if (options.default) {
				_source.attr('href', options.default);
			}
			// Append color box
			_box.append(_caption);
			_box.append(that.colorList());
			_box.append(_toggleBtn);
			$('body').prepend(_box);
			$('head').append(_source);
			mainBox = _box;
			source = _source;
			that.style();
		}
		// Box show and hide 
		that.boxToggle = function() {
			mainBox.children('.' + classes.toggleBtn).click(function() {
				if (mainBox.css('left') === '0px') {
					mainBox.css({
						left: '-150px'
					});
				} else {
					mainBox.css({
						left: '0'
					});
				}
			});
		}
		// action list item
		that.activate = function() {
			let li = mainBox.find('[data-key]');
			li.click(function() {
				let key = $(this).data('key');
				source.attr('href', options.colors[key]);
			});
		}
		// finishing 
		that.instance = function() {
			that.template();
			that.activate();
			that.boxToggle();
		}
		that.instance();
	}
})(jQuery);
