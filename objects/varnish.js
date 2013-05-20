var fs = require('fs');
var Varnish = require('node-varnish');

var ipaddresses;
try {
	ipaddresses = fs.readFileSync('/etc/sysconfig/ftlabs/varnish-servers', {encoding: "UTF-8"}).trim().split("\n");
} catch (e) {
	ipaddresses = ["127.0.0.1"];
}

/** host and url accept varnishy regexes **/
exports.purge = function (host, url) {

	// Do it asynchronously so it doesn't interfer with user requests
	process.nextTick(function(){
		for (var i in ipaddresses) {

			var client = new Varnish.VarnishClient(ipaddresses[i], MANAGEMENT_PORT);
			client.on('ready', function() {
			    client.run_cmd('ban req.http.host ~ '+host+' && req.url ~ '+url, function(){});
			});



		}
	});
}