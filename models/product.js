import mongoose, { Schema, model } from "mongoose";
import User from "./user.js";


const productSchema = new Schema({

    Pname:{
        type:String,
    },
    Description:{
        type:String,
    },
    Price:{
        type:Number,
    },
    Image:{
        type:String,
    },
    shopId:{
        type:mongoose.Types.ObjectId,
        ref:User
    },
    Date:{
        type:Date,
        default:Date.now
    }

})


const Product = model('product', productSchema);
export default Product;