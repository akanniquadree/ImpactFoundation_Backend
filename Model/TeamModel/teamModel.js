const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  articleImage: { type: String, required: true },
  post: { type: String, required: true },
  facebook: { type: String, required: false },
  twitter: { type: String, required: false },
  instagram: { type: String, required: false },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
