const express = require('express');
const userroute = express.Router();
const {addUserController , getUserController , UpdateUserController , deleteUserController} = require('../controllers/userController')

userroute.post('/', addUserController)
userroute.get('/', getUserController)
userroute.put('/', UpdateUserController)
userroute.delete('/', deleteUserController)

module.exports = userroute