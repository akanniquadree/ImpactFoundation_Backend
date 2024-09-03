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

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
