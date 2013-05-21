var Section = require('../../objects/sections');


/*
 * GET stories for a given search term
 */

module.exports = function(req, res){
	var section = new Section (req.params.term);
	section.getArticles(function(results) {
		res.send(JSON.stringify(results));
	}, req.query['limit']);
};