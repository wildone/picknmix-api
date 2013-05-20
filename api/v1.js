
/*
 * GET users listing.
 */

exports.usersearches = function(req, res){
	var sampledata = [
		{
			id: 1,
			term: "city:london",
			label: "London"
		}
	];
  res.send(JSON.stringify(sampledata));
};



/*
 * GET users listing.
 */

exports.search = function(req, res){
	var sampledata = [
		{
			uuid: "f65828a6-c0c9-11e2-aa8e-00144feab7de",
			title: "Yahoo buys start-up Tumblr for $1bn",
			summary: "Tumblr, launched in 2007, has married short-form blogging with social media sharing to create a service but its growth rate has slowed this year",
			img: "http:\/\/im.ft-static.com\/content\/images\/663cb344-17e3-448a-9290-e6a2eb9f7fe7.img",
		}
	];
  res.send(JSON.stringify(sampledata));
};