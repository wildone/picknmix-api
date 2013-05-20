var api = require('../../objects/searchapi');


/*
 * GET stories for a given search term
 */

module.exports = function(req, res){
	var term = req.params.term;
	api.search(term, ['ARTICLES', 'BLOGS'], function(results) {
		res.send(JSON.stringify(results));
	});
};