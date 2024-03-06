const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/authentication');

const model = new mongoose.Schema({
    username:String,
    email:String,
    password:String
})

const UserSchema = new mongoose.model('user',model)

module.exports = UserSchema