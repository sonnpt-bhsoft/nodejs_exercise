const express = require('express');
const router = express.Router();


const profileController = require('../app/controllers/ProfileController');
const authController = require('../app/controllers/AuthController');


router.delete('/:slug/follow', authController.isAuthenticated, profileController.unfollow)
router.post('/:slug/follow', authController.isAuthenticated, profileController.follow)
router.get('/:slug', authController.isAuthenticated, profileController.show);


module.exports = router;