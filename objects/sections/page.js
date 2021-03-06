var api = require('../../objects/ftapi');

var Page = function (uuid) {
	this.uuid = uuid;
};
Page.prototype.getArticles = function (callback, limit) {
	api.pageItems(this.uuid, callback, limit);
};
Page.prototype.getTitle = function () {
	return "Page";
};
Page.getSuggestions = function (term, callback) {

	// Search API gets confused by colons, so replace them with spaces
	term = term.replace(":", " ");
	api.search(term, ['PAGES'], function(pages) {
		var output = [];
		for (var i in pages) {
			output.push({
				term: "Page:"+pages[i].id,
				title: pages[i].title.title
			});
		}
		callback(output);
	}, 8);
};
module.exports = Page;