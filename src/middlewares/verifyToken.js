const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Denied access' })
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next() 
    } catch (error) {
        res.status(400).json({error: 'Invalid token'})
    }
}

module.exports = verifyToken;