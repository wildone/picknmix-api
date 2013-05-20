
module.exports = function(req, res) {
	var term = req.params.term;
	res.send('search results for: ' + term);
};