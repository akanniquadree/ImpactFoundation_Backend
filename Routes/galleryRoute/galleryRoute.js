import Gallery from "../../model/GalleryModel/galleryModel.js"
import express from "express"
import multer from "multer"


const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, "./frontend/public/images/")
    },
    filename: (req, file, callback)=>{
        callback(null, file.originalname)
    }
})

const upload = multer({storage:storage})

const galleryRouter = express.Router()




galleryRouter.get("/", async(req, res)=>{
    const gallerys = await Gallery.find({}).sort({createdAt:"desc"})
    res.send(gallerys)
})

galleryRouter.get("/:id", async(req, res)=>{
    const galleryId = req.params.id
    const gallery = await Gallery.findById({_id:galleryId})
    res.send(gallery)
})

galleryRouter.post("/", upload.single("img"), async(req, res)=>{
    try {
       const newGallery = new Gallery({
        img: req.file.originalname
        })
        const savedGallery = await newGallery.save()
        if(savedGallery){
            return res.status(200).send(savedGallery)
        }
        return res.status(400).send("Error In Saving Picture") 
    } catch (error) {
        res.status(500).send({msg:error.msg})
    }
})

galleryRouter.delete("/:id", async(req, res)=>{
        const galleryId = req.params.id
    try {
        const getGallery = await Gallery.findById(req.params.id)
        if(getGallery){
            const deleteGallery  = await getGallery.remove()
                if(deleteGallery){
                    res.send({msg: "Delete Successful"})
                }
                    res.send({msg: "error in deleting"})
        }
       
    } catch (error) {
        res.status(500).send({msg:error.msg})
    }
})


export default galleryRouter;