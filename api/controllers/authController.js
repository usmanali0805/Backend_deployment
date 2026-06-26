const User = require("../models/usersModels")
const jwt = require('jsonwebtoken')
const Response = require("./response")
const bcrypt = require("bcrypt")
const sendEmailOTP = require("../utils/emailsender")
const uuid = require("uuid")
const { v4: uuidv4 } = uuid

const signupController = async (req, res) => {
    try {
        const { email, name, password } = req.body
        if (!email || !name || !password) {
            return Response(false, 400, "Please fill the required fields", req.body, res)
        }
        bcrypt.hash(req.body.password, 12, async function (err, hash) {
            req.body.password = hash
        });
        const OTP = uuidv4().slice(0, 4)
        const MsgByTransporter = await sendEmailOTP(req.body.email, OTP);
        await User.create({
            ...req.body, 
            opt: OTP
        })
        // Response(true, 200, "User Signup Successfully", [], res)
        res.status(200).json({
            status: true,
            message: `User Signup successfully  , ${MsgByTransporter}`
        })

    } catch (error) {
        return Response(false, 400, error.message, [], res)
    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const myUser = await User.findOne({
            email
        })
        if (!myUser) {
            return Response(false, 400, "User not found", [], res)
        }
        bcrypt.compare(password, myUser.password, function (err, result) {
            if (result) {

                const token = jwt.sign({
                    id: myUser._id,
                    email: myUser.email,
                    name: myUser.name
                }, process.env.JWT_SECRET, { expiresIn: 2 * 60 })
                return res.json({
                    status: true,
                    message: "User Login successfully",
                    token: token,
                    data: myUser
                })
            }
            return res.json({
                status: false,
                message: "Wrong credentials"
            })
        });


    } catch (error) {
        return Response(false, 400, error.message, req.body, res)

    }
}

module.exports = { signupController, loginController }