import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AddTask = () => {
    const userId = useSelector(state=>state.user)._id
    console.log(userId,'userid')
    const navigate = useNavigate()
    console.log('first')
    const [data, setData] = useState({
        task: "",
        dueDate: "",
        priority: "",
        assignedTo: ""
    });

    const handleChange=(e)=>{
        const{name,value} = e.target
        setData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    
    const addNewTask = async () => { 
        console.log(data,'add new task')

        if (data.task.trim() ===''|| data.dueDate.trim() ===''|| !data.assignedTo.trim() ==='') {
            console.log(data);
            toast.error("Please fill in all fields before submitting!");
        } else{
            try {
                console.log(userId,'uerid')
                const response = await axios.post(`http://localhost:4000/task/${userId}/add`, data);
                if (response.data.message === 'toDo validation failed: dueDate: Due date must not be earlier than today.') {
                    toast.error('Deadline must not be earlier than today');
                } else {
                    console.log(response.data,'response.data')
                    if(response.data.toast=='success'){
                        toast.success(`Task added successfully!`);
                        console.log(response.data);
                        setData({ task: "", dueDate: "", priority: "", assignedTo: "" });
                    }
                    if(response.data.toast=='error'){
                        toast.error(response.data.message)
                    }

                }
            } catch (error) {
                console.error("Error:", error.message);
                toast.error("An error occurred while adding the task.");
            }
        }

    };
    
    
const moveBack = ()=>{
    navigate('/home')
}
  return (
    <>
        <div className="bg-gradient-to-r from-[rgb(5,1,77)] to-[rgb(9,9,174)] min-h-screen">
            <div className=" mx-auto">
                <br />
                <div className="font-bold text-[20px] mb-4 text-white ps-10 sm:text-[25px]">Add Task</div>
                <br />
                <div className="w-3/4 sm:w-2/3 md:w-1/3 mx-auto p-3 bg-gray-100 rounded-xl text-blue-900">
                <div className="mb-4">
                    <br />
                    <label htmlFor="task" className="block text-lg font-semibold  mb-1">
                        Task
                    </label>
                    <input
                        type="text"
                        id="task"
                        name="task"
                        value={data.task}
                        onChange={handleChange}
                        className="w-full border text-gray-700 border-gray-300 rounded-full px-4 py-2 outline-none"
                        placeholder="Enter task"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="dueDate" className="block font-semibold text-lg mb-1">
                        Deadline
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={data.dueDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 text-gray-700 rounded-full px-4 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="priority" className="block text-lg font-semibold  mb-1">
                        Priority
                    </label>
                    <select
                        name="priority"
                        value={data.priority || ""} // Ensure the value is always bound to state
                        className="w-full border border-gray-300 text-gray-700 rounded-full px-4 py-2"
                        onChange={handleChange}
                    >
                        <option value="">Choose Priority Level</option>
                        <option value="High">High</option>
                        <option value="Mid">Mid</option>
                        <option value="Low">Low</option>
                    </select>

                </div>

                <div className="mb-4">
                    <label htmlFor="assignedTo" className="block text-lg font-semibold  mb-1">
                        Assigned To
                    </label>
                    <input
                        type="text"
                        id="assignedTo"
                        name="assignedTo"
                        value={data.assignedTo}
                        onChange={handleChange}
                        className="w-full border border-gray-300 text-gray-700 rounded-full px-4 py-2"
                        placeholder="Enter assignee name"
                    />
                </div>
                <br />
                <div className="justify-around w-full flex sm:justify-end gap-5">
                <button
                    type="button"
                    className="bg-gradient-to-r from-[rgb(5,1,77)] to-[rgb(9,9,174)] text-white px-4 py-2 rounded-full hover:scale-110 transition-all"
                    onClick={addNewTask}
                >
                    Add Task
                </button>
                <button
                    type="button"
                    className="bg-gradient-to-r from-[rgb(5,1,77)] to-[rgb(9,9,174)] text-white transition-all px-4 py-2 rounded-full  hover:scale-110 "
                    onClick={moveBack}
                >
                    Back
                </button>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}
