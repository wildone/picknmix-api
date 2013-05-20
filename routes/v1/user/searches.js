/*
 * GET searches for a given user
 */
var search = require("picknmix-savedsearches");

module.exports = function(req, res){

        var erightsid = req.params.id;

        search.get(erightsid, function(searches) {
                res.send(JSON.stringify(searches.getTerms()));
        });
};

