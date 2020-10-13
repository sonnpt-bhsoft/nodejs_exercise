const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const Article = new Schema([{
    
    slug: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    body: {
        type: String,
    },
    tagList: [
        {type: String}
    ],
    comments: [{ 
        post: String,
        posted: {type: Date, default: Date.now}
    }]
}], {
    strict: false, 
    timestamps: true
})



module.exports = mongoose.model('Article', Article);
