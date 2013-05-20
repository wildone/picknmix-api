
/*
 * GET users listing.
 */

exports.searches = function(req, res){
	var sampledata = [
		{
			id: 1,
			term: "city:london",
			label: "London"
		}
	];
  res.send(JSON.stringify(sampledata));
};