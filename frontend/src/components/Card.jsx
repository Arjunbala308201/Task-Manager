import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Card = ({task}) => {
  const navigate = useNavigate()
  console.log(task,'recived from props')
  const moveToEdit=()=>{
    navigate(`/edittask/${task._id}`)
  }
  return (
    <>
        <div className="bg-gray-100 rounded-md px-3 py-1 text-gray-700 hover:scale-105 transition-all duration-300" 
        onClick={moveToEdit}
        >
            <div className="flex flex-col gap-5">
              <div
                className={`w-full justify-end flex text-sm font-bold ${
                  task.priority === 'High'
                    ? 'text-red-600'
                    : task.priority === 'Mid'
                    ? 'text-orange-500'
                    : 'text-green-500'
                }`}
              >
                {task.priority}
            </div>
              <div className="font-bold text-lg">{task.task}</div>
              <div className="text-md font-medium">Assigned To <span className="text-md]]  font-bold">{task.assignedTo}</span></div>
              <div className="text-md font-medium">Deadline: {new Date(task.dueDate).toLocaleDateString()}</div>
            </div>
            
        </div>
    </>
  )
}
