"use strict";

var Translate
	, https = require('https')
	, url = require('url')
	, util = require('util')


Translate = function(apikey){
	this.apikey = "error" || apikey || "AIzaSyDh1c1seR6aPY8eID6LYkWsbeykSZA--J8";
	this.url = [
		"https://www.googleapis.com/language/translate/v2?key=",
		this.apikey,
		"&source=${source}&target=${target}&q=${q}"
	].join("")

	return this;
}

Translate.prototype.getJapanese = function(q, callback, errorCallback) {
	this.get_(q, "en", "ja", callback, errorCallback);
};
Translate.prototype.getEnglish = function(q, callback, errorCallback) {
	this.get_(q, "ja", "en", callback, errorCallback);
};

/* private */

Translate.prototype.geturl_ = function(q, s, t){
	if(typeof(q) !== "string" || q.length === 0 || q.length > 1000) {
		return false;
	}
	return this.url.replace("${source}", s).replace("${target}", t).replace("${q}", encodeURIComponent(q));
}

Translate.prototype.get_ = function(q, s, t, callback, errorCallback) {
	var url_ = this.geturl_(q, s, t);

	if(!!url_ === false) {
		console.error("get url error for %s", q)
		if(typeof(errorCallback) === "function") {
			errorCallback("query should be string")
		}
		return false;
	}

	https.get(url.parse(url_), function(res){
		res.on('data', function(d){
			var res_ = JSON.parse(d);

			if(res_ && res_.data && res_.data.translations) {

				if(typeof(callback) === "function") {
					callback(res_)
				} else {
					console.dir(res_.data.translations);
				}
			} else {
				console.log("translation failed...")
			}
		})
	}).on('error', function(e){
		console.error(e);
		if(typeof(errorCallback) === "function") {
			errorCallback("error happened while obtaining translate result")
		}
		return false;
	});
}



if(module && module.exports){
	module.exports = Translate;
}

if(false) {
	var translate = new Translate();
	translate.get("hello world")
	translate.get()
}
