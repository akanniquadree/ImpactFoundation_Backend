const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePics: { type: String, default: "" },
    isAdmin: { type: String, required: true, default: "00u00" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
