const { Schema, model } = require("mongoose")

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    password: {
        type: String,  
        required: true
    },
})

const userModel = model("users", userSchema)

module.exports = userModel