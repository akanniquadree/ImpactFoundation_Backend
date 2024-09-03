const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const cors = require("cors");
const Authrouter = require("./Routes/userRoute/auth.js");
const userRouter = require("./Routes/userRoute/userRoute.js");
const eventRouter = require("./Routes/eventRoute/eventRoute.js");
const projectRouter = require("./Routes/projectRoute/projectRoute.js");
const volunteeRouter = require("./Routes/volunteeRoute/volunteeRoute.js");
const teamRoute = require("./Routes/teamRoute/team.js");
const galleryRouter = require("./routes/galleryRoute/galleryRoute.js");
const sponsorRouter = require("./Routes/sponsorRoute/sponsorRoute.js");
const categoryRoute = require("./Routes/blogRoute/categoriesRoute.js");
const postRouter = require("./Routes/blogRoute/postsRoute.js");

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
