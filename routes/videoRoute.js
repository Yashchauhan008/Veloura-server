const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.post('/upload-video', videoController.uploadVideo);
router.get('/getVideoByUserID/:userId', videoController.getVideosByUserID);
router.get('/getVideoByID/:videoId', videoController.getVideoByID);
router.get('/personalizedFeed', videoController.personalizedFeed);
router.get('/public-videos', videoController.getAllPublicVideos);
router.get('/getpremium-videos', videoController.getAllPremiumVideos);



module.exports = router;
