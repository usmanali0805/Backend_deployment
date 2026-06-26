import express from "express";
const userroute = express.Router();
import {addUserController , getUserController , UpdateUserController , deleteUserController} from '../controllers/userController.js'

userroute.post('/', addUserController)
userroute.get('/', getUserController)
userroute.put('/', UpdateUserController)
userroute.delete('/', deleteUserController)

export default userroute