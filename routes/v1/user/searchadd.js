var search = require("picknmix-savedsearches");
var varnish = require("../../../objects/varnish");

module.exports = function(req, res) {
        var erightsid = req.params.id,
            term = req.params.term;

        search.get(erightsid, function(searches) {
                searches.addSearch({ "term": term, "label": "?label?" });
                res.status(204).send();
                varnish.purge(req.host, "/v1/user/"+erightsid+".*");
        });
}
