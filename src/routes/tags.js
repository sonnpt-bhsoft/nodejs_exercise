const express = require('express');
const router = express.Router();


const articleController = require('../app/controllers/ArticleController');



router.get('/', articleController.getAllTags);


module.exports = router;