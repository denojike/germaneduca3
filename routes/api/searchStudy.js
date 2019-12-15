const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Study = require("../../models/Study");

// @desc GET STUDY BY ID
// @route GET api/searchStudy
// @access Public
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let singleStudy = await Study.findById(id);

    if (!singleStudy) {
      return res
        .status(404)
        .json({ errors: [{ msg: "This course is no longer available" }] });
    }
    res.json(singleStudy);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc SEARCH STUDIES BY CRITERIA
// @route Post api/searchStudy
// @access Private
router.post("/", async (req, res) => {
  const {
    studyName,
    studyType,
    studySemester,
    studyUni,
    studyCity,
    studyState,
    application
  } = req.body;

  try {
    let studies = await Study.find({
      $or: [
        {
          studyName: { $regex: `^${studyName}` },
          studyType: { $regex: `^${studyType}` },
          studySemester: { $regex: `^${studySemester}` },
          studyUni: { $regex: `^${studyUni}` },
          studyCity: { $regex: `^${studyCity}` },
          studyState: { $regex: `^${studyState}` },
          application: { $regex: `^${application}` }
        }
      ]
    });

    if (Object.keys(studies).length <= 0) {
      // console.log(res.response);

      return res
        .status(404)
        .json({ errors: [{ msg: "No course was found under this category" }] });
    }

    res.json(studies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @desc GET ALL STUDIES
// @route GET api/getAllStudies
// @access Private
router.get("/", async (req, res) => {
  try {
    let allStudies = await Study.find();

    if (!allStudies) {
      return res
        .status(404)
        .json({ errors: [{ msg: "There is no study in the database" }] });
    }
    res.json(allStudies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
