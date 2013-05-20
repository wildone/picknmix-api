/*
 * Handles section identifiers in a standardised way
 */

exports.parse = function (term, callback) {
	var normalised = {
		type: "search",
		id: term.replace(":", " "),
		term: term.replace(":", " ")
	}
	callback(normalised);
}