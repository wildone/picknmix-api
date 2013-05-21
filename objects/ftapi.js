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
		var result;
		results = JSON.parse(body).results[0].results;
		for (var i in results) {
			result = results[i];

			// Just use the first image if there is one (Search API doesn't support single image workflow)
			imageurl = undefined;
			if (result.images.length) {
				imageurl = result.images[0].url;
			}
			output.push({
				uuid: result.id,
				url: result.location.uri,
				title: result.title.title,
				summary: result.summary.excerpt,
				image: imageurl
			});
		}
		callback(output, term);
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
			var result = results[i];

			imageurl = undefined;
			for (var j in result.images) {
				if (result.images[j].type == "wide-format") {
					imageurl = result.images[j].url;
					break;
				}
			}

			// CAPI doesn't return uuid, so parse it out of the url
			var uuid = result.location.uri.match(/[0-9a-f\-]{36}/);
			uuid = uuid[0];
			uuids.push(uuid);
			output.push({
				uuid: uuid,
				url: result.location.uri,
				title: result.title.title,
				summary: result.editorial.leadBody,
				image: imageurl
			});
		}
		exports.items(uuids, function (output) {
			callback(output, title);
		})
	});
};


exports.item = function (uuid, callback) {
	var url = "http://api.ft.com/content/items/v1/"+uuid+"?apiKey="+key+"&bodyFormat=plain";
	request.get(url, function (error, response, body) {

		if (error || response.statusCode != 200) {
			console.warn(error, response.statusCode, body);
			callback({});
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

exports.items = function (uuids, callback) {
	var output = [];
	var returned = 0;
	for (var i in uuids) {
		(function (i) {
			exports.item(uuids[i], function (item) {
				output[i] = item;
				returned++;
				if (returned == uuids.length) {
					callback(output);
				}
			});
		}(i));
	}
};