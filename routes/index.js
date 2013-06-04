
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
}

exports.readonly = function(req, res){
  res.render('readonly', { title: 'Express' });
};;