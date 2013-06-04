/**
 * trans_mode.js
 *
 * Class definition of TransMode
 * it manages translation mode, ja-to-en, en-to-ja, none.
 */

var TransMode;

(function(){
	var _JA2EN = 0
		, _EN2JA = 1
		, _NONE = 2;

	var _TEMPLATE = [
		"<input type='radio' name='mode' value='en2ja'>E-to-J ",
		"<input type='radio' name='mode' value='ja2en'>J-to-E ",
		"<input type='radio' name='mode' value='none'>not translate"
	].join("")

	/** constructor */
	TransMode = function(){
		this.mode = _EN2JA; // default is english to japanese.
	}	

	/** set modes */
	TransMode.prototype.set_ja2en = function(){
		this.mode = _JA2EN;
	}
	TransMode.prototype.set_en2ja = function(){
		this.mode = _EN2JA;
	}
	TransMode.prototype.set_none = function(){
		this.mode = _NONE;
	}

	/** get current mode */
	TransMode.prototype.get = function(){
		var ret_;
		switch(this.mode){
		case _JA2EN:
			ret_ = "ja2en";
			break;
		case _EN2JA:
			ret_ = "en2ja";
			break;
		case _NONE:
			ret_ = "none";
			break;
		default:
			ret_ = "";
		}
		return ret_;
	}

	/** rendering */
	TransMode.prototype.render = function(elem) {
		this.elem = elem;
		$(elem).html(_TEMPLATE);
		$(elem).find("input[value=en2ja]").attr("checked", "checked")

		this._setHandler();
	}

	/** setHandler */
	TransMode.prototype._setHandler = function(){
		var self = this;
		$(this.elem).find("input[name=mode]").on("click", function(e){
			var mode_ = $(this).val();
			switch(mode_){
			case "ja2en":
				self.set_ja2en();
				break;
			case "en2ja":
				self.set_en2ja();
				break;
			case "none":
				self.set_none();
				break;
			default:
				self.set_ja2en();
			}
			console.log(self.get());
		});
	}

}())