const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');
const authController = require('../app/controllers/AuthController');


router.post('/login', usersController.login);
router.put('/', authController.isAuthenticated ,usersController.update);
router.get('/', authController.isAuthenticated, usersController.index);
router.post('/', usersController.register);




module.exports = router;