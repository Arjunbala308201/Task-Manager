import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        minlenght:8,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        default:'user'
    }
})

const userModel = mongoose.model('users',userSchema)
export default userModel