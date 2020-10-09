const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    image: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    strict: false,
});

User.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
   
 


module.exports = mongoose.model('User', User);