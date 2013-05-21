var search = require("picknmix-savedsearches");

module.exports = function(req, res) {
        var erightsid = req.params.id,
            term = req.params.term;

        search.get(erightsid, function(searches) {
                searches.removeSearch({ "term": term });
                res.status(204).send();
                searches.destroy();
                varnish.purge(req.host, "/v1/user/"+erightsid+".*");
        });
}
