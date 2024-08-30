import express from "express";
import Event from "../../model/EventModel/eventModel.js";
import multer from "multer"

const eventRouter = express.Router()
const storage = multer.diskStorage({
    destination:  (req, file, callback) =>{
        callback(null, "./frontend/public/uploads/")
    },
    filename:  (req, file, callback) =>{
        callback(null,  file.originalname)
    }
})
// const fileFilter = (req, file, cb)=>{
//     if(file.mimetype === "image/jpg" || "image/png"){
//         cb(null, true)
//     }else{
//         cb(new Error("Can only upload jpg and png"), false)
//     }
// }
const upload = multer({
    storage:storage
})


eventRouter.get("/", async(req, res)=>{
    const event = await Event.find().sort({createdAt: 'desc'})
    res.send(event)
})

eventRouter.get("/:id", async(req, res)=>{
        const EventId = req.params.id
        try {
            const getEvent = await Event.findById({_id:EventId})
            if(getEvent){
                res.send(getEvent)
            }else{
                res.status(401).send("The Event does not exist")
            }
       } catch (error) {
            res.status(500).send({msg: error.msg})
        }
})

eventRouter.post("/", upload.single("image"), async(req, res)=>{
    try {
        const newEvent = new Event({
            image: req.file.originalname,
            heading: req.body.heading,
            date: req.body.date,
            month: req.body.month,
            loc: req.body.loc,
            text1: req.body.text1,
            text2: req.body.text2 ,
            require: req.body.require,
            starTime:req.body.starTime ,
            phone: req.body.phone ,
        })
        const saveEvent = await newEvent.save()
        if(saveEvent){
            res.status(200).send({msg: "Event Successfully Created"})
        }else{
            res.status(401).send({msg: "Error in creating event"})
        }
    } catch (error) {
        res.status(500).send({msg: error.msg})
    }
})

eventRouter.delete("/:id", async(req, res)=>{
    try {
        const getEvent = await Event.findById(req.params.id)
        if(getEvent){
            await getEvent.remove();
            res.send("Event Successfully Deleted")
        }else{
            res.status(401).send({msg: "Error in deleting Event"})
        }
    } catch (error) {
        res.status(500).send({msg: error.msg})
    }
})



export default eventRouter;