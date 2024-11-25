const CurrentNews = require("../models/CurrentNews");
exports.getCurrentNew = async (req, res) => {
  try {
    const userData = await CurrentNews.find({});
    res.json({ success: true, data: userData });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
