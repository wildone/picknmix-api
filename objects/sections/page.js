var api = require('../../objects/ftapi');

var Page = function (uuid) {
	this.uuid = uuid;
};
Page.prototype.getArticles = function (callback) {
	api.pageItems(this.uuid, callback);
};
Page.getSuggestions = function (term, callback) {

	// Search API gets confused by colons, so replace them with spaces
	term = term.replace(":", " ");
	api.search(term, ['PAGES'], function(pages, title) {
		var output = [];
		for (var i in pages) {
			output.push({
				term: "Page:"+pages[i].uuid,
				title: pages[i].title,
				image: pages[i].image
			});
		}
		callback(output, title);
	});
};
module.exports = Page;