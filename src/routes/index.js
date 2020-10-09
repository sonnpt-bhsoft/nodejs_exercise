const usersRoute = require('./users');
const profileRoute = require('./profile');
const articlesRoute = require('./articles');
const tagsRoute = require('./tags');


function route(app){

    app.use('/tags', tagsRoute);
    app.use('/articles', articlesRoute);
    app.use('/profile', profileRoute);
    app.use('/users', usersRoute);
    

}

module.exports = route;