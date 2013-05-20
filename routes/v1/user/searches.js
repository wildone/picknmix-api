/*
 * GET searches for a given user
 */
var search = require("picknmix-savedsearches");

module.exports = function(req, res){

        var erightsid = req.params.id;

        search.get(erightsid, function(searches) {
                var terms = searches.getTerms();

                if (terms.length === 0) {
                        res.status(404).send("(404) Not Found");
                } else {
                        res.send(JSON.stringify(searches.getTerms()));
                }
        });
};

