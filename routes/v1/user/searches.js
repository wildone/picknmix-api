
/*
 * GET users listing.
 */

module.exports = function(req, res){
	var sampledata = [
		{
			id: 1,
			term: "city:london",
			label: "London"
		}
	];
  res.send(JSON.stringify(sampledata));
};

