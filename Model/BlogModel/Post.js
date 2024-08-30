import mongoose from "mongoose"


const PostSchema = new mongoose.Schema({
    image: {type: String, required: true},
    heading: {type: String, required: true, unique:true},
    author: {type:String, required: true},
    firstPara: {type:String, required: true},
    secondPara: {type:String, required: false},
    thirdPara: {type:String, required: false},
    fourthPara: {type:String, required: false},
    detail:{type: String, default: ""},
    categories: { type: Array, required: false},
    comment: { type: Array, required: false}
},
{timestamps: true}
)
 

const Post = mongoose.model("Post", PostSchema)


export default Post;