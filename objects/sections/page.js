var api = require('../../objects/searchapi');

var Page = function (uuid) {
	this.uuid = uuid;
};
Page.prototype.getArticles = function (callback) {
	// TODO
	callback([]);
};
Page.getSuggestions = function (term, callback) {

	// Search API gets confused by colons, so replace them with spaces
	term = term.replace(":", " ");
	api.search(term, ['PAGES'], function(pages) {
		var output = [];
		for (var i in pages) {
			output.push({
				term: "Page:"+pages[i].uuid,
				title: pages[i].title,
				image: pages[i].image,
			});
		}
		callback(output);
	});
};
module.exports = Page;