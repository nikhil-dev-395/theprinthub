const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
); // Enable timestamps to track creation and update times

const CurrentNews = mongoose.model("CurrentNews", userSchema);

module.exports = CurrentNews;
