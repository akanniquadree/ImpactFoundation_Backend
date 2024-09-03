import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute/userRoute.js";
import postRouter from "./routes/blogRoute/postsRoute.js";
import categoryRoute from "./routes/blogRoute/categoriesRoute.js";
import volunteeRouter from "./routes/volunteeRoute/volunteeRoute.js";
import sponsorRouter from "./routes/sponsorRoute/sponsorRoute.js";
import projectRouter from "./routes/projectRoute/projectRoute.js";
import galleryRouter from "./routes/galleryRoute/galleryRoute.js";
import fileupload from "express-fileupload";
import cors from "cors";
import teamRoute from "./Routes/teamRoute/team.js";
import eventRouter from "./Routes/eventRoute/eventRoute.js";
import Authrouter from "./routes/userRoute/auth.js";

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
