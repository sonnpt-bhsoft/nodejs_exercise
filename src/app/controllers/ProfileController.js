const { response } = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


class UserController{

    show(req, res, next) {
        User.findOne({ fullName: req.params.slug }, { _id: 0, hash_password: 0 }, function (err,profile) {
            //nếu có lỗi
            if (err) throw err;
            //nếu thành công
            return res.status(200).json({profile})
        });
    }

    follow(req, res, next) {
        const profile = req.user;
        User.updateOne({ fullName: req.params.slug }, { $set: { 'following': true } }, { multi: true })
            .then (() => {
                return res.status(200).json({ profile, message:"Value Updated" })
            })
    }  
    
    unfollow(req, res, next){
        User.updateOne({ fullName: req.params.slug }, { $unset: { 'following': true } }, { multi: true })
            .then(() => {
                res.send({message: 'success'})
            })
            .catch(next);
    }

    



}

module.exports = new UserController;