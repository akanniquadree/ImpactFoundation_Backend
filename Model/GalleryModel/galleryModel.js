const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    imgs: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const GalleryModel = mongoose.model("Gallery", gallerySchema);

module.exports = GalleryModel;
