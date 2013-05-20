var api = require('../../objects/searchapi');


/*
 * GET suggestions of searches for a given query
 */

module.exports = function(req, res){
	var query = req.params.query;
	api.search(query, ['PAGES'], function(pages) {
		var output = [];
		for (var i in pages) {
			output.push({
				term: "Page:"+pages[i].uuid,
				title: pages[i].title,
				image: pages[i].image,
			});
		}
		if (query.indexOf(':') !== -1) output.push({
			term: query,
			title: "Add Custom Section: \""+query+"\"",
		})
		res.send(JSON.stringify(output));
	});
};