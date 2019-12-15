const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Study = require('../../models/Study');

// @desc ADD STUDY
// @route POST api/study
// @access Private
router.post(
	'/',
	[
		auth,
		[
			check('studyName', 'study Name is required').not().isEmpty(),
			check('studyType', 'study Type is required').not().isEmpty(),
			check('studySemester', 'study Semester is required').not().isEmpty(),
			check('studyUni', 'study University is required').not().isEmpty(),
			check('studyCity', 'study City is required').not().isEmpty(),
			check('studyTuition', 'tuition is required').not().isEmpty(),
			check('studyDeadline', 'deadline is required').not().isEmpty(),
			check('application', 'Application Medium is required').not().isEmpty(),
			check('website', 'Website is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const id = req.params.id;

		const {
			studyName,
			studyType,
			studySemester,
			studyUni,
			studyCity,
			studyState,
			studyTuition,
			studyDeadline,
			application,
			website,
			previousEnglish,
			previousForUS,
			englishAll,
			englishLetter,
			gre,
			visitWebsite,
			other,
			courseImage,
			courseDesc
		} = req.body;

		//Build study object
		const studyFields = {};
		studyFields.user = req.user.id;
		studyFields.studyName = studyName;
		studyFields.studyType = studyType;
		studyFields.studySemester = studySemester;
		studyFields.studyUni = studyUni;
		studyFields.studyCity = studyCity;
		studyFields.studyState = studyState;
		studyFields.studyTuition = studyTuition;
		studyFields.studyDeadline = studyDeadline;
		studyFields.application = application;
		studyFields.website = website;
		studyFields.previousEnglish = previousEnglish;
		studyFields.previousForUS = previousForUS;
		studyFields.englishAll = englishAll;
		studyFields.englishLetter = englishLetter;
		studyFields.gre = gre;
		studyFields.visitWebsite = visitWebsite;
		studyFields.other = other;
		studyFields.courseImage = courseImage;
		studyFields.courseDesc = courseDesc;

		//Create New Course
		try {
			//Create
			let study = new Study(studyFields);
			await study.save();
			res.json(studyFields);
		} catch (err) {
			console.error(err.message);
			res.status(500).send(err.message);
		}
	}
);

// @desc UPDATE COURSE
// @route put api/updateStudy/:id
// @access Private
router.put(
	'/:id',
	[
		auth,
		[
			check('studyName', 'study Name is required').not().isEmpty(),
			check('studyType', 'study Type is required').not().isEmpty(),
			check('studySemester', 'study Semester is required').not().isEmpty(),
			check('studyUni', 'study University is required').not().isEmpty(),
			check('studyCity', 'study City is required').not().isEmpty(),
			check('studyTuition', 'tuition is required').not().isEmpty(),
			check('studyDeadline', 'deadline is required').not().isEmpty(),
			check('application', 'Application Medium is required').not().isEmpty(),
			check('website', 'Website is required').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			studyName,
			studyType,
			// studyReq,
			studySemester,
			studyUni,
			studyCity,
			studyState,
			studyTuition,
			studyDeadline,
			application,
			website,
			previousEnglish,
			previousForUS,
			englishAll,
			englishLetter,
			gre,
			visitWebsite,
			other,
			courseImage,
			courseDesc
		} = req.body;

		//Build study object
		const studyFields = {};
		studyFields.user = req.user.id;
		studyFields.studyName = studyName;
		studyFields.studyType = studyType;
		studyFields.studySemester = studySemester;
		studyFields.studyUni = studyUni;
		studyFields.studyCity = studyCity;
		studyFields.studyState = studyState;
		studyFields.studyTuition = studyTuition;
		studyFields.studyDeadline = studyDeadline;
		studyFields.application = application;
		studyFields.website = website;
		studyFields.previousEnglish = previousEnglish;
		studyFields.previousForUS = previousForUS;
		studyFields.englishAll = englishAll;
		studyFields.englishLetter = englishLetter;
		studyFields.gre = gre;
		studyFields.visitWebsite = visitWebsite;
		studyFields.other = other;
		studyFields.courseDesc = courseDesc;

		try {
			let study = await Study.findByIdAndUpdate(
				{ _id: req.params.id },
				{ $set: studyFields },
				{ new: true, upsert: true }
			);

			res.json(study);
		} catch (err) {
			console.error(err.message);
			res.status(500).send(err.message);
		}
	}
);

// @desc DELETE SINGLE STUDY
// @route DELETE api/deleteStudy/:id
// @access Private
router.delete('/:id', auth, async (req, res) => {
	//  Check if study exits
	try {
		let study = await Study.findOne({ _id: req.params.id });

		if (!study) {
			return res.status(400).json({ errors: [ { msg: 'This study has already been deleted' } ] });
		}
		await Study.findOneAndRemove({ _id: req.params.id });

		res.json({
			msg: `Study with the id ${req.params.id} was succesfully deleted`
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
