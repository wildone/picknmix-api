
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'FT Pick \'n\' mix' });
};