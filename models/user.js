import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({

    Name:{
        type:String,
    },
    Email:{
        type:String,
        unique:true
    },
    Password:{
        type:String
    },
    confirmPassword:{
        type:String
    },
    userType:{
        type:String,
    }


})


const User = model('user', userSchema);
export default User;