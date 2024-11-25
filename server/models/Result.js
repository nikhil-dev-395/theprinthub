const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  description: { type: String, required: true },
  declaration: { type: String, required: true },
  resultLink: { type: String, required: true },
  file: { type: String, required: true },
  adPoster: { type: String, required: true },
});

const Result = mongoose.model("Result", userSchema);

module.exports = Result;
