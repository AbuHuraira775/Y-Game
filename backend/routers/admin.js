const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const { authVerify } = require('../middleware/authVerify')

router.post('/otp-send',adminController.sendOtp)
router.post('/login',adminController.login)
router.post('/register',adminController.register)
router.get('/get-admin',adminController.fetchAdmin)
router.post('/verify-account',adminController.verifyAccount)
router.post('/add-post',adminController.addPost)
router.put('/update-post/:id',adminController.updatePost)
router.delete('/delete-post/:id',adminController.deletePost)

router.post('/verify-admin',authVerify)    

module.exports = router

