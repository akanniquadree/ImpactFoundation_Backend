import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique:true},
    email: {type:String, required: true, unique:true },
    password: {type:String, required: true},
    profilePics:{type: String, default: ""},
    isAdmin:{type:Boolean, required: true, default: false}
},
{timestamps: true}
)
 

const userModel = mongoose.model("User", UserSchema)


export default userModel;