const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  description: { type: String, unique: false, required: true },
  vacancy: { type: Number, required: true },
  date: { type: Date, required: true },
  advPdf: { type: String, required: true },
  applyLink: { type: String, required: true },
  officialWebsite: { type: String, required: true },
  adImage: { type: String, required: true },
  adPoster: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
