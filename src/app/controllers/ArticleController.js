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

    async delete(req, res, next) {
        try {
            await Articles.deleteOne({ slug: req.params.slug })
            return res.status(200).json('Successfully')
        } catch (error) {
            res.status(401).send('Error')
        }
    } 
    
    async favorite(req, res, next) {
        try {
            const article = await Articles.updateOne({ slug: req.params.slug }, { $set: { 'favorite': true } }, { multi: true })
            return res.json({article})
        } catch (error) {
            res.status(401).send('Error')   
        }

        

    }  
    
    unfavorite(req, res, next){
        Articles.updateOne({ slug: req.params.slug }, { $unset: { 'favorite': true } }, { multi: true })
            .then(() => {
                res.send({message: 'success'})
            })
            .catch(next);
    }

    showArtByAuthor(req, res, next){
        const author = req.query.author
        Articles.find( {$and: [{ "author.fullName": author }]}, function (err,result) {
            //nếu có lỗi
            if (err) throw err;
            //nếu thành công
            return res.status(200).json({result})
        });
    }

    getAllArticles(req, res, next){
        Articles.find({}, function (err,articles) {
                //nếu có lỗi
                if (err) throw err;
                //nếu thành công
                res.json({articles, articlesCount: articles.length})
        });
    }

    addComment(req, res, next) {
        Articles.findOneAndUpdate({ slug: req.params.slug }, { $push: {"comments": req.body}}, {  safe: true, upsert: true},
            function(err, model) {
                if(err){
                   console.log(err);
                   return res.send(err);
                }
                return res.json(model);
            });
    }

    getAllCmt(req, res, next){
        Articles.find({ slug: req.params.slug }, function (err,comment) {
            //nếu có lỗi
            if (err) throw err;
            //nếu thành công
            return res.status(200).send({comment})
        }).select('comments');
    }
    

    // deleteCmt(req, res, next){
    //     Articles.findOneAndUpdate( { slug: req.params.slug }, { $pull: { 'comments': {  _id: req.params.id } } },
    //         function(err,model){
    //             if(err){
    //                 console.log(err);
    //                 return res.send(err);
    //             }
    //             return res.json(model);
    //         });
    // }

    async deleteCmt(req, res){
        try {
            await Articles.findOneAndUpdate({ slug: req.params.slug }, { $pull: { 'comments': { _id: req.params.id } } })
            return res.send('success')
        } catch (error) {
            res.status(401).message('Error')
        }
    }

    getAllTags(req, res, next){
        Articles.find({ }, function (err,tag) {
            //nếu có lỗi
            if (err) throw err;
            //nếu thành công
            return res.status(200).send({tag})
        }).select('tagList');
    }


}

module.exports = new ArticleController;