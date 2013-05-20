var api = require('../../objects/searchapi');
var terms = require('../../objects/terms');


/*
 * GET stories for a given search term
 */

module.exports = function(req, res){
	terms.parse(req.params.term, function (section) {
		if (section.type == "search") {
			api.search(section.id, ['ARTICLES'], function(results) {
				res.send(JSON.stringify(results));
			});
		} else {
			throw "Can't find section type "+section.type;
		}
	});
};