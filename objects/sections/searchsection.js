var api = require('../../objects/searchapi');
var SearchSection = function (term) {
	this.term = term;
};
SearchSection.prototype.getArticles = function (callback) {
	api.search(this.term, ['ARTICLES'], callback);
};
SearchSection.getSuggestions = function (term, callback) {

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
		output.push({
			term: term,
			title: "Add Custom Section: \""+term+"\"",
		})
		callback(output);
	});
}
module.exports = SearchSection;