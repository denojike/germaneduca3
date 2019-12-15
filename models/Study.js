const mongoose = require('mongoose');

const StudySchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	studyName: {
		type: String,
		required: true
	},
	studyType: {
		type: String,
		required: true
	},
	studySemester: {
		type: String,
		required: true
	},
	studyUni: {
		type: String,
		required: true
	},
	studyCity: {
		type: String,
		required: true
	},
	studyState: {
		type: String,
		required: true
	},
	studyTuition: {
		type: String,
		required: true
	},
	studyDeadline: {
		type: String,
		required: true
	},
	application: {
		type: String,
		required: true
	},
	website: {
		type: String,
		required: true
	},
	previousEnglish: {
		type: String
	},
	previousForUS: {
		type: String
	},
	englishAll: {
		type: String
	},
	englishLetter: {
		type: String
	},
	gre: {
		type: String
	},
	other: {
		type: String
	},
	visitWebsite: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	courseDesc: {
		type: String
	}
});

module.exports = mongoose.model('Study', StudySchema);
