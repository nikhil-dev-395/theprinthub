const AdmitCard = require("../models/AdmitCard.js");

exports.getAdmitCard = async (req, res) => {
  try {
    const userData = await AdmitCard.find({});

    if (userData.length === 0) {
      return res
        .status(404)
        .json({ success: true, message: "No admit cards found" });
    }

    res.json({ success: true, data: userData });
  } catch (error) {
    console.error("Error fetching admit cards:", error); // Better logging
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
