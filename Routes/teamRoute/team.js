import express from "express";
import multer from "multer";
import Team from "../../Model/TeamModel/teamModel.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

const teamRoute = express.Router();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

teamRoute.get("/", async (req, res) => {
  const teams = await Team.find({}).sort("-updateAt");
  return res.status(201).json(teams);
});

teamRoute.get("/:id", async (req, res) => {
  const team = await Team.findById(req.body.id);
  if (!team) {
    return res.status(401).json({ error: "Error in retrieving Team" });
  }
  return res.status(201).json(team);
});

teamRoute.post("/", async (req, res) => {
  try {
    const { name, post, facebook, twitter, instagram } = req.body;
    const articleImage = req.files.articleImage;
    if (!name || !post) {
      return res.status(422).json({ error: "Fill all required fields" });
    }
    const existTeam = await Team.findOne({ name });
    if (existTeam) {
      return res
        .status(422)
        .json({ error: "Name already exist in our record" });
    }
    const avatar_clod = await cloudinary.uploader.upload(
      articleImage.tempFilePath,
      function (res) {},
      {
        folder: `TGIF/Teams/${name}`,
        resource_type: "auto",
        use_filename: true,
      }
    );
    const team = new Team({
      name,
      articleImage: avatar_clod.url,
      post,
      facebook,
      twitter,
      instagram,
    });
    const saveTeam = await team.save();
    if (saveTeam) {
      return res
        .status(201)
        .json({ msg: "New Team member uploaded", saveTeam });
    }
    return res.status(500).json({ message: "Error in creating team member" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

teamRoute.put("/:id", async (req, res) => {
  try {
    const { name, post, facebook, twitter, instagram } = req.body;
    const articleImage = req.files.articleImage;
    if (!name || !post) {
      return res.status(422).json({ error: "Fill all required fields" });
    }
    const TeamId = req.params.id;
    const getTeam = await Team.findById({ _id: TeamId });
    if (!getTeam) {
      return res.status(422).json({ error: "Team member doesnt exist" });
    }
    const avatar_clod = await cloudinary.uploader.upload(
      articleImage.tempFilePath,
      function (res) {},
      {
        folder: `TGIF/Teams/${name}`,
        resource_type: "auto",
        use_filename: true,
      }
    );
    if (getTeam) {
      getTeam.articleImage = avatar_clod.url;
      getTeam.name = name;
      getTeam.post = post;
      (getTeam.facebook = facebook),
        (getTeam.twitter = twitter),
        (getTeam.instagram = instagram);
      const updatedTeam = await getTeam.save();
      if (updatedTeam) {
        return res
          .status(201)
          .send({ message: "Team member Updated", data: updatedTeam });
      }
    }
    return res.status(422).send({ message: "Error in updating Team member" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

teamRoute.delete("/:id", async (req, res) => {
  const deleteTeam = await Team.findById(req.params.id);
  if (deleteTeam) {
    await deleteTeam.remove();
    return res.send({ message: "Product Deleted" });
  }
  return res.status(400).send({ message: "Error in deleting Team member" });
});

export default teamRoute;
