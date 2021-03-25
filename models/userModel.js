const mongoose = require('mongoose');
const {Schema} = require('mongoose.Schema');

const userSchema = new Schema({
    name : {
        type: String,
        required: [true,"Please enter your name!"],
        trim : true,
        unique : true,
    },
    password : {
        type: String,
        required: [true,"Please enter your password!"],
    },
    email : {
        type: String,
        required: [true,"Please enter your email!"],
        trim : true,
        unique : true,
    },
    role : {
        type: Number,
        default : 0, // 0 is user , 1 is admin
    },
    avatar : {
        type: String,
        default : "https://res.cloudinary.com/bolttech/image/upload/v1616670045/Avatar/Avatar_hubvx6.png"
    }
},{
    timestamps :true,
});

module.exports = mongoose.model("Users",userSchema);