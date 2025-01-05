const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role :{
        type:String,
        required:true,
        default:"student",
    },
    password :{
        type:String,
        required:true,
    }
},{timestamp:true});

const User = mongoose.model("user",UserShema);

module.exports = User;