const dotenv = require('dotenv')

dotenv.config()

const ENV = process.env.NODE_ENV || "development";

const CONFIG = {
    development: {
        app: {
            PORT: process.env.PORT || 4005
        },
        db: {
            URL: process.env.MONGO_URL
        },
        cloudinary: {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        },
        encrypt: {
            bcryptRounds: 10
        }
    }
}

    module.exports = CONFIG[ENV]