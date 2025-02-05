import mongoose from "mongoose"
import userModel from "../Model/userModel.js"
import bcrypt from 'bcrypt'

export const SignUp = async(req,res)=>{
    try {
        const {email,password} = req.body
        console.log(email,password)
        const alreadyExists = await userModel.findOne({email:email})
        if(alreadyExists){
            console.log('alerady exist')
            res.status(200).send({toast:'error',message:'email already taken'})
        }else{
            console.log(password.length,'password length')
            if(password.length<8){
                console.log('password must be atleast 8 charecters')
                res.status(200).send({toast:'warning',message:'password must be atleast 8 charecters'})
            }
            else{
                const hashedPassword = await bcrypt.hash(password,5)
                console.log(hashedPassword)
                const newUser = {email,password:hashedPassword}
                console.log(newUser)
                const crateNewuser = await userModel.create(newUser)
                if(crateNewuser){
                    console.log(crateNewuser,'user crated')
                    res.status(200).send({toast:'success',message:"user created successfully",data:crateNewuser})
                }
            }
        }

    } catch (error) {
        console.log(error.message)
        res.status(200).send({message:error.message})
    }
}

export const Login = async(req,res)=>{
    try {
        const{email,password} = req.body
        console.log(email,password)
        const existingUser = await userModel.findOne({email:email})
        console.log(existingUser,'user found')
        if(existingUser){

            if(await bcrypt.compare(password,existingUser.password)){
                if(existingUser.role==='admin'){
                    res.status(200).send({message:'Admin Access Granted',toast:'success',data:existingUser})
                }if(existingUser.role==='user'){
                    res.status(200).send({message:'Login successfully',toast:'success',data:existingUser})
                }
            }else{
                res.status(200).send({message:'Incorrect Password',toast:'error'})
            }
        }else{
            console.log('user not found')
            res.status(200).send({message:"User Not found",toast:'error'})
        }
    } catch (error) {
        console.log(error.message)
        res.send({message:error.message})
    }
}

export const fetchAllUsers = async(req,res)=>{
    try {
        const allUsers = await userModel.find({ role:'user' })
        res.send({message:`${allUsers.length} Users Found`,data:allUsers})
    } catch (error) {
        console.log(error.message)
        res.status(400).send({message:error.message,toast:'error'})
    }
}

export const deleteUserById=async(req,res)=>{
    try {
        const userId = req.params.id
        console.log(userId,'userID')
        const deletetedUser = await userModel.findByIdAndDelete(userId)
        if(deletetedUser){
            res.status(200).send({message:'User Deleted Succesfully'})
        }
        else{
            req.send({message:'Error Ocuured while deleting'})
        }
    } catch (error) {
        console.log(error.message)
        res.send({message:error.message})
    }
}