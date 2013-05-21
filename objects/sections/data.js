var fs = require('fs');

var api = require('../../objects/ftapi');
var files = {
	"students": "Student Persona",
	"Analysts": "",
	"Associates": "",
	 "BrokerTraderAdvisors": "",
	 "BusinessSchoolAcademics": "",
	 "CEOpresidentChairmans": "",
	 "Consultants": "",
	 "DiplomatSenGovtOfficers": "",
	 "ExecMgmtEVPSVPMDs": "",
	 "GovtIntlorgofficials": "",
	 "MBAStudents": "",
	 "ManagerSupervisors": "",
	 "OtherCLevelCFOCOOCIOCMOs": "",
	 "OwnerPartnerProprietors": "",
	 "PoliticianGovernmentMinisters": "",
	 "Professionals": "",
	 "ProgrammeProjectManagers": "",
	 "SecretaryTreasurers": "",
	 "SeniorManagerDeptHeads": "",
	 "TechnicalBusinessSpecialists": "Technical Business Specialists",
	 "VPDirectors": "VP Directors",
	 "deepthinker": "Deep Thinkers",
	 "functionalusers": "Functional Users"
};

var Data = function (id) {
	this.id = id;
};
Data.prototype.getArticles = function (callback, limit) {
	if (!(this.id in files)) {
			callback([], this.id);
			return;
	}
	var title = files[this.id];
	fs.readFile('./data/'+this.id, {encoding: "UTF-8"}, function (err, data) {
		if (err) {
			callback([], title);
			return;
		}

		var uuids = data.trim().split("\n");
		api.items(uuids, function (output) {
			callback(output, title);
		});
	});
};
Data.getSuggestions = function (query, callback) {
	var output = [];

	for (var id in files) {
		var title = files[id];
		if (title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
			output.push({
				term: "Data:"+id,
				title: title
			});
		}
	}
	callback(output);
};
module.exports = Data;