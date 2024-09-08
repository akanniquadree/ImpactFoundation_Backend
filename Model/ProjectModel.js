const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    heading: { type: String, required: true },
    desc: { type: String, required: true },
    goal: { type: Number, required: false },
    loc: { type: Number, required: false },
    desc1: { type: Number, required: false },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", projectSchema);

module.exports = ProjectModel;
