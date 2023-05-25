const { Schema, model } = require("mongoose")

const memeSchema = Schema({
    url: {
        type: String,
        required: true
    },
    image_public_id: {
        type: String
    },
    description: {
        type: String,
        required: true,
    },
    uploadBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "categories",
        default: []
    }]
})

const memeModel = model("memes", memeSchema)

module.exports = memeModel