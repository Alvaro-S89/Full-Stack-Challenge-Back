const express = require('express')

const router = express.Router()

const memeController = require('../controllers/MemeController')

const verifyToken = require('../middlewares/verifyToken')

router.get('/', memeController.getAll);
router.get('/:id', memeController.get);
router.get('/user/:userId', memeController.getByUser);
router.post('/', verifyToken, memeController.store);
router.put('/:id', verifyToken, memeController.update);
router.delete('/:id', verifyToken, memeController.remove);

module.exports = router