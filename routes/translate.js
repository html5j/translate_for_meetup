var Translate = require('../model/translate')
	, translate = new Translate();


exports.en2ja = function(req, res){
	var q = req.params.q;
	res.charset = "utf-8"
	translate.getJapanese(q, function(data){
		res.type('text/plain').send(data.data.translations[0].translatedText)
	}, function(text){
		res.status(403).type('text/plain').send(text)
	})
}

exports.ja2en = function(req, res){
	var q = req.params.q;
	res.charset = "utf-8"
	translate.getEnglish(q, function(data){
		res.type('text/plain').send(data.data.translations[0].translatedText)
	}, function(text){
		res.status(403).type('text/plain').send(text)
	})
}