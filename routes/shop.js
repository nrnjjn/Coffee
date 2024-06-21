import express from 'express'
import Product from '../models/product.js'
import { upload } from '../multer.js'
import User from '../models/user.js'
import Booking from '../models/booking.js'

const router=express()

router.post('/addproduct',upload.single('Image'),async(req,res)=>{
    try{
    console.log(req.file)
    let imagepath=req.file.filename
    const newProduct = new Product({...req.body,Image:imagepath})
    const savedProduct = await newProduct.save();
    res.json({message:"New Product",savedProduct})
    }
    catch(e){
        res.json(e.message)
    }
})

router.put('/editproduct/:id',upload.fields([{name:'Image'}]),async(req,res)=>{
    try{
    if(req.files['Image']){
        const image =  req.files['Image'][0].filename;  
        console.log(image)
        req.body={...req.body,Image:image}
    }
    let id=req.params.id
    console.log(req.body)
    let response=await Product.findByIdAndUpdate(id,req.body)
    res.json(response)
}
catch(e){
    res.json(e.message)
}
})


router.delete('/deletproduct/:id',async(req,res)=>{
    let id=req.params.id
    let response=await Product.findByIdAndDelete(id)
})

router.get('/viewproduct/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    let response=await Product.find({shopId:id})
    console.log(response);
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})


router.get('/viewbooking/:id',async(req,res)=>{
    try{
        let id=req.params.id
        console.log(id);
        let response=await Booking.find({shopId:id})
        console.log(response)   
        let responsedata=[];
    for (const newresponse of response){
        let product=await Product.findById(newresponse.productId);
        let usr=await User.findById(newresponse.userId)
        responsedata.push({
            product:product,
            user:usr,
            req:newresponse
        })
    }
    console.log(responsedata)
    res.json(responsedata)
    }
    catch(e){
        res.json(e.message)
    }
})


router.put('/managebooking/:id',async (req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    console.log(req.body)
    let response=await Booking.findByIdAndUpdate(id,req.body)
    console.log(response);
    }
    catch(e){
        res.json(e.message)
    }
})

export default router