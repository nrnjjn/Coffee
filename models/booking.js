import mongoose, { Schema, model } from "mongoose";
import User from "./user.js";
import Product from "./product.js";

const bookingSchema = new Schema({

    
    totalAmount:{
        type:Number,
        default:0
    },
    Quantity:{
        type:Number,
        default:1
    },
    shopId:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:Product
    },
    Date:{
        type:Date,
        default:Date.now
    },
    Status:{
        type:String,
        default:"pending"
    }

})


const Booking = model('booking', bookingSchema);
export default Booking;