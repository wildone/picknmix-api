/*
 * Handles section identifiers in a standardised way
 */

var SearchSection = require("./searchsection");
var Page = require("./page");
var Popular = require("./popular");

var Section = function (term) {
	var parts = term.split(":");
	if (parts.length == 1) {
		parts = ["Search", term];
	}
	switch (parts[0]) {
		case "Search":
			return new SearchSection(parts[1]);
		case "Page":
			return new Page(parts[1]);
		case "Popular":
			return new Popular();
		default:

			// If an invalid type is used, then treat the whole term as a search (ignorning commas)
			return new SearchSection(term.replace(":", " "));
	}
}

Section.getSuggestions = function (query, callback) {
	Page.getSuggestions(query, function (pagesuggestions) {
		SearchSection.getSuggestions(query, function (searchsuggestions) {
			Popular.getSuggestions(query, function (popsuggestions) {
				callback(popsuggestions.concat(pagesuggestions, searchsuggestions));
			});
		});
	});
}

module.exports = Section;