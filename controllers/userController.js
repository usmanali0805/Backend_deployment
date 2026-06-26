// const User = require("../models/usersModels")
// const jwt = require('jsonwebtoken')
// const Response = require("./response")
import User from "../models/usersModels.js";
import jwt from "jsonwebtoken";
import Response from "./response.js";

const getUserController = async (req, res) => {
    // if(false){
    //     throw "usman"
    // }else{
    //     throw "Database timeout"
    // }
    try {
        let query = {}
        let sort = req.query.sort || null

        let limit = req.query.limit ?? 10
        let page = req.query.currentpage - 1
        if (req.query.ageStart && req.query.ageEnd) {
            const queryFlage = { ...req.query }
            delete queryFlage.ageStart
            delete queryFlage.ageEnd
            query = { ...queryFlage, age: { $gte: req.query.ageStart, $lte: req.query.ageEnd } }

        }
        if (req.query.username) {
            let myQueryData = { ...req.query }
            delete myQueryData.limit
            delete myQueryData.skip
            delete myQueryData.sort
            try {
                const users = await User.find({
                    "name": myQueryData.username
                }).limit(limit).skip(page * limit).sort(sort)
                users && Response(true, 200, "Users Fetch successfully", users, res)
                return;
            } catch (error) {
                Response(false, 500, error.message, [], res)
            }
        }
        try {
            const users = await User.find().limit(limit).skip(page * limit).sort(sort)
            Response(true, 200, "Users Fetch successfully", users, res)
        } catch (error) {
            Response(false, 400, error.message, [], res)

        }

    } catch (error) {
        Response(false, 400, error.message, [], res)
        console.log(error.message)

    }
}
const addUserController = async (req, res) => { }
const UpdateUserController = async (req, res) => {
    try {
        const updateDetail = req.body
        const token = req.headers.authorization;
        const authToken = token.split(' ')[1]
        
        let decoded = jwt.verify(authToken, process.env.JWT_SECRET)

        const myuser = await User.findByIdAndUpdate(decoded.id, updateDetail)
        res.json({
            status: true,
            message: "User Updated Successfully"
        })

    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}
const deleteUserController = async (req, res) => { }

export { addUserController, getUserController, UpdateUserController, deleteUserController }