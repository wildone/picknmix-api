var fs = require('fs');

var api = require('../../objects/ftapi');

var Data = function (id) {
	this.id = id;
};
Data.prototype.getArticles = function (callback, limit) {
	fs.readFile('./data/'+this.id, {encoding: "UTF-8"}, function (err, data) {
		if (err) {
			callback([], this.id);
			return;
		}

		var uuids = data.trim().split("\n");
		api.items(uuids, function (output) {
			callback(output, this.id);
		});
	});
};
Data.getSuggestions = function (query, callback) {
	var output = [];
	if ("Students".toLowerCase().indexOf(query.toLowerCase()) !== -1) {
		output.push({
			term: "Data:students",
			title: "Students"
		});
	}
	callback(output);
};
module.exports = Data;