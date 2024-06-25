import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'


const app=express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/coffee')
  .then(() => console.log('Connected!'));

import shopRouter from './routes/shop.js'
import userRouter from './routes/user.js'

app.use('/uploads', express.static('uploads'));

app.use('/shop',shopRouter)
app.use('/user',userRouter)


// app.listen(4000)

const port = process.env.port || 4000;

app.listen(port,()=>console.log("Server is running on port 4000"));
