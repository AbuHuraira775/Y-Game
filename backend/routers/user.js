const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

router.get('/',userController.home)
router.post('/contact',userController.contact)

module.exports = router