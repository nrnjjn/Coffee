import express from 'express'
import User from '../models/user.js'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import Product from '../models/product.js'
import Booking from '../models/booking.js'

const router=express()


router.post('/register', async(req,res)=>{
    try{
        const{Name,Password}=req.body
        let hashedPassword=await bcrypt.hash(Password,10)
        console.log(hashedPassword);

        req.body={...req.body,Password:hashedPassword}

        console.log(req.body);
        const newUser = new User(req.body)
        const savedUser = await newUser.save();
        console.log(newUser,'new user');
        res.json({message:"Registration",savedUser})
    }
    catch(e){
        console.log(e)
        res.json(e.message)
    }
})


let verifyToken=(req,res,next)=>{
    try{
        console.log(req.headers.authorization)
        let response=jwt.verify(req.headers.authorization,'dsd')
        console.log(response)
        next()     
    }
    catch(e){
        res.status(401).json(e.message)
    }
}



router.post('/login',async(req,res)=>{
    try{
    console.log(req.body);
    const {Email,Password}=req.body
    let users=await User.findOne({Email:Email})
    if(!users){
        return res.status(402).json('Invalid username or password')
    }
    let matchPassword=await bcrypt.compare(Password, users.Password)
    console.log(users);
    if(!matchPassword){
        console.log('jy');
        return res.status(402).json('Invalid username or password')
    }
    let token=jwt.sign({id:users._id,Name:users.Name},'dsd')
    console.log(token,'token generate');
    res.json({users,token})
}
catch(e){
    res.json(e.message)
}
})

router.get('/view/:id',verifyToken,async(req,res)=>{
    let id = req.params.id
    let users=await User.findById(id)
    console.log(users);
    res.json(users)
})


router.get('/viewproduct',async(req,res)=>{
    try{
    console.log(req.body);
    let response=await Product.find()
    console.log(response)
    res.json(response)
    }
    catch(e){
        res.json(e.message)
    }
})


router.get('/viewprodd/:id',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(id);
    let response=await Product.findById(id)
    console.log(response)
    res.json(response)
}
catch(e){
    res.json()
}

})


router.post('/postbooking',async(req,res)=>{
    try{
    let id=req.params.id
    console.log(req.body);
    const newPostbooking = new Booking(req.body)
    const savedPostbooking = await newPostbooking.save();
    res.json({message:"Booking",savedPostbooking})
    }
    catch(e){
        res.json(e.message)
            }
})


router.get('/viewbooking/:id',async(req,res)=>{
    try{
        let id=req.params.id
        console.log(id);
        let response=await Booking.find({userId:id})
        console.log(response)   
        let responsedata=[];
    for (const newresponse of response){
        let product=await Product.findById(newresponse.productId);
        responsedata.push({
            product:product,
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


export default router