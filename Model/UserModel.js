const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
    },
    username:{
        type:String,
        required:true,
        max:10,
        min:3,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    verify:{
        type:Boolean,
        default:false
    },
    followers:{
        type:Array,
        default:[]
    }, 
    followering:{
        type:Array,
        default:[]
    },
    profPic:{
        type:String,
        default:""
    }, 
    coverPic:{
        type:String,
        default:""
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relation:{
        type:Number,
        enum:[1,2,3],
    }
},
{timestamps:true}
)


const UserModel = mongoose.model("Users", userSchema)

module.exports = UserModel