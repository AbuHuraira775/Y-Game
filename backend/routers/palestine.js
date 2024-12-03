const express = require('express');
const router = express.Router();
const palestineController = require('../controllers/palestine-controller')

router.post('/post-comment',palestineController.addComment)
router.get('/get-comment',palestineController.getComment)
router.put('/update-comment/:id',palestineController.updateComment)
router.delete('/delete-comment/:id',palestineController.deleteComment)

module.exports = router