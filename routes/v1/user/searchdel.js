var search = require("picknmix-savedsearches");
var varnish = require("../../../objects/varnish");

module.exports = function(req, res) {
        var erightsid = req.params.id,
            term = req.params.term;

        search.get(erightsid, function(searches) {
                searches.removeSearch({ "term": term }).onSuccess(function(value) {
                        res.status(204).send();
                        searches.destroy();
                        varnish.purge(req.host, "/v1/user/"+erightsid+".*");
                }).onError(function(value) {
                        res.status(500).send();
                        searches.destroy();
                });
        });
}
