const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  loc: { type: String, required: true },
  desc: { type: String, required: true },
});

const SponsorModel = mongoose.model("Sponsor", sponsorSchema);

module.exports = SponsorModel;
