import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiLogout, CiSearch } from "react-icons/ci";
import { clearStore } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AdminPanel = () => {
    const [data, setData] = useState([]);
    const dispatch= useDispatch()
    const userId = useSelector(state=>state.user)?._id
    const navigate= useNavigate()
    useEffect(()=>{
        console.log(userId,'userid from redux')   
        fetchTasks();
    },[])

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`https://task-manager-3-s6g7.onrender.com/admin/fetch`);
            setData(response.data.data);
            console.log('response',response);
        } catch (error) {
            console.log('error',error);
        }
    };
    const deleteUser =async(id)=>{
        try {
            console.log(id,'from functino')
            const response = await axios.delete(`https://task-manager-3-s6g7.onrender.com/admin/delete/${id}`)
            console.log(response.data,'response data')
            fetchTasks()
            toast.success('User Deleted')
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    
            const logout = async()=>{
               await dispatch(clearStore())
                console.log('store cleared')
                console.log(userId,'from redux')
                navigate('/')
                console.log('logout function called')
            }
  return (
    <>
                <div className=" bg-gradient-to-r from-[rgb(5,1,77)] to-[rgb(9,9,174)] min-h-screen">
                    <div className="container mx-auto p-4">
                        <div className="mb-4 flex justify-between w-full py-5">
                            <div className="flex justify-between w-full">
                            <div className="text-[20px] font-bold sm:text-[40px] text-white">Task Management</div>
                            <div className='flex justify-normal gap-5'>
                            <button
                                type="button"
                                className=" rounded-full p-2 bg-blue-500 sm:h-10 text-white  sm:rounded-lg hover:bg-blue-600 flex items-center"
                                onClick={logout}
                            >
                            <div className='flex gap-3 items-center'> <CiLogout/> <p className='hidden sm:block'>Logout</p></div>
                            </button>
                            </div>
                            
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                        </div>
                        <div className="text-[30px] font-bold text-white">Welcome Admin!</div>
                        <p className='text-white'>{`${data.length} Users Found`}</p>
                        <br />
                        <div className="flex justify-center w-full ">
                            <table className='bg-gray-100 rounded-md w-1/2'>
                                <thead className=''>
                                    <th>S.no</th>
                                    <th>User Email</th>
                                    <th>Action</th>
                                </thead>
                                <tbody className=''>
                                    {
                                        data.map((data,index)=>(
                                            <tr key={data._id} className='text-center h-14' >
                                                <td>{index+1}</td>
                                                <td>{data.email}</td>
                                                <td>
                                                <button
                                                type="button"
                                                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 hover:scale-110 transition-all"
                                                onClick={()=>deleteUser(data._id)}
                                            >
                                                Delete
                                            </button>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>
    </>
  )
}
