const express = require("express");
const VolunteeModel = require("../../model/volunteeModel/volunteeModel.js");

const volunteeRouter = express.Router();

volunteeRouter.post("/", async (req, res) => {
  try {
    const newVolunter = new VolunteeModel({
      name: req.body.name,
      email: req.body.email,
      msg: req.body.msg,
      phone: req.body.phone,
      add: req.body.add,
      dob: req.body.dob,
      occu: req.body.occu,
    });
    const voluntee = await newVolunter.save();
    if (voluntee) {
      res.status(200).send(voluntee);
    } else {
      res.status(500).send("Cannot Send Message");
    }
  } catch (error) {
    res.status(400).send({ msg: error.msg });
  }
});

volunteeRouter.delete("/:id", async (req, res) => {
  try {
    const getVolunter = await VolunteeModel.findById(req.body.id);
    if (getVolunter) {
      await getVolunter.remove();
      res.status(200).send({ msg: "Volunteer Deleted" });
    }
    res.status(500).send({ msg: "Error in deleting Volunteer" });
  } catch (error) {
    res.status(400).send({ msg: error.msg });
  }
});

module.exports = volunteeRouter;
