var request = require('request');
var fs = require('fs');

var key = fs.readFileSync('./ftapikey', {encoding: "UTF-8"});

exports.search = function (term, curations, callback) {
	var url = "http://api.ft.com/content/search/v1?apiKey="+key;
	var params = {
		queryString: term,
		queryContext:{
			curations: curations
		},
		resultContext: {
			aspects: [ "title", "images", "summary", "location"]
		}
	};
	request.post({
		headers: {'content-type' : 'application/json-encoded'},
		url:     url,
		body:    JSON.stringify(params)
	}, function(error, response, body){
		if (error) {
			console.warn(error);
			return;
		} else if (response.statusCode != 200) {
			console.warn(response.statusCode, body, params);
			return;
		}
		var output = [];
		var imageurl;
		var uuids = [];
		results = JSON.parse(body).results[0].results;
		for (var i in results) {
			uuids.push(results[i].id);
		}
		exports.items(uuids, function (output) {
			callback(output, term);
		});
	});
};

exports.pageItems = function (uuid, callback) {

	var url = "http://api.ft.com/site/v1/pages/"+uuid+"/main-content?apiKey="+key;
	request.get(url, function (error, response, body) {

		if (error) {
			console.warn(error);
			return;
		} else if (response.statusCode != 200) {
			console.warn(response.statusCode, body);
			return;
		}
		var output = [];
		var imageurl;
		var parsedBody = JSON.parse(body);
		results = parsedBody.pageItems;
		var title = parsedBody.page.title;
		var uuids = [];
		for (var i in results) {

			// CAPI doesn't return uuids, so parse it out of the url
			var uuid = results[i].location.uri.match(/[0-9a-f\-]{36}/);
			if (!uuid) continue;
			uuid = uuid[0];
			uuids.push(uuid);
		}
		exports.items(uuids, function (output) {
			callback(output, title);
		});
	});
};


function getItem(uuid, callback) {
	var url = "http://api.ft.com/content/items/v1/"+uuid+"?apiKey="+key+"&bodyFormat=plain";
	request.get(url, function (error, response, body) {

		if (error || response.statusCode != 200) {
			console.warn(error, response.statusCode, body);

			// Nulls will get stripped out by items
			callback(null);
			return;
		}

		var parsedBody = JSON.parse(body);
		var item = parsedBody.item;

		var imageurl;
		for (var j in item.images) {
			if (item.images[j].type == "wide-format") {
				imageurl = item.images[j].url;
				break;
			}
		}
		callback({
			uuid: uuid,
			url: item.location.uri,
			title: item.title.title,
			summary: item.editorial.leadBody,
			image: imageurl,
			body: item.body.body,
		});
	});

};

/**
 * Get lots of items from the content API at the same time
 */
exports.items = function (uuids, callback) {
	var output = [];
	var returned = 0;
	for (var i in uuids) {
		(function (i) {
			getItem(uuids[i], function (item) {
				output[i] = item;
				returned++;
				if (returned == uuids.length) {
					output = output.filter(function (element){
						return !!output;
					});
					callback(output);
				}
			});
		}(i));
	}
};