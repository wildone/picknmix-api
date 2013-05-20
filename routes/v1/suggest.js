var api = require('../../objects/searchapi');
var terms = require('../../objects/terms');


/*
 * GET suggestions of searches for a given query
 */

module.exports = function(req, res){
	terms.parse(req.params.query, function (section) {
		if (section.type == "search") {
			api.search(section.id, ['PAGES'], function(pages) {
				var output = [];
				for (var i in pages) {
					output.push({
						term: "Page:"+pages[i].uuid,
						title: pages[i].title,
						image: pages[i].image,
					});
				}
				output.push({
					term: section.term,
					title: "Add Custom Section: \""+section.term+"\"",
				})
				res.send(JSON.stringify(output));
			});
		} else {
			throw "Can't find section type "+section.type;
		}
	});
};