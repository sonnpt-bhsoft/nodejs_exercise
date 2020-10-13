const Articles = require('../models/Articles');
const User = require('../models/User');



class ArticleController{

    async create(req, res) {
        try {
            const new1 = req.body;
            new1.author = req.user;
            const newArticle = new Articles(new1);
            await newArticle.save(); 
            return res.status(200).json({ newArticle })
        } catch (error) {
            return res.status(401).send('Error')
        }
    }

    async get(req, res) {
        try {
            const article = await Articles.findOne({ slug: req.params.slug })
            return res.status(200).json({ article })
        } catch (error) {
            return res.status(401).send('Error')
        }
    }

    async update(req, res) {     
        try {
            const article = await Articles.findOneAndUpdate( { slug: req.params.slug }, req.body, { new: true } )
            return res.status(200).json({ article })
        } catch (error) {
            return res.status(401).send('Error')  
        }
    }

    async delete(req, res) {
        try {
            await Articles.deleteOne({ slug: req.params.slug })
            return res.status(200).json('Successfully')
        } catch (error) {
            return res.status(401).send('Error')
        }
    } 
    
    async favorite(req, res) {
        try {
            const article = await Articles.updateOne({ slug: req.params.slug }, { $set: { 'favorite': true } }, { multi: true })
            return res.status(200).json({ article })
        } catch (error) {
            return res.status(401).send('Error')   
        }
    }  
    
    async unfavorite(req, res){
        try {
            Articles.updateOne({ slug: req.params.slug }, { $unset: { 'favorite': true } }, { multi: true }, { new: true })
            return res.status(200).send('Success')
        } catch (error) {
            return res.status(401).send('Error')
        }
    }

    async showArtByAuthor(req, res){
        try {
            const author = req.query.author
            const articles = await Articles.find( {$and: [{ "author.fullName": author }]})
            return res.status(200).json({ articles })
        } catch (error) {
            return res.status(401).send('Error')
        }
    }

    async getAllArticles(req, res){
        try {
            const articles = await Articles.find()
            return res.status(200).json({ articles, articlesCount: articles.length })
        } catch (error) {
            return res.status(401).send('Error')
        }
    }

    async addComment(req, res) {
        try {
            const comment = await Articles.findOneAndUpdate({ slug: req.params.slug }, { $push: {"comments": req.body}}, { safe: true, upsert: true })
            return res.status(200).json({ comment })
        } catch (error) {
            return res.status(401).send('Error')
        }        
    }

    async getAllCmt(req, res){
        try {
            const comments = await Articles.find({ slug: req.params.slug }).select('comments')
            return res.status(200).json({ comments, commentsCount: comments.length }) 
        } catch (error) {
            return res.status(401).send('Error')
        }
    }
    
    async deleteCmt(req, res){
        try {
            await Articles.findOneAndUpdate({ slug: req.params.slug }, { $pull: { 'comments': { _id: req.params.id } } })
            return res.send('Success')
        } catch (error) {
            res.status(401).message('Error')
        }
    }

    async getAllTags(req, res){
        try {
            const result = await Articles.find().select('tagList')
            return res.status(200).json({ result })
        } catch (error) {
            return res.status(401).send('Error')
        }        
    }
}

module.exports = new ArticleController;