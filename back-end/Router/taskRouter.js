import express from 'express';
import { addTask, deleteByTaskId, fetchTaskbyId, fetchUserTask, updateTask } from '../Controller/taskController.js'
const Router = express.Router()

Router.get('/fetch/:userId',fetchUserTask)
Router.get('/fetchbyid/:taskId',fetchTaskbyId)
Router.post('/:userId/add',addTask)
Router.put('/:id/update',updateTask)
Router.delete('/:taskId/delete',deleteByTaskId)

export default Router