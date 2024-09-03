import express from "express";
import Event from "../../Model/EventModel/eventModel.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const eventRouter = express.Router();

eventRouter.get("/", async (req, res) => {
  const event = await Event.find().sort("-updateAt");
  res.send(event);
});

eventRouter.get("/:id", async (req, res) => {
  const EventId = req.params.id;
  try {
    const getEvent = await Event.findById({ _id: EventId });
    if (getEvent) {
      res.send(getEvent);
    } else {
      res.status(401).send("The Event does not exist");
    }
  } catch (error) {
    res.status(500).send({ msg: error.msg });
  }
});

eventRouter.post("/", async (req, res) => {
  try {
    const {
      heading,
      date,
      loc,
      text1,
      text2,
      require,
      starTime,
      stopTime,
      phone,
    } = req.body;
    const image = req.files.image;
    if (
      !heading ||
      !date ||
      !loc ||
      !text1 ||
      !require ||
      !starTime ||
      !stopTime ||
      !phone
    ) {
      return res.status(422).json({ error: "Fill all required fields" });
    }
    const existEvent = await Event.findOne({ heading });
    if (existEvent) {
      return res
        .status(422)
        .json({ error: "Event already exist in our record" });
    }
    const avatar_clod = await cloudinary.uploader.upload(
      image.tempFilePath,
      function (res) {},
      {
        folder: `TGIF/Events/${heading}`,
        resource_type: "auto",
        use_filename: true,
      }
    );
    const newEvent = new Event({
      image: avatar_clod.url,
      heading,
      date,
      loc,
      text1,
      text2,
      require,
      starTime,
      phone,
      stopTime,
    });
    const saveEvent = await newEvent.save();
    if (saveEvent) {
      res.status(200).send({ msg: "Event Successfully Created", saveEvent });
    } else {
      res.status(401).send({ msg: "Error in creating event" });
    }
  } catch (error) {
    res.status(500).send({ msg: error.msg });
  }
});

eventRouter.put("/:id", async (req, res) => {
  try {
    const {
      heading,
      date,
      loc,
      text1,
      text2,
      require,
      starTime,
      stopTime,
      phone,
    } = req.body;
    const image = req.files.image;
    if (
      !heading ||
      !date ||
      !loc ||
      !text1 ||
      !require ||
      !starTime ||
      !stopTime ||
      !phone
    ) {
      return res.status(422).json({ error: "Fill all required fields" });
    }
    const EventId = req.params.id;
    const getEvent = await Event.findById({ _id: EventId });
    if (!getEvent) {
      return res.status(422).json({ error: "Event doesnt exist" });
    }
    const avatar_clod = await cloudinary.uploader.upload(
      image.tempFilePath,
      function (res) {},
      {
        folder: `TGIF/Events/${heading}`,
        resource_type: "auto",
        use_filename: true,
      }
    );
    if (getEvent) {
      getEvent.image = avatar_clod.url;
      getEvent.heading = heading;
      getEvent.date = date;
      (getEvent.loc = loc), (getEvent.text1 = text1), (getEvent.text2 = text2);
      (getEvent.starTime = starTime),
        (getEvent.stopTime = stopTime),
        (getEvent.phone = phone);
      getEvent.require = require;
      const updatedEvent = await getEvent.save();
      if (updatedEvent) {
        return res
          .status(201)
          .send({ message: "Event member Updated", updatedEvent });
      }
    }
    return res.status(422).send({ message: "Error in updating Event " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "error" });
  }
});

eventRouter.delete("/:id", async (req, res) => {
  try {
    const getEvent = await Event.findById(req.params.id);
    if (getEvent) {
      await getEvent.remove();
      res.send("Event Successfully Deleted");
    } else {
      res.status(401).send({ msg: "Error in deleting Event" });
    }
  } catch (error) {
    res.status(500).send({ msg: error.msg });
  }
});

export default eventRouter;
