const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')

router.get('/otp-send',adminController.sendOtp)
router.post('/login',adminController.login)
router.post('/register',adminController.register)
router.post('/verify-account',adminController.verifyAccount)
router.post('/add-post',adminController.addPost)
router.post('/update-post/:id',adminController.updatePost)
router.delete('/delete-post/:id',adminController.deletePost)

module.exports = router