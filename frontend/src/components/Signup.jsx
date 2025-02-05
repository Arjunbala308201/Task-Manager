import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setUser } from '../redux/userSlice'
import { useDispatch } from 'react-redux'
import opaqedbackground from '../assets/background2.0.jpeg'

export const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData,setformData] = useState({
        email:'',
        password:''
    })

    const handleChange= (e)=>{
        const {name,value}  = e.target
        setformData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const createNewAccount = async(e)=>{
        e.preventDefault()
        console.log(formData,'will send ot api')
        if(formData.email.trim()!==''||formData.password.trim()!==''){
            try {
                const response = await axios.post(`http://localhost:4000/guest/signup`,formData)
                if(response.data.toast==='success'){
                    console.log(response.data)
                    toast.success(response.data.message)
                    dispatch(setUser(response.data.data))
                    navigate('/home')
                }
                if(response.data.toast=='warning'){
                    toast.warning(response.data.message)
                }
                if(response.data.toast==='error'){
                    toast.error(response.data.message)
                }
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
        }else{
                toast.warning('Plase fill the Inputs')
            }
    }
  return (
    <>
        <div className="flex min-h-screen items-center " style={{ backgroundImage: `url(${opaqedbackground})`, backgroundSize: 'contain', backgroundPosition: 'center' }}
        >             <div className="w-[400px] mx-auto bg-gray-100 p-5 rounded-2xl">
                <div className="heading text-gradient-to-r from-[rgb(49,80,148)] to-[rgb(9,9,174)]">Sign Up</div>
                <form action="submit" className="form">
                    <input onChange={handleChange} required="" className="input" type="email" name="email" id="email" placeholder="E-mail"/>
                    <input onChange={handleChange} required="" className="input" type="password" name="password" id="password" placeholder="Password"/>
                    <span className="forgot-password">Forgot Password ?</span>
                    <button className="login-button bg-gradient-to-r from-[rgb(5,1,77)] to-[rgb(9,9,174)]" type="submit" onClick={createNewAccount}>
                        Sign Up
                    </button>
                </form>
                <span className="agreement">Already Have an account, <Link to={`/login`}> Login here</Link></span>
            </div>
        </div>
    </>
  )
}
