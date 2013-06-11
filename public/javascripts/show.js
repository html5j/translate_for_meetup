var Show = function(selector) {
	this.$ = $(selector)
	if(this.$.length === 0) return false;
}

Show.prototype.render = function(date){
	$.getJSON('/archive/'+date, function(data){
		console.dir(data)
		this.render_(data)
	}.bind(this))
}

Show.prototype.render_ = function(data){
	var $dl = $("<dl class='dl-horizontal'>").appendTo(this.$)

	var put_ = function($_, log_) {
		$_.empty();
		$("<dt>").text(log_.name).appendTo($_);

		var $dd = $("<dd>")

		if(!!log_.fix) {
			$("<div class=fix>").html(log_.fix).appendTo($dd)
		} else {
			$("<div class=en>").html(log_.en).appendTo($dd)
			$("<div class=ja>").html(log_.ja).appendTo($dd)
		}
		$("<div class=date>").css("text-align", "right").text(log_.timestamp).appendTo($dd)
		$dd.appendTo($_)
	}

	for(var i = 0; data[i]; i++) {
		var line = data[i];

		if(line.level === 6 /* INFO */) {
			var log_ = JSON.parse(line.msg)
			log_.timestamp = line.date
			if(log_.name.indexOf("bot") !== 0) {
				var $div;
				if($("#"+log_.id).length === 0) {
					$div = $("<div class='log'>").attr("id", log_.id).appendTo($dl)
				} else {
					$div = $("#"+log_.id)
				}
				put_($div, log_)
			}
		}
	}

}
