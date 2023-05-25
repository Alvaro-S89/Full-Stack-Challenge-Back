const userModel = require('../models/User');

const bcrypt = require('bcrypt');
const config = require ('../config/config');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const register = async (req, res) => {
    try {
        if (req.body.password.length < 8) return res.status(422).json({ok: false, message: "Password must contain at least 8 characters"})
        
        const userPayload = {
            name: req.body.name,
            password: await bcrypt.hash(req.body.password, config.encrypt.bcryptRounds)
        }

        const user = await userModel.create(userPayload)
        
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.JWT_SECRET)

        return res.status(200).json({
            token: token,
            userId: user._id,
            userName: user.name
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Something happened"
        })
    }
}

const login = async (req, res) => {
    try {
        const user = await userModel.findOne({name: req.body.name})

        if(!user) return res.status(404).json({ok: false, message: "User not found"})

        if(! await bcrypt.compare(req.body.password, user.password)) return res.status(401).json({ok: false, message: "Incorrect password"})
            
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.JWT_SECRET)

        return res.status(200).json({
            token: token,
            userId: user._id,
            userName: user.name
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message || "Something happened"
        })
    }
}

module.exports = {
    register,
    login
}   