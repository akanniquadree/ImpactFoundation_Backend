const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const cors = require("cors");
const projectRouter = require("./Routes/ProjectRoute");
const Authrouter = require("./Routes/Auth");
const userRouter = require("./Routes/UserRoute");
const postRouter = require("./Routes/PostsRoute");
const categoryRoute = require("./Routes/CategoriesRoute");
const teamRoute = require("./Routes/Team");
const volunteeRouter = require("./Routes/VolunteeRoute");
const eventRouter = require("./Routes/EventRoute");
const galleryRouter = require("./Routes/GalleryRoute");
const sponsorRouter = require("./Routes/SponsorRoute");

dotenv.config();

const app = express();

// const mongodb_url = config.MONGODB_URL
mongoose.connect(process.env.MONGODB_URL, {}, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Connected to Database");
});

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(fileupload({ useTempFiles: true, createParentPath: true }));

app.use("/api/auth", Authrouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/category", categoryRoute);
app.use("/api/team", teamRoute);
app.use("/api/volunteer", volunteeRouter);
app.use("/api/sponsor", sponsorRouter);
app.use("/api/event", eventRouter);
app.use("/api/project", projectRouter);
app.use("/api/gallery", galleryRouter);

app.listen(process.env.PORT || "5000", () => {
  console.log("backend is running effective");
});
