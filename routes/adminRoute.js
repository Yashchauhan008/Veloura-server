const express = require('express');

const router = express.Router();
const admincontroller = require('../controllers/adminController');

router.get('/admin-profile', admincontroller.getAdminProfile); // New route
router.put('/admin-profile', admincontroller.updateAdminProfile); // New route
router.put('/restrict-video/:videoId', admincontroller.UpdateVideoToRestrict);



module.exports = router;
