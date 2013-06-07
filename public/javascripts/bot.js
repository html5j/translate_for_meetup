/**
 * bot.js
 *
 */

var Bot;

(function(){
	var uuid_ = function(){
	    var S4 = function() {
	        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    }
	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4() +S4());
	};

	// constructor
	Bot = function(selector){
		this.$ = $(selector);
		this.timer = null;
		this.curr = 0;
		this.INTERVAL = 1000;
		this.NAME = "bot ;-)";

		this.socket = io.connect();
		this.texts = !!localStorage.bot_texts ? JSON.parse(localStorage.bot_texts) : ['test', 'test2'];

		this.render();
	}

	Bot.prototype.add = function(text){
		text = !!text ? text : "new words..."
		this.texts.push(text)
		this.save();
		this.render();
	}

	Bot.prototype.update = function($obj){
		var id = $obj.data("id")
			, text = $obj.text();

		this.texts[id] = text;
		this.save();
	}
	Bot.prototype.remove = function(id){
		if(this.texts.length > 0 && id <= this.texts.length) {
			this.texts.splice(id,1)
			this.save();
			this.render();
		}

	}

	Bot.prototype.save = function(){
		localStorage.bot_texts = JSON.stringify(this.texts)
	}

	Bot.prototype.start = function(){
		if(!!this.timer){
			clearInterval(this.timer);
			this.timer = null;
		}
		if(this.texts.length === 0) return;

		var closure_ = function(){
			this.send(this.texts[this.curr])
			this.curr = (this.curr + 1) % this.texts.length;
		}.bind(this)

		this.timer = setInterval(closure_, this.getInterval_())
		closure_();
	}

	Bot.prototype.send = function(text){
		var obj = {"id": uuid_(), "name": this.NAME, ja: null, en: null, fix: text}
		this.socket.emit("talk", obj)
	}
	Bot.prototype.pause = function(){
		if(!!this.timer === false) {
			return;
		}

		clearInterval(this.timer);
		this.timer = null;
	}

	Bot.prototype.render = function(){
		// initialize
		this.$.empty();
		var self = this;

		// add border
		$("<hr>").appendTo(this.$);
		$("<div>").text("Free text").appendTo(this.$);

		// free form to send
		var $form = $("<form>").appendTo("<div>").appendTo(this.$)

		$("<input>").attr({"type": "text", "placeholder": "free text to send"})
			.css({"width": "640px"})
			.val(!!localStorage.bot_free ? localStorage.bot_free : "")
			.appendTo($form)
		$("<button>").attr("type", "submit").css("font-size", "1.5em").text("send").appendTo($form)

		$form.on("submit", function(ev){
			var text = $(this).find("input").val();
			localStorage.bot_free = text;
			self.send(text)
			ev.preventDefault();
		});

		// add border
		$("<hr>").appendTo(this.$);
		$("<div>").text("rotate texts").appendTo(this.$);

		// add new button
		$("<button>").text("new").css("font-size", "1.5em").appendTo(this.$)
			.on("click", function(ev){
				self.add()
			})

		// add start/stop button
		var $interval = $("<input>").val(3000).appendTo(this.$)
		this.getInterval_ = function(){
			var interval_ = parseInt($interval.val());
			return !!interval_ ? interval_ : this.INTERVAL;
		}.bind(this);

		$("<button>").text("start").data("op", "start").css("font-size", "1.5em").appendTo(this.$)
			.on("click", function(ev){
				var $_ = $(this);
				var op_ = $_.data("op");

				self[op_]();

				$interval.attr("readonly", op_ === "start"? "readonly": false)

				$_.text(op_ === "start" ? "pause" : "start")
					.css("color", op_ === "start" ? "#f00" : "#000")
					.data("op", op_ === "start" ? "pause" : "start")
			})
		// add list for displaying texts
		var $ol = $("<ul>").css("list-style", "none").appendTo(this.$);

		for(var i = 0, l = this.texts.length; i < l; i++){
			var text = this.texts[i]
			var $li = $("<li>").appendTo($ol)
			// text list
			$("<div>")
				.appendTo($li)
				.text(text)
				.css({"float": "left", 
					"width": "640px", 
					"margin": "2px 0", 
					"padding": "2px",
					"border": "1px solid gray"})
				.addClass("text")
				.attr({"data-id": i, "contenteditable": true})
				.on("keydown", function(ev){
					if(ev.keyCode === 13) {
						$(this).blur();
						self.update($(this));
						ev.preventDefault();
					}
				})
			// button to remove
			$("<button>")
				.attr("data-id", i)
				.appendTo("<div>")
				.appendTo($li)
				.text("x")
				.on("click", function(ev){
					self.remove($(this).data("id"))
				})
			// clearfix
			$("<div>").appendTo($li).css("clear", "both")
		}

	}
}())
