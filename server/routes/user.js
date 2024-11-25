const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/createUser");
const { createResult } = require("../controller/createResult");
const { createAdmitCard } = require("../controller/createAdmitCard");
const { getUser } = require("../controller/getUsers");
const { getAdmitCard } = require("../controller/getAdmitCard");
const { getResultsCard } = require("../controller/getResultsCard");
const { getCurrentNew } = require("../controller/getCurrentNew");
const { createCurrentNew } = require("../controller/createCurrentNew");
const { createExam } = require("../controller/createExam");
const { getExam } = require("../controller/getExam");

const User = require("../models/User");
const Result = require("../models/Result");
const AdmitCard = require("../models/AdmitCard");
const CurrentNews = require("../models/CurrentNews");

// POST routes
router.post("/createUser", createUser);
router.post("/createResult", createResult);
router.post("/createAdmitCard", createAdmitCard);
router.post("/createCurrentNew", createCurrentNew);
router.post("/createExam", createExam);

// General GET routes
router.get("/getAdmitCard", getAdmitCard);
router.get("/getResultsCard", getResultsCard);
router.get("/getCurrentNew", getCurrentNew);
router.get("/getallUsers", getUser);
router.get("/getExam", getExam);

// Route to find users by jobTitle
router.get("/getallUsers/:jobTitle", async (req, res) => {
  const jobTitle = decodeURIComponent(req.params.jobTitle);
  console.log("Decoded jobTitle:", jobTitle);

  try {
    const users = await User.find({
      jobTitle: { $regex: new RegExp(`^${jobTitle}$`, "i") },
    });
    console.log("Query result:", users);

    if (users.length > 0) {
      res.status(200).json({ data: users });
    } else {
      res.status(404).json({ error: "No users found for the given job title" });
    }
  } catch (error) {
    console.error("Error fetching users by jobTitle:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to find results by jobTitle
router.get("/getResultsCard/:jobTitle", async (req, res) => {
  const jobTitle = decodeURIComponent(req.params.jobTitle);
  console.log("Decoded jobTitle:", jobTitle);

  try {
    const results = await Result.find({
      // jobTitle: { $regex: new RegExp(`^${jobTitle}$`, "i") },
      jobTitle: jobTitle,
    });
    console.log("Query result:", results);

    if (results.length > 0) {
      res.status(200).json({ data: results });
    } else {
      res
        .status(404)
        .json({ error: "No results found for the given job title" });
    }
  } catch (error) {
    console.error("Error fetching results by jobTitle:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to find admit cards by jobTitle
router.get("/getAdmitCard/:jobTitle", async (req, res) => {
  const jobTitle = decodeURIComponent(req.params.jobTitle);
  console.log("Decoded jobTitle:", jobTitle);

  try {
    const admitCards = await AdmitCard.find({
      jobTitle: jobTitle,
    });
    console.log("Query result:", admitCards);

    if (admitCards.length > 0) {
      res.status(200).json({ data: admitCards });
    } else {
      res
        .status(404)
        .json({ error: "No admit cards found for the given job title" });
    }
  } catch (error) {
    console.error("Error fetching admit cards by jobTitle:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to find current news by jobTitle
router.get("/getCurrentNew/:jobTitle", async (req, res) => {
  const jobTitle = decodeURIComponent(req.params.jobTitle);
  console.log("Decoded jobTitle:", jobTitle);

  try {
    const currentNews = await CurrentNews.findOne({
      // jobTitle: { $regex: new RegExp(`^${jobTitle}$`, "i") },
      jobTitle: jobTitle,
    });
    console.log("Query result:", currentNews);

    if (currentNews.length > 0) {
      res.status(200).json({ data: currentNews });
    } else {
      res.status(404).json({ error: "No news found for the given job title" });
    }
  } catch (error) {
    console.error("Error fetching current news by jobTitle:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
