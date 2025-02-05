import React from 'react'
import { Link } from 'react-router-dom'
import { FaChevronCircleLeft } from 'react-icons/fa'
import { IoMdPersonAdd } from 'react-icons/io'
import backgroundimg from '../assets/background2.0.jpeg'

export const GuestPage = () => {
  return (
    <>
        <div className="flex min-h-screen items-center " style={{ backgroundImage: `url(${backgroundimg})`, backgroundSize: 'contain', backgroundPosition: 'center' }}
        >   
            <div className="p-4 sm:p-10 container  sm:mx-auto rounded-2xl bg-transparent sm:flex ">
            <div className="content w-full sm:w-1/2 h-full flex flex-col justify-center sm:items-center gap-5">
            <div className="mt-10 sm:mt-0 text-[30px] sm:text-[45px] font-semibold text-gray-700">
                Welcome to Task Management!
                </div>
                <div className="text-[18px] sm:text-[30px] font-semibold text-gray-700">
                Stay Organized, Stay Productive – Simplify your Tasks!
                </div>
                <div className="text-[15px] sm:text-lg font-medium text-gray-700">
                Manage tasks with ease and boost productivity.
                Stay organized with seamless tracking and collaboration.
                Get things done efficiently, anytime, anywhere."
                </div>
                <div className="w-full flex flex-col gap-5">
                    <Link  to={`/login`}
                    className='w-1/2 sm:w-1/3 transform flex text-center items-center justify-between group hover:w-1/2 bg-gradient-to-r from-[rgb(5,1,77)] to-[rgb(9,9,174)] duration-300 transition-all text-white font-semibold text-[15px] sm:text-[20px] p-3 sm:p-5 rounded-full'>
                        Login
                        <FaChevronCircleLeft className='group-hover:rotate-180 transition-all duration-400 ' />
                    </Link >
                    <Link to={`/signup`} 
                    className='w-1/2 sm:w-1/3 flex justify-between items-center hover:w-1/2 bg-gradient-to-r from-[rgb(5,1,77)] to-[rgb(9,9,174)] duration-300 transition-all text-white font-semibold text-[15px] sm:text-[20px] p-3 sm:p-5 rounded-full'>
                       Signup
                       <IoMdPersonAdd className='h-6 w-6' />
                    </Link>
                </div>

            </div>
            <div className="image w-full sm:w-1/2 ">
                {/* <img src={pngbackgroun} alt="" className='object-contain h-full w-full' /> */}
                </div>
            </div>
        </div>
    </>
  )
}
