import mongoose  from "mongoose";


const eventSchema = new mongoose.Schema({
    image: {type:String, required: true},
    heading: {type:String, required: true},
    date: {type:Number, requied: true},
    month: {type:String, required: true},
    loc: {type:String, required: true},
    text1: {type:String, required: true},
    text2: {type:String, required: false},
    require: {type:String, required: false},
    starTime: {type:String, required: false},
    phone: {type:String, required: false},
},
{timestamps:true}
)

const Event = mongoose.model("Event", eventSchema)


export default Event;