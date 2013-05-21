/*
 * GET searches for a given user
 */
var search = require("picknmix-savedsearches");

module.exports = function(req, res){

        var erightsid = req.params.id;

        search.get(erightsid, function(searches) {
                searches.getTerms().onSuccess(function(terms) {
                        terms.reverse();
                        res.send(JSON.stringify(terms));
                        searches.destroy();
                }).onError(function(error) {
                        res.status(500).send("Error retrieving searches for eid: " + erightsid + " (" + error + ")");
                });
        });
};

