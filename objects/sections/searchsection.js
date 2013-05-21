var api = require('../../objects/ftapi');
var SearchSection = function (term) {
	this.term = term;
};
SearchSection.prototype.getArticles = function (callback, limit) {
	api.search(this.term, ['ARTICLES'], callback, limit);
};
SearchSection.prototype.getTitle = function () {
	return this.term;
};
SearchSection.getSuggestions = function (term, callback) {

	// Search API gets confused by colons, so replace them with spaces
	term = term.replace(":", " ");
	var output = [{
		term: "Search:" + term,
		title: "Add Custom Section: \""+term+"\""
	}];
	callback(output);
};
module.exports = SearchSection;