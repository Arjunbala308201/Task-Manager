    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import { Card } from './Card';
    import { FaPlus } from "react-icons/fa6";
    import { CiLogout, CiSearch } from "react-icons/ci";
    import { useDispatch, useSelector } from 'react-redux';
    import { clearStore } from '../redux/userSlice';

    export const Home = () => {

        const dispatch= useDispatch()
        const userId = useSelector(state=>state.user)._id
        console.log(userId,'current user id')
        const navigate = useNavigate();
        const [data, setData] = useState([]);
        const [search,setSearch] = useState({})

        const fetchTasks = async () => {
            try {
                console.log(search,'search');
                const response = await axios.get(`https://task-manager-3-s6g7.onrender.com/task/fetch/${userId}?search=${search}`);
                setData(response.data.data);
                console.log('response',response);
            } catch (error) {
                console.log('error',error);
            }
        };
        // console.log('fetched data',data);
        useEffect(() => {
            fetchTasks();
        }, [search]);

        const moveToaddnew = () => {
            navigate('/addnew');
        };


        const logout = ()=>{
            dispatch(clearStore())
            console.log('logout function called')
            console.log(userId)
        }
        return (
            <>
                <div className=" bg-gradient-to-r from-[rgb(5,1,77)] to-[rgb(9,9,174)] min-h-screen">
                    <div className="container mx-auto p-4">
                        <div className="mb-4 flex justify-between w-full py-5">
                            <div className="flex justify-between w-full">
                            <div className="text-[20px] font-bold sm:text-[40px] text-white">Task Management</div>
                            <div className='flex justify-normal gap-5'>
                            <div className='hidden w-[150px] md:flex md:w-[200px] lg:w-[250px] p-3 gap-5  bg-white rounded-lg h-10 overflow-hidden'>                        
                                <CiSearch />
                            <input type="text" 
                            name='search'
                            className=' outline-none'
                            placeholder='search'
                            onChange={(e)=>setSearch(e.target.value)} 
                            />
                            </div>
    
                            <button
                                type="button"
                                className=" rounded-full p-2 bg-blue-500 sm:h-10 text-white  sm:rounded-lg hover:bg-blue-600 flex items-center"
                                onClick={moveToaddnew}
                            >
                            <div className='flex gap-3 items-center'> <FaPlus/>  <p className='hidden sm:block'>New</p></div>
                            </button>
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
                        <div className='flex md:hidden p-3 gap-5  bg-white rounded-lg h-10'>                        
                                <CiSearch />
                            <input type="text" 
                            name='search'
                            className=' outline-none'
                            placeholder='search'
                            onChange={(e)=>setSearch(e.target.value)} 
                            />
                        </div>
                        </div>
                        <br />
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {data?.map((task) => (
                                <Card key={task._id} task={task} />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    };
