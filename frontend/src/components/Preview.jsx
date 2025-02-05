import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaArrowLeft } from "react-icons/fa";

export const Preview = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id,'params id')
    const [updatedValue, setUpdatedValue] = useState({
        task: '',
        dueDate: '',
        priority: '',
        assignedTo: ''
    });

    const handleChange =(e)=> {
        const { name, value } = e.target
        setUpdatedValue((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const fetchDatabyId = async()=>{
        try {
            const response = await axios.get(`http://localhost:4000/task/fetchbyid/${id}`)
            console.log(response.data.data)
            const specificTask = response.data.data[0]
            console.log(specificTask)
            setUpdatedValue({
                task: specificTask.task,
                dueDate: new Date(specificTask.dueDate).toISOString().split('T')[0],
                priority: specificTask.priority,
                assignedTo: specificTask.assignedTo
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const updateTask = async()=>{
        try {
            const response = await axios.put(`http://localhost:4000/task/${id}/update`,updatedValue)
            console.log(response.data.data);
            console.log(response.data.message);
            toast.success(response.data.message|| 'Updated')
            navigate('/home')

        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const deleteTask = async()=>{
        try {
            const response = await axios.delete(`http://localhost:4000/task/${id}/delete`)
            // console.log(response.data.data);
            // console.log(response.data.message);
            toast.success(response.data.message)
            navigate('/home')
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    const moveBack = ()=>{
        navigate('/home')
    }
    useEffect(()=>{
        fetchDatabyId()
    },[])
    return (
        <>
            <div className="bg-gradient-to-r from-[rgb(5,1,77)] to-[rgb(9,9,174)] min-h-screen ">
                <div className="container mx-auto">
                    <div className="font-semibold text-[30px] mb-4 text-white flex items-center gap-5 py-5" ><span className='cursor-pointer' onClick={moveBack}><FaArrowLeft/></span> Edit Task</div>
                    <div className="w-1/2 sm:w-1/3 mx-auto bg-gray-100 p-4 rounded-xl mt-10">
                    <div className="">
                        <label htmlFor="task" className="block text-blue-900 text-lg font-semibold mb-1">
                            TASK
                        </label>
                        <input
                            type="text"
                            id="task"
                            name="task"
                            value={updatedValue.task}
                            onChange={handleChange}
                            className="w-full border border-gray-300  rounded-full px-4 py-2 outline-none"
                            placeholder="Enter task"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dueDate" className="block text-blue-900 text-lg font-semibold mb-1">
                            DUE DATE
                        </label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={updatedValue.dueDate}
                            onChange={handleChange}
                            className="w-full border border-gray-300  rounded-full px-4 py-2 outline-none "
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="priority" className="block text-blue-900 text-lg font-semibold mb-1">
                            PRIORITY
                        </label>
                        <select name="priority" id="" 
                        className='w-full border border-gray-300 text-gray-700 rounded-full px-4 py-2 outline-none'
                        onChange={handleChange}
                        >
                            <option value="High">High</option>
                            <option value="Mid">Mid</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="assignedTo" className="block text-blue-900 text-lg font-semibold mb-1">
                            ASSIGNED TO
                        </label>
                        <input
                            type="text"
                            id="assignedTo"
                            name="assignedTo"
                            value={updatedValue.assignedTo}
                            onChange={handleChange}
                            className="w-full border border-gray-300  rounded-full px-4 py-2 outline-none"
                            placeholder="Enter assignee name"
                        />
                    </div>
                    <div className="flex justify-end gap-5">
                    <button
                        type="button"
                        className="bg-gradient-to-r from-[rgb(5,1,77)] to-[rgb(9,9,174)] text-white px-4 py-2 rounded-full hover:scale-110 transition-all"
                        onClick={updateTask}
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 hover:scale-110 transition-all"
                        onClick={deleteTask}
                    >
                        Delete
                    </button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};
