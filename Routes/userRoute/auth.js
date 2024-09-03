import express from "express";
import User from "../../model/UserModel/User.js";
import bcrypt from "bcrypt";
import { getToken } from "../../util.js";

const Authrouter = express.Router();

Authrouter.post("/register", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if (!username || !name || !email || !password) {
      return res.status(422).json({ error: "Fill all Required Fields" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    if (user) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: getToken(user),
      });
    } else {
      res.status(401).send({ msg: "Invalid User Data" });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

Authrouter.post("/login", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(422).json({ error: "Fill all Required Fields" });
    }
    const user = await User.findOne({ username });
    const validate = await bcrypt.compare(req.body.password, user.password);
    // const {password, ...others} = user._doc;
    if (!user) {
      res.status(401).send("Invalid Credentials");
    } else if (!validate) {
      res.status(401).send("Invalid Credentials");
    } else {
      res.status(200).send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: getToken(user),
      });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

Authrouter.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "TGIF",
      username: "TGIF",
      email: "akanniquadry@yahoo.com",
      password: "TGIF",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default Authrouter;
