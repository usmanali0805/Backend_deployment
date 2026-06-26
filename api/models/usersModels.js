const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type :String , 
        required :true
    },
    email :{
        type: String,
        required :true , 
        unique :true
    },
    password :{
        type: String,
        minlenght:8,
        required :true
    },
    age :{
        type: Number,
        required :true
    },
    opt:{
        type :String
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User
