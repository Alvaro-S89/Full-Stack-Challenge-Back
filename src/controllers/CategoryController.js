const categoryModel = require('../models/Category')


const getAll = async (req, res) => {
    try {
        const list = await categoryModel.find()
        return res.status(200).json({ok: true, list});
    } catch (error) {
        return res.status(500).send({
            message: "Something happened"
        })
    }
}

const store = async (req, res) => {
    try {
        const category = await categoryModel.create(req.body)
        return res.status(201).json({ok: true, category})
    } catch (error) {
        return res.status(500).send({
            message: "Something happened"
        })
    }
}

module.exports = {getAll, store}
