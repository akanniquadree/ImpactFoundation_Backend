const express = require("express");
const multer = require("multer");
const Post = require("../../Model/BlogModel/Post.js");

const postRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./upload/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
//Create Post
postRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    const newPost = new Post({
      image: req.file.path,
      heading: req.body.heading,
      author: req.body.author,
      firstPara: req.body.firstPara,
      secondPara: req.body.secondPara,
      thirdPara: req.body.thirdPara,
      fourthPara: req.body.fourthPara,
      detail: req.body.detail,
      categories: req.body.categories,
    });
    const savePost = await newPost.save();
    res.status(200).send(savePost);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

//Get All Post or query
postRouter.get("/", async (req, res) => {
  const author = req.query.author;
  const catName = req.query.cat;
  try {
    let posts;
    if (author) {
      posts = await Post.find({ author }).sort({ createdAt: "desc" });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      }).sort({ createdAt: "desc" });
    } else {
      posts = await Post.find().sort({ createdAt: "desc" });
    }
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});
postRouter.get("/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById({ _id: postId });
    if (post) {
      res.send(post);
    } else {
      res.status(401).send("The Post does not exist");
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});
//updatePost

postRouter.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const getPost = await Post.findById(req.params.id);
    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).send(getPost);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

//delete Post
postRouter.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      const deletePost = await post.remove();
      if (deletePost) {
        res.status(200).send("Post deleted");
      } else {
        res.status(400).send("Error in deleting Post");
      }
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

module.exports = postRouter;
