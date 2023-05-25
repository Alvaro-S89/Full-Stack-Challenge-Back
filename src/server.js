const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const memesRouters = require('./routes/memes.routes')
const categoriesRouters = require('./routes/categories.routes')
const authRouters = require('./routes/auth.routes')

const app = express()

app.use(cors())
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp',
    limits: { fileSize: 10000000 },
    abortOnLimit: true
}));

app.use('/memes', memesRouters)
app.use('/categories', categoriesRouters)
app.use('/auth', authRouters)


module.exports=app