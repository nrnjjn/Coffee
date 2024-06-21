import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import  { toast } from 'react-toastify';

const Addproduct = () => {

  let id=localStorage.getItem('id')
  console.log(id,'-------------------');
  const navigate=useNavigate()
  const [data,setData]=useState('')

  let handleChange=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }

  
  let handlefile=(event)=>{
    console.log(event.target.files);
    setData({...data,[event.target.name]:event.target.files[0]})
    console.log(data);
  }


  let handleSubmit=async (event)=>{
    event.preventDefault()
    let formData = new FormData();
        formData.append('Pname', data.Pname);
        formData.append('Price', data.Price);
        formData.append('Description', data.Description);
        formData.append('Image', data.Image);
        formData.append('shopId', id);
    setData(data)
    console.log(data);
    toast.success('New product added')
    let response=await axios.post(`http://localhost:4000/shop/addproduct`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data' 
      }})
       console.log(response);
  }


  return (
    <div className='addanc flex flex-wrap flex-col'>
         <div className='text-center pt-20  text-3xl pb-8 text-white '>
          New Product
         </div>
         <form onSubmit={handleSubmit}>
         <div className='m-auto w-fit '>
          <div className='flex  flex-row pb-3 flex-wrap justify-center'>
            
            <input onChange={handleChange} required name='Pname' type="text" placeholder='Pname' className='w-[80%] bg-transparent  placeholder:text-white border-2 rounded placeholder:text-[20px] border-white text-white h-9 placeholder:text-center' />
          </div>
          
          <div className='flex  flex-row pb-3 flex-wrap justify-center'>
            <input onChange={handleChange} required name='Price' type="number" placeholder='Price' className='w-[80%] bg-transparent  placeholder:text-white border-2 rounded placeholder:text-[20px] border-white text-white h-9 placeholder:text-center' />
          </div>
          
          <div className='flex flex-row flex-wrap justify-center pb-3'>
            <textarea onChange={handleChange} required name="Description" id="" cols="30" rows="10" placeholder='Description' className='w-[80%] bg-transparent placeholder:text-white placeholder:text-[25px]  border-2 rounded border-white text-white placeholder:text-center'></textarea>
          </div>

          <div className='flex flex-row pb-3 flex-wrap justify-around'>
          <label htmlFor="" className='text-white text-lg'>Image: </label>
          <input onChange={handlefile} required name='Image'  class="block w-[50%]  text-gray-900  border-white rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 border-2" id="file_input" type="file"/>
          </div>
          <button type='submit' className='text-white bg-black rounded p-2 ml-32 mt-1'>Submit</button>
         </div>
         </form>
    </div>
  )
}

export default Addproduct