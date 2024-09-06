const express = require("express");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const GalleryModel = require("../Model/GalleryModel.js");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const galleryRouter = express.Router();

galleryRouter.get("/", async (req, res) => {
  const gallerys = await GalleryModel.find({}).sort({ createdAt: "desc" });
  res.send(gallerys);
});

galleryRouter.get("/:id", async (req, res) => {
  const galleryId = req.params.id;
  const gallery = await Gallery.findById({ _id: galleryId });
  res.send(gallery);
});

galleryRouter.post("/", async (req, res) => {
  try {
    var uploadRes = [];

    for (let i = 0; i < req.files.imgs.length; i++) {
      let img = req.files.imgs[i];
      await cloudinary.uploader.upload(
        img.tempFilePath,
        function (res) {
          uploadRes.push(res);
        },
        {
          folder: `TGIF/Gallery`,
          resource_type: "auto",
          use_filename: true,
        }
      );
    }
    const newGallery = new Gallery({
      imgs: uploadRes.map((item) => item.url),
    });
    const savedGallery = await newGallery.save();
    if (savedGallery) {
      return res
        .status(200)
        .json({ msg: "Images saved successfully", savedGallery });
    }
    return res.status(400).send("Error In Saving Picture");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

galleryRouter.delete("/:id", async (req, res) => {
  const galleryId = req.params.id;
  try {
    const getGallery = await Gallery.findById(req.params.id);
    if (getGallery) {
      const deleteGallery = await getGallery.remove();
      if (deleteGallery) {
        res.send({ msg: "Delete Successful" });
      }
      res.send({ msg: "error in deleting" });
    }
  } catch (error) {
    res.status(500).send({ msg: error.msg });
  }
});

module.exports = galleryRouter;
