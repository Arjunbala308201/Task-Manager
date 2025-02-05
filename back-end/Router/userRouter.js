import e from "express";
import { Login, SignUp } from "../Controller/userController.js";

const router = e.Router()

router.post('/signup',SignUp)
router.post('/login',Login)

export default router