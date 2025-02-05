import e from 'express'
import { deleteUserById, fetchAllUsers } from '../Controller/userController.js'

const adminRouter = e.Router()

adminRouter.get('/fetch',fetchAllUsers)
adminRouter.delete('/delete/:id',deleteUserById)

export default adminRouter