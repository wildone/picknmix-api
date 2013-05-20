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
	var output = [{
		term: "Search:"+term,
		title: "Add Custom Section: \""+term+"\"",
	}];
	callback(output);
}
module.exports = SearchSection;