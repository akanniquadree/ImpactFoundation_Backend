import express from "express"
import Team from "../../model/TeamModel/teamModel.js"
import multer from "multer"

const teamRoute = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, "./frontend/public/uploads/");
    },
    filename:  (req, file, callback)=> {
        callback(null, file.originalname);
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



teamRoute.get("/", async(req, res)=>{
    const teams = await Team.find({})
    res.send(teams)
})

teamRoute.get("/:id", async(req, res)=>{
    const team = await Team.findById(req.body.id)
    res.send(team)
})

teamRoute.post("/", upload.single("articleImage"), async(req, res)=>{
    try{ 
        const team = new Team({
        name: req.body.name,
        articleImage: req.file.originalname,
        post: req.body.post,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        instagram: req.body.instagram
        })
        const saveTeam = await team.save()
        if(saveTeam){
        return res.status(201).json({msg: "New Team member uploaded", data: saveTeam})
        }
        return res.status(500).json({message: "Error in creating team member"})
    }catch(error){
        res.status(400).send({message: error.message})
    }
})


teamRoute.put("/:id", async(req, res)=>{
    try {
        const TeamId = req.params.id;
        const getTeam = await Team.findById({_id:TeamId})
        if(getTeam){
            getTeam.articleImage= req.file.originalname;
            getTeam.name= req.body.name;
            getTeam.post= req.body.post;
            getTeam.facebook= req.body.facebook,
            getTeam.twitter= req.body.twitter,
            getTeam.instagram= req.body.instagram
            const updatedTeam = await getTeam.save();
            if(updatedTeam){
                return res.status(200).send({message: "Team member Updated", data: updatedTeam})
            }
    }
        return res.status(500).send({message: "Error in updating Team member"})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

teamRoute.delete("/:id", async(req, res)=>{
    const deleteTeam = await Team.findById(req.params.id)
    if(deleteTeam){
        await deleteTeam.remove()
        res.send({message: "Product Deleted"})
    }
    res.status(400).send({message: "Error in deleting Team member"})
})



export default teamRoute;