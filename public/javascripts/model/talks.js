/**
 * Talks
 */

var Talks = function(selector){
	this.MAX_COUNT = 100;
	this.jqobj = $(selector);

	// restore from localStorage
	if ( !!localStorage.cache ) {
		this.jqobj.html(localStorage.cache);
	} else {
		this.jqobj.html("<dl></dl>");
	}
	// scroll to bottom
	this._scrollToBottom = function() {
		var content;
		if ( $('body').hasClass('input') ) {
			content = this.jqobj;
		} else {
			content = $('body');
		}

		content.animate({
			'scrollTop': content[0].scrollHeight,
			'scrollLeft': content[0].scrollWidth
		});
	};
	// this._scrollToBottom();

	if(!!window.Translator) {
		this.translator = new Translator();
	}
};
Talks.prototype.add = function(obj, mode){
	/** obj = {id: , ja: , en:, fix:} */

	var self = this;
	// [todo] validate name and text
	var add_ = function(obj) {
		var html_ = new Talk(obj).render();
		var output = self.jqobj;
		var item = $("#"+obj.id);

		if( item.length === 0 ){
			item = $('<div id=' + obj.id + ' class=""></div>').html(html_);
			item.addClass('animate').hide();
			output.find("dl").prepend(item);
			item.show(0, function(){
				item.removeClass('animate');

				// scroll to bottom
				// self._scrollToBottom();
			});
		} else {
			item.html(html_);
		}

		// limit item
		var items = output.find("dl>div"),
				count = items.length;
		if ( count > self.MAX_COUNT ) {
			items.slice(self.MAX_COUNT).remove();
		}

		// save to localStorage
		localStorage.cache = output.html();
	};

	add_(obj);
	if(mode !== "emitted") {
		$(self).trigger('talk', [obj]);
	}

	if(!!this.translator) switch(mode){
	case "en2ja":
		this.translator.en2ja(obj.en, function(res){
			obj.ja = res;
			add_(obj);
			$(self).trigger('talk', [obj]);
		});
		break;
	case "ja2en":
		this.translator.ja2en(obj.ja, function(res){
			obj.en = res;
			add_(obj);
			$(self).trigger('talk', [obj]);
		});
		break;
	default:
		break;
	}
};
