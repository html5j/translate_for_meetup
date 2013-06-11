/*
 * GET home page.
 */

var Log = require('log')
	, fs = require('fs')

var metas = {
		"20130608" : {
			"title": "W3C Developer Meetup Tokyo 2013",
			"link": "http://www.w3.org/2013/06/meetup-Tokyo"
		}
	}

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
}

exports.bot = function(req, res){
  res.render('bot', { title: 'Bot' });
}

exports.readonly = function(req, res){
  res.render('readonly', { title: 'Express' });
};

exports.show = function(req, res){
	var date_ = req.params.date;

	if(metas.hasOwnProperty(date_)) {
		res.render('show', {date: date_, meta: metas[date_]})
	} else {
		res.status(404).end("not found")
	}
}

exports.archive = function(req, res){

	var date_ = req.params.date
	if(!!metas.hasOwnProperty(date_) === false) {
		res.status(404).end("not found")
		return;
	}
	var stream_ = fs.createReadStream(__dirname + '/../archive/' + date_ + 'talk_readonly.log')
		, log_ = new Log(Log.INFO, stream_)
		, resp = [];


	log_.on('line', function(line){
		resp.push(line)
	})

	log_.on('end', function(){
		res.json(resp)
	})
}