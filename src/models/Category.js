const { Schema, model } = require("mongoose")

const categorySchema = Schema({
    name: {
        type: String,
        required: true, 
        unique: true
    }
})

const categoryModel = model("categories", categorySchema)

module.exports = categoryModel