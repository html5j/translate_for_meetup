/**
 * Talk
 */
var Talk;
(function(){
	var getTimestamp_ = function(){
		var d = new Date()
			,ret = "";

		ret = d.getFullYear()+"/"+(d.getMonth() + 1)+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()

		return ret;
	}

	Talk = function(obj){
		this.id = obj.id; this.name = obj.name; this.ja = obj.ja; this.en = obj.en; this.fix = obj.fix;
	}

	Talk.prototype.render = function(){
		var template_trans_ = [
			"<dt>${name}</dt>",
			"<dd>",
			"<p class='ja'>${ja}</p>",
			"<p class='en'>${en}</p>",
			"<p><time>${timestamp}</time></p>",
			"</dd>"
		].join("")

		var template_fix_ = [
			"<dt>${name}</dt>",
			"<dd>",
			"<p class='fix'>${fix}</p>",
			"<p><time>${timestamp}</time></p>",
			"</dd>"
		].join("")

		var timestamp_ = getTimestamp_(); 

		if(!!this.fix) {
			return template_fix_
				.replace("${name}", this.name)
				.replace("${fix}", this.fix)
				.replace("${timestamp}", timestamp_)
		} else if(!!this.ja || !!this.en) {
			var en_ = !!this.en ? this.en : "....."
				, ja_ = !!this.ja ? this.ja : "。。。。。"

			return template_trans_
				.replace("${name}", this.name)
				.replace("${ja}", ja_)
				.replace("${en}", en_)
				.replace("${timestamp}", timestamp_)
		} else {
			return "";
		}
	}
}());
