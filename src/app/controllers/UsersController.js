const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersController{
  login(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed. User not found.' });
      } else if (user) {
        if (!user.comparePassword(req.body.password)) {
          return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        } else {
          const payload = {userId: user._id, fullName: user.fullName, email: user.email, bio: user.bio, following: user.following};
          const token = jwt.sign( payload, 'RESTFULAPIs');
          user.tokens = user.tokens.concat({token})
          user.save()
          return res.status(200).json({
            user
          })
        }
      }
    });
  }

  // register(req, res){
  //   var newUser = new User(req.body);
  //   newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  //   newUser.save(function(err, user) {
  //     if (err) {
  //       return res.status(400).send({
  //         message: err
  //       });
  //     } else {
  //       user.hash_password = undefined;
  //       return res.json({user});
  //     }
  //   });
  // }
  async register(req, res){
    try {
      var newUser = new User(req.body)
      newUser.hash_password = bcrypt.hashSync(req.body.password, 10)
      const user = await newUser.save()
      user.hash_password = undefined;
      res.json({user});
    } 
    catch (error) {
      res.status(401).send('Error')
    }
  }

  async index(req, res) {
    if(req.user) {     
        const user = req.user;   
        return res.json({user})
    } 
    return res.status(401).send('Unauthorized');
  }

  async update(req, res, next) {
    try {
      const user = await User.findOneAndUpdate( { _id: req.user.userId }, req.body, {new: true} )
      return res.json(user)
    } catch (error) {
      res.status(401).send('Error')
    }
  }
}

module.exports = new UsersController; 