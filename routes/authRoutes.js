import express from "express";
const authroute = express.Router();
import {signupController , loginController} from '../controllers/authController.js'

authroute.post('/signup', signupController)
authroute.post('/login', loginController)

export default authroute;