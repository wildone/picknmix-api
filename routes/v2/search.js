var Section = require('../../objects/sections');


/*
 * GET stories for a given search term
 */

module.exports = function(req, res){
  var section = new Section(req.params.term);
  section.getArticles(function(results, label) {
    var output = { label: label, results: results };
    res.send(JSON.stringify(output));
  }), req.query['limit'];
};