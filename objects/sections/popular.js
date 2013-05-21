var request = require('request');
var api = require('../../objects/ftapi');
var url = "https://realtime.ijento.com/financialtimes/ft-subs-articles.txt";
var title = "Most Popular";

var Popular = function () {
};
Popular.prototype.getArticles = function (callback, limit) {
	request.get(url, function (error, response, body) {

		if (error || response.statusCode != 200) {
			console.warn(error || response.statusCode, body);

			// Nulls will get stripped out by items
			callback([], title);
			return;
		}
		var parsedBody = JSON.parse(body);
		results = parsedBody.articles;
		var uuids = [];
		for (var i in results) {
			uuids.push(results[i].uuid);
			if (uuids.length >= limit) break;
		}
		api.items(uuids, function (output) {
			callback(output, title);
		});
	});
};
Popular.prototype.getTitle = function () {
	return title;
};
Popular.getSuggestions = function (query, callback) {
	var output = [];
	if (title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
		output.push({
			term: "Popular:all",
			title: title
		});
	}
	callback(output);
};
module.exports = Popular;