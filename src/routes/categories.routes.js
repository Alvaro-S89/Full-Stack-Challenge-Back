const express = require('express')

const router = express.Router()

const categoryController = require('../controllers/CategoryController')

const verifyToken = require('../middlewares/verifyToken')

router.get('/', categoryController.getAll);
router.post('/', verifyToken, categoryController.store);

module.exports = router