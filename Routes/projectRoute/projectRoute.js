const express = require("express");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const ProjectModel = require("../../Model/ProjectModel.js");

const projectRouter = express.Router();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

projectRouter.get("/", async (req, res) => {
  const projects = await ProjectModel.find({}).sort("-updateAt");
  return res.status(201).res.send(projects);
});

projectRouter.get("/:id", async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await ProjectModel.findById({ _id: projectId });
    if (project) {
      return res.status(201).send(project);
    } else {
      return res.status(422).send({ msg: "Project does not exist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

projectRouter.post("/", async (req, res) => {
  try {
    const { heading, goal, raised, desc } = req.body;
    const image = req.files.image;
    if (!heading || !image || !desc) {
      return res.status(422).json({ error: "Fill all required fields" });
    }
    const existTeam = await ProjectModel.findOne({ heading });
    if (existTeam) {
      return res
        .status(422)
        .json({ error: "Project already exist in our record" });
    }
    const avatar_clod = await cloudinary.uploader.upload(
      image.tempFilePath,
      function (res) {},
      {
        folder: `TGIF/Project/${heading}`,
        resource_type: "auto",
        use_filename: true,
      }
    );
    const newProject = new Project({
      image: avatar_clod.url,
      heading,
      desc,
      goal,
      raised,
    });
    const savedProject = await newProjectModel.save();
    if (savedProject) {
      return res
        .status(201)
        .send({ msg: "Project Uploaded Successfully", savedProject });
    } else {
      return res.status(401).send({ error: "Error in saving Project" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

projectRouter.put("/:id", async (req, res) => {
  try {
    const { heading, goal, raised, desc } = req.body;
    const image = req.files.image;
    if (!heading || !image || !desc) {
      return res.status(422).json({ error: "Fill all required fields" });
    }
    const getProject = await ProjectModel.findById(req.params.id);
    if (!getProject) {
      return res.status(422).json({ error: "Project doesnt exist" });
    }
    const avatar_clod = await cloudinary.uploader.upload(
      image.tempFilePath,
      function (res) {},
      {
        folder: `TGIF/Teams/${heading}`,
        resource_type: "auto",
        use_filename: true,
      }
    );
    if (getProject) {
      getProjectModel.image = avatar_clod.url;
      getProjectModel.heading = heading;
      getProjectModel.desc = desc;
      getProjectModel.goal = goal;
      getProjectModel.raised = raised;

      const saveProjects = await getProjectModel.save();
      if (saveProjects) {
        return res
          .status(200)
          .send({ msg: "Project is Updated Successfully", saveProjects });
      } else {
        return res.status(401).send({ error: "Error in updating Project" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

projectRouter.delete("/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const getProject = await ProjectModel.findById({ _id: projectId });
    if (getProject) {
      const deleteProject = await getProjectModel.remove();
      res.send({ msg: "Project is Deleted" });
    } else {
      res.status(401).send({ error: "Error in deleting Project" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

module.exports = projectRouter;
