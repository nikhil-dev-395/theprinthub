const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    jobTitle: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
); // Enable timestamps to track creation and update times

const Exam = mongoose.model("Exam", userSchema);

module.exports = Exam;
