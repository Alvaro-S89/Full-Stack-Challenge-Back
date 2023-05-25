const memeModel = require('../models/Meme')
const { uploadImage, deleteImage } = require('../config/cloudinary')


const getAll = async (req, res) => {
    try {
        const list = await memeModel.find()
        return res.status(200).json({ok: true, list});
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Something happened"
        })
    }
}

const getByUser = async (req, res) => {
    try {
        const list = await memeModel.find({
            uploadBy: req.params.userId
        })

        return res.status(200).json({ok: true, list});
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Something happened"
        })
    }
}
        
const get = async (req, res) => {
    try {
        const id = req.params.id
        const meme = await memeModel.findById(id)
        return res.status(200).json({ok: true, meme});
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Something happened"
        })
    }
}

const store = async (req, res) => {
    try {
        const uploadedImage = await uploadImage(req.files.file.tempFilePath)

        const memePayload = {
            description: req.body.description,
            categories: req.body.categories,
            uploadBy: req.user.id,
            url: uploadedImage.secure_url,
            image_public_id: uploadedImage.public_id
        }

        const meme = await memeModel.create(memePayload)

        // await fs.unlink(req.files.tempFilePath)

        return res.status(201).json({ok: true, meme})
    } catch (error) {
        return res.status(500).send({
            message: error.message || "Something happened"
        })
    }
}

const update = async (req, res) => {
    try { 
        const id = req.params.id
        const meme = await memeModel.findById(id)

        const memePayload = {
            description: req.body.description || meme.description,
            categories: req.body.categories || meme.categories,
        }

        await meme.updateOne(memePayload)

        return res.status(200).json({ok: true});
    } catch (error) {
        return res.status(500).send({
            message: error.message 
        })
    }
}

const remove = async (req, res) => {
    try {
        const id = req.params.id
        const meme = await memeModel.findById(id)

        if(!meme || meme.uploadBy != req.user.id) return res.status(404).json({ok: false, message: "Not found"})

        await deleteImage(meme.image_public_id)

        await meme.deleteOne()

        return res.status(200).json({ok: true})
    } catch (error) {
        console.log(error.message)
        return res.status(500).send({
            message: error.message || "Something happened"
        })
    }
}

module.exports = {getAll, getByUser, get, store, update, remove}