
import express from 'express'
import tasks from '../Model/taskModel.js'
const app = express()
app.use(express.json())

export const addTask =async(req,res)=>{
    try {
        console.log(req.params,'params')
        console.log(req.body,'req.body')
        const userId = req.params.userId
        console.log(userId,'userid')
        const task = req.body
        const taskWithUserId = ({...task,userId})
        const newTask = await tasks.create(taskWithUserId)
        console.log(newTask)
        res.send({message:'Task Added',
            data:newTask,toast:'success'
        })
        } catch (error) {
            res.send(error.message)
            console.log('error.message',error.message)
        }
}

export const fetchUserTask = async (req, res) => {
    try {
        console.log(req.params,'paarams')
        const userId = req.params.userId
        console.log(userId,'userid')
        const searchQuery = req.query.search
        if(userId){
                const query = {userId:userId}
                if(searchQuery){
                        query.$or = [
                        { task: {$regex:searchQuery,$options:'i'}},
                        { priority: {$regex:searchQuery,$options:'i'}},
                        { assignedTo: {$regex:searchQuery,$options:'i'} }
                    ]
                }
                const userTask = await tasks.find(query)
                console.log(userTask)
                res.status(200).send({data:userTask})
            }
            else{
                res.status(200).send({message:'No tasks, '})
            }
        }
         catch (error) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

export const fetchTaskbyId = async (req, res) => {
    try {
        console.log(req.params,'params')
        const taskId = req.params.taskId
        console.log(taskId,'taskid')
        if(taskId){
            const speciificTask = await tasks.find({_id:taskId})
            console.log(speciificTask)
            if(speciificTask){
                res.status(200).send({message:'fetched successfully',data:speciificTask})
            }
            else{
                res.status(200).send({message:'No tasks, '})
            }
        }
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id
        const { task, dueDate, priority, assignedTo } = req.body;
        const updatedTask = {task, dueDate, priority, assignedTo }
        const updatedDoc = await tasks.findByIdAndUpdate(taskId,updatedTask,{new:true})

        if (!updatedDoc) {
            return res.status(404).send({ message: 'Task not found.' });
        }

        res.status(200).send({
            message: 'Task Updated Successfully',
            data: updatedDoc,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).send({
                message: 'Date should not be earlier than Today',
                errors: error.errors
            });
        }
        console.error('Error:', error.message);
        res.status(500).send({
            message: 'An error occurred while updating the task.',
            error: error.message
        });
    }
};

export const deleteByTaskId = async(req,res)=>{
    console.log(req)
    console.log(req.params,'params')
try {
    const id = req.params.taskId
    await tasks.findByIdAndDelete(id)
    console.log('task deleted');
    res.send({message:"Task deleted successfully"})
} catch (error) {
    console.log(error.message);
    res.status(400).send({message:error.message})
}
}
