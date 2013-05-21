var fs = require('fs');

var api = require('../../objects/ftapi');
var files = {
	"students": "Student Persona",
	"Analysts": "Analysts",
	"Associates": "Associates",
	 "BrokerTraderAdvisors": "Broker/Trader/Advisors",
	 "BusinessSchoolAcademics": "Business School Academics",
	 "CEOpresidentChairmans": "CEO/president/Chairmans",
	 "Consultants": "Consultants",
	 "DiplomatSenGovtOfficers": "Diplomat/Sen Govt Officers",
	 "ExecMgmtEVPSVPMDs": "Exec Mgmt (EVP/SVP/MD)s",
	 "GovtIntlorgofficials": "Gov't/Int'l org officials",
	 "MBAStudents": "MBA Students",
	 "ManagerSupervisors": "Manager/Supervisors",
	 "OtherCLevelCFOCOOCIOCMOs": "Other C Level (CFO/COO/CIO/CMO)s",
	 "OwnerPartnerProprietors": "Owner/Partner/Proprietors",
	 "PoliticianGovernmentMinisters": "Politician/Government Ministers",
	 "Professionals": "Professionals",
	 "ProgrammeProjectManagers": "Programme/Project Managers",
	 "SecretaryTreasurers": "Secretary/Treasurers",
	 "SeniorManagerDeptHeads": "Senior Manager/Dept Heads",
	 "TechnicalBusinessSpecialists": "Technical/Business Specialists",
	 "VPDirectors": "VP/Directors",
	 "deepthinker": "Deep Thinkers Persona",
	 "functionalusers": "Functional Users Persona"
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
Data.prototype.getTitle = function () {
	return files[this.id];
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