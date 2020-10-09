const express = require('express');
const router = express.Router();


const authController = require('../app/controllers/AuthController');
const articleController = require('../app/controllers/ArticleController');


router.delete('/:slug/comments/:id', authController.isAuthenticated, articleController.deleteCmt)
router.get('/:slug/comments', authController.isAuthenticated, articleController.getAllCmt)
router.post('/:slug/comments', authController.isAuthenticated, articleController.addComment)
router.get('/', authController.isAuthenticated, articleController.getAllArticles)
router.get('/feed', authController.isAuthenticated, articleController.showArtByAuthor)
router.delete('/:slug/favorite', authController.isAuthenticated, articleController.unfavorite)
router.post('/:slug/favorite', authController.isAuthenticated, articleController.favorite)
router.delete('/:slug', authController.isAuthenticated, articleController.delete)
router.put('/:slug', authController.isAuthenticated, articleController.update)
router.get('/:slug', articleController.get)
router.post('/', authController.isAuthenticated, articleController.create);


module.exports = router;