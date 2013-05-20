/*
 * GET searches for a given user
 */

module.exports = function(req, res){
	var sampledata = [
		{
			id: 1,
			term: "London",
			label: "London"
		},
		{
			id: 2,
			term: "Syrian Electronic Army",
			label: "Syrian Electronic Army"
		},
		{
			id: 3,
			term: "Page:fcdae4e8-cd25-11de-a748-00144feabdc0",
			label: "Management"
		},
	];
  res.send(JSON.stringify(sampledata));
};

