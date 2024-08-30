import mongoose from "mongoose"

const volunteeSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true, index:true, dropDups:true},
    phone: {type:Number, required: true},
    add: {type:String, required: true},
    dob: {type: String, required: true},
    occu:{type:String, required:false},
    mess:{type:String, required:false},

},
{timestamps:true}
)

const VolunteeModel = mongoose.model("Voluntee", volunteeSchema)


export default VolunteeModel;
