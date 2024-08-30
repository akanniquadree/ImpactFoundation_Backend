import express from "express"
import Sponsor from "../../model/SponsorModel/sponsorModel.js"
import multer from "multer"

const storage = multer.diskStorage({
    destination:  (req, file, callback) => {
        callback(null, "./frontend/public/uploads/")
    },
    filename: (req, file, callback) => {
        callback(null,  file.originalname)
    }
})

const upload = multer({
    storage:storage
})
const sponsorRouter = express.Router()

sponsorRouter.get("/", async(req, res)=>{
    const sponsor = await Sponsor.find({})
        res.status(200).send(sponsor)
})

sponsorRouter.post("/", upload.single("image"), async(req, res)=>{
    try {
       const getSponsor = new Sponsor({
        image: req.file.originalname,
        name: req.body.name,
        loc: req.body.loc,
        desc: req.body.desc
    })
    const newSponsor = await getSponsor.save() 
    if(newSponsor){
        res.status(200).send({message: "New Product Created", data: newSponsor})
    }
    res.status(400).send({msg: "Fail to Create Sponsor"})
    } catch (error) {
        res.status(500).send({msg: error.msg})
    }
})

sponsorRouter.put("/:id",upload.single("image"), async(req, res)=>{
   
    try { 
        const sponsorId = req.params.id;
        const getSponsor = await Sponsor.findById({_id:sponsorId})
        if(getSponsor){
            getSponspor.name = req.body.name;
            getSponspor.image = req.file.originalname;
            getSponspor.loc = req.body.loc;
            getSponspor.desc = req.body.desc;

            const saveSponsor = await getSponsor.save()
            if (saveSponsor){
                res.status(200).send(saveSponsor)
            }
            res.status(500).send({msg: 'Error in saving Sponsor'})
        }
        res.status(500).send({msg: 'Error in updating Sponsor'})
    } catch (error) {
        res.status(400).send({msg: error.msg})
    }
})

sponsorRouter.delete("/:id", async(req, res)=>{
    try {
        const getSponsor = await Sponsor.findById(req.body.id)
        if(getSponsor){
           await getSponsor.remove()
            res.status(200).send({msg: "Sponsor Deleted"})
        }
        res.status(500).send({msg:"Error in deleting Sponsor"})
    } catch (error) {
        res.status(400).send({msg: error.msg})
    }
})


export default sponsorRouter