import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Usernav = () => {

    const navigate = useNavigate()
    let id=localStorage.getItem('id')
    const [user, setUser] = useState('')
    useEffect(() => {
      let token = localStorage.getItem('token')
      console.log(token,'token received');
      let fetchData = async () => {
        try {
          let response = await axios.get(`http://localhost:4000/user/view/${id}`,{
            headers: {
            Authorization:token
            }
            })
            console.log(response);
            setUser(response.data)
      }
      catch (e) {
      console.log(e.response.data);
      navigate('/login')
      }}
      fetchData()
    },[])
  
    let logout = () => {
      localStorage.removeItem('id')
      localStorage.removeItem('Email')
      localStorage.removeItem('token')
      navigate('/login')
    }

  return (
    <div>
        <div className='flex flex-wrap fixed w-[100%] justify-between  bg-black text-white/85 p-3  text-[25px]'>
        <div className='fonts flex-1 ps-3 '>
       <button className='font-bold text-gray-400'> Coffee</button>
    </div>
    <div className='flex flex-wrap  text-[20px] flex-1 justify-end gap-20 me-10'>
        <Link to='/usernav'><div>
            Home
        </div></Link>
        <Link to='uviewproduct'><div>
            Products

        </div></Link>

        <Link to='uviewbooking'><div>
            Bookings

        </div></Link>

    <div>
      <button className='text-yellow-400' onClick={logout}>Logout</button>
      </div>

        
    </div>
        </div>
        <Outlet></Outlet>
    </div>
  )
}

export default Usernav