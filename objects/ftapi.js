var request = require('request');
var fs = require('fs');

var key = fs.readFileSync('./ftapikey', {encoding: "UTF-8"});

exports.search = function (term, curations, callback) {
	var url = "http://api.ft.com/content/search/v1?apiKey="+key;
	var params = {
		queryString: term,
		queryContext:{
			curations: curations,
		},
		resultContext: {
			aspects: [ "title", "images", "summary", "location"]       
		},
	};
	request.post({
	  headers: {'content-type' : 'application/json-encoded'},
	  url:     url,
	  body:    JSON.stringify(params),
	}, function(error, response, body){
		if (error) {
			console.warn(error);
			return;
		} else if (response.statusCode != 200) {
			console.warn(response.statusCode, body, params);
			return;
		}
		var output = [];
		results = JSON.parse(body).results[0].results;
		for (var i in results) {
			var result = results[i];

			// Just use the first image if there is one (Search API doesn't support single image workflow)
			var imageurl = undefined;
			if (result.images.length) {
				imageurl = result.images[0].url;
			}
			output.push({
				uuid: result.id,
				url: result.location.uri,
				title: result.title.title,
				summary: result.summary.excerpt,
				image: imageurl,
			});
		}
		callback(output);
	});
}

exports.pageItems = function (uuid, callback) {

	var url = "http://api.ft.com/site/v1/pages/"+uuid+"/main-content?apiKey="+key;
	request.get(url, function (error, response, body) {

		if (error) {
			console.warn(error);
			return;
		} else if (response.statusCode != 200) {
			console.warn(response.statusCode, body, params);
			return;
		}
		var output = [];
		results = JSON.parse(body).pageItems;
		for (var i in results) {
			var result = results[i];

			// Just use the first image if there is one (Search API doesn't support single image workflow)
			var imageurl = undefined;
			for (var j in result.images) {
				if (result.images[j].type == "wide-format") {
					imageurl = result.images[j].url;
					break;
				}
			}

			// CAPI doesn't return uuid, so parse it out of the url
			var uuid = result.location.uri.match(/[0-9a-f\-]{36}/);
			uuid = uuid[0];
			output.push({
				uuid: uuid,
				url: result.location.uri,
				title: result.title.title,
				summary: result.editorial.leadBody,
				image: imageurl,
			});
		}
		callback(output);

	});
}