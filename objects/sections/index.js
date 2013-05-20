/*
 * Handles section identifiers in a standardised way
 */

/*exports.parse = function (term, callback) {
	var normalised = {
		type: "search",
		id: term.replace(":", " "),
		term: term.replace(":", " ")
	}
	callback(normalised);
}*/
var SearchSection = require("./searchsection");

var Section = function (term) {
	var parts = term.split(":");
	if (parts.length == 1) {
		parts = ["Search", "term"];
	}
	switch (parts[0]) {
		case "Search":
			return new SearchSection(parts[1]);
		default:
			throw "Can't find section type "+parts[0]+".";
	}
}

Section.getSuggestions = function (query, callback) {
	SearchSection.getSuggestions(query, callback);
}

module.exports = Section;