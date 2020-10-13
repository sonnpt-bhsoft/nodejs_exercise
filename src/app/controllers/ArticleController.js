const Articles = require('../models/Articles');
const User = require('../models/User');



class ArticleController{

    async create(req, res) {
        try {
            const new1 = req.body;
            new1.author = req.user;
            const newArticle = new Articles(new1);
            await newArticle.save(); 
            return res.json({newArticle}) 
        } catch (error) {
            res.status(401).send('Error')
        }
    }


    async get(req, res) {
        try {
            const article = await Articles.findOne({ slug: req.params.slug })
            return res.json({article})
        } catch (error) {
            res.status(401).send('Error')
        }
    }

    async update(req, res) {     
        try {
            const article = await Articles.findOneAndUpdate( { slug: req.params.slug }, req.body, { new: true } )
            return res.json({article})
        } catch (error) {
            res.status(401).send('Error')  
        }
    }

    async delete(req, res) {
        try {
            await Articles.deleteOne({ slug: req.params.slug })
            return res.status(200).json('Successfully')
        } catch (error) {
            res.status(401).send('Error')
        }
    } 
    
    async favorite(req, res) {
        try {
            const article = await Articles.updateOne({ slug: req.params.slug }, { $set: { 'favorite': true } }, { multi: true })
            return res.json({article})
        } catch (error) {
            res.status(401).send('Error')   
        }
    }  
    
    async unfavorite(req, res){
        try {
            Articles.updateOne({ slug: req.params.slug }, { $unset: { 'favorite': true } }, { multi: true }, { new: true })
            res.status(200).send('Success')
        } catch (error) {
            res.status(401).send('Error')
        }
    }

    async showArtByAuthor(req, res){
        try {
            const author = req.query.author
            const articles = await Articles.find( {$and: [{ "author.fullName": author }]})
            res.status(200).json({ articles })
        } catch (error) {
            res.status(401).send('Error')
        }
    }

    async getAllArticles(req, res){
        try {
            const articles = await Articles.find()
            res.status(200).json({ articles, articlesCount: articles.length })
        } catch (error) {
            res.status(401).send('Error')
        }
    }

    async addComment(req, res) {
        try {
            const comment = await Articles.findOneAndUpdate({ slug: req.params.slug }, { $push: {"comments": req.body}}, { safe: true, upsert: true })
            res.status(200).json({ comment })
        } catch (error) {
            res.status(401).send('Error')
        }        
    }

    async getAllCmt(req, res){
        try {
            const comments = await Articles.find({ slug: req.params.slug }).select('comments')
            res.status(200).json({ comments, commentsCount: comments.length }) 
        } catch (error) {
            res.status(401).send('Error')
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
            res.status(200).json({ result })
        } catch (error) {
            res.status(401).send('Error')
        }        
    }
}

module.exports = new ArticleController;