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
			aspects: [ "title", "images", "summary"]       
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
				title: result.title.title,
				summary: result.summary.excerpt,
				image: imageurl,
			});
		}
		callback(output);
	});
}