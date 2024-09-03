const express = require("express");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const Sponsor = require("../../model/SponsorModel/sponsorModel.js");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sponsorRouter = express.Router();

sponsorRouter.get("/", async (req, res) => {
  const sponsor = await Sponsor.find({}).sort("-updateAt");
  res.status(200).send(sponsor);
});

sponsorRouter.post("/", async (req, res) => {
  try {
    const { name, loc, desc } = req.body;
    const image = req.files.image;
    if (!name || !loc || !desc) {
      return res.status(422).json({ error: "Fill all required fields" });
    }
    const existTeam = await Sponsor.findOne({ name });
    if (existTeam) {
      return res
        .status(422)
        .json({ error: "Sponsor already exist in our record" });
    }
    const avatar_clod = await cloudinary.uploader.upload(
      image.tempFilePath,
      function (res) {},

      {
        folder: `TGIF/Sponsors/${name}`,
        resource_type: "auto",
        use_filename: true,
      }
    );
    const getSponsor = new Sponsor({
      image: avatar_clod.url,
      name,
      loc,
      desc,
    });
    const newSponsor = await getSponsor.save();
    if (newSponsor) {
      return res
        .status(201)
        .send({ message: "New Sponsor Created", newSponsor });
    }
    return res.status(400).send({ msg: "Fail to Create Sponsor" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

sponsorRouter.put("/:id", async (req, res) => {
  try {
    const { name, loc, desc } = req.body;
    const image = req.files.image;
    if (!name || !loc || !desc) {
      return res.status(422).json({ error: "Fill all required fields" });
    }
    const sponsorId = req.params.id;
    const getSponsor = await Sponsor.findById({ _id: sponsorId });
    if (!getSponsor) {
      return res.status(422).json({ error: "Sponsor Name doesnt exist" });
    }
    const avatar_clod = await cloudinary.uploader.upload(
      image.tempFilePath,
      function (res) {},
      {
        folder: `TGIF/Sponsors/${name}`,
        resource_type: "auto",
        use_filename: true,
      }
    );
    if (getSponsor) {
      getSponsor.name = name;
      getSponsor.image = avatar_clod.url;
      getSponsor.loc = loc;
      getSponsor.desc = desc;

      const saveSponsor = await getSponsor.save();
      if (saveSponsor) {
        return res.status(201).send(saveSponsor);
      }
      return res.status(500).send({ msg: "Error in saving Sponsor" });
    }
    return res.status(500).send({ error: "Error in updating Sponsor" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

sponsorRouter.delete("/:id", async (req, res) => {
  try {
    const getSponsor = await Sponsor.findById(req.body.id);
    if (getSponsor) {
      await getSponsor.remove();
      return res.status(200).send({ msg: "Sponsor Deleted" });
    }
    return res.status(422).send({ msg: "Error in deleting Sponsor" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

module.exports = sponsorRouter;
