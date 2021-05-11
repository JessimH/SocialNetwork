const { model, Schema } = require('mongoose')

//Creation du Schema User utilisé pour la base de donné
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
})

module.exports = model('User', userSchema)