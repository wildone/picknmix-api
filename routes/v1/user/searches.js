/*
 * GET searches for a given user
 */
var search = require("picknmix-savedsearches");

module.exports = function(req, res){

        var erightsid = req.params.id;

        search.get(erightsid, function(searches) {
                searches.getTerms().onSuccess(function(terms) {
                        if (terms.length === 0) {
                                res.status(404).send("[]");
                        } else {
                                res.send(JSON.stringify(terms));
                        }
                });

        });
};

