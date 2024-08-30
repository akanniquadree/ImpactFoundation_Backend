import express from "express"
import Category from "../../model/BlogModel/Category.js"


const categoryRoute  = express.Router()

categoryRoute.post("/", async (req, res)=>{
    try {
        const newCat = new Category(req.body)
        const saveCat = await newCat.save()
        res.status(200).send(saveCat) 
    } catch (error) {
        res.status(500).send({msg: error.msg})
        
    }
})

categoryRoute.get("/", async(req, res)=>{
        try{
            const cats = await Category.find().sort({createdAt: "desc"})
            res.status(200).send(cats)
        }catch(error){
            res.status(500).send({msg: error.msg})
        }
})



export default categoryRoute