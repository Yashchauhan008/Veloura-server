const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');


router.post('/post', commentController.postComment);
router.get('/:videoId', commentController.getCommentByVideoId);



module.exports = router;
