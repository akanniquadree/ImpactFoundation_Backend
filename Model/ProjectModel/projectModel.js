import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({
    image: {type:String, required: true},
    heading: {type:String, required: true},
    desc: {type:String, required: true},
    goal: {type:Number, required: false},
    raised: {type:Number, required: false},
},
{timestamps:true}
)

const Project = mongoose.model("Project", projectSchema)


export default Project;