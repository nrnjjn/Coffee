import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Navlanding = () => {
  return (
    <div className=''>
        <div className='flex flex-wrap fixed w-[100%] justify-between  bg-black text-white/85 p-3  text-[25px]'>
        <div className='fonts flex-1 ps-3 '>
           <button className='font-bold text-gray-400'> Coffee</button>
        </div>
        <div className='flex flex-wrap  text-[20px] flex-1 justify-evenly'>
            <Link to='/'><div>
                Home
            </div></Link>
            <Link to='/userregister'><div>
                User-register

            </div></Link>

            <Link to='/shopregister'><div>
                Shop-register

            </div></Link>

            <Link to='/login'><div className='text-yellow-400'>
                Login

            </div></Link>
            
        </div>
    </div>
    <Outlet></Outlet>
    
    </div>
  )
}

export default Navlanding