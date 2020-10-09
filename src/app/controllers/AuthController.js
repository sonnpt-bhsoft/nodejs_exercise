const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthController{

    isAuthenticated(req, res, next){
        try {
            const token = req.headers.authorization;
    
            // Xác thực token
            jwt.verify(token, 'RESTFULAPIs', (err, payload) => {
                if(payload) {
                    req.user = payload;
                    req.token = token;
                    next();
                } else {
                    // Nếu token tồn tại nhưng không hợp lệ, server sẽ response status code 401 với msg bên dưới
                    return res.status(401).send('Unauthorized');
                }
            })
        } catch(err) {
            // Nếu không có token ở header, server sẽ response status code 401 với msg bên dưới        
            return res.status(401).send('No token provided');
        }    
    }
}

module.exports = new AuthController;