var Section = require('../../objects/sections');


/*
 * GET suggestions of searches for a given query
 */

module.exports = function(req, res){
	Section.getSuggestions(req.params.query, function (suggestions) {
		res.send(JSON.stringify(suggestions));
	});
};