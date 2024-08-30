import express from "express"
import User from "../../model/UserModel/User.js"
import bcrypt  from "bcrypt"
import { getToken } from "../../util.js"

const router = express.Router()

router.post("/register", async (req, res)=>{
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const user = await newUser.save()
        if(user){
            res.send({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: getToken(user)
            })
        }else{
            res.status(401).send({msg: "Invalid User Data"})
        }
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
})

router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        const validate = await bcrypt.compare(req.body.password, user.password)
        // const {password, ...others} = user._doc;
        if(!user){
            res.status(401).send("Invalid Email");
        }
        else if(!validate){
            res.status(401).send("Invalid Password");
        }else{
            res.status(200).send({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: getToken(user)
            })
        }
    }catch(error){
        res.status(500).send({msg: error.message})
    }
})

router.get("/createadmin", async (req, res)=>{
    try {
        const user = new User ({
            name: "TGIF",
            username: "TGIF",
            email: "akanniquadry@yahoo.com",
            password: "TGIF",
            isAdmin:true
        })
        const  newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ msg: error.message })
    }
    
})



export default router;