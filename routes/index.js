
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
}

exports.bot = function(req, res){
  res.render('bot', { title: 'Bot' });
}

exports.readonly = function(req, res){
  res.render('readonly', { title: 'Express' });
};