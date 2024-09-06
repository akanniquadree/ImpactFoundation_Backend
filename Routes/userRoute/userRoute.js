const express = require("express");
const bcrypt = require("bcrypt");
const Post = require("../../Model/Post.js");
const User = require("../../Model/User.js");

const userRouter = express.Router();

//Update User

userRouter.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  } else {
    res.status(401).send("You can only update your own account");
  }
});
//delete User and all post
userRouter.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.body.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User has been Deleted");
      } catch (error) {
        res.status(500).send({ msg: error.message });
      }
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  } else {
    res.status(401).send("You can only update your own account");
  }
});

//get USer
userRouter.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).send(other);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = userRouter;
