import mongoose from "mongoose"

const sponsorSchema = new mongoose.Schema({
    name: {type:String, required:true},
    image: {type:String, required:true},
    loc: {type:String, required:true},
    desc: {type: String, required: true}
})

const Sponsor = mongoose.model("Sponsor", sponsorSchema)


export default Sponsor;