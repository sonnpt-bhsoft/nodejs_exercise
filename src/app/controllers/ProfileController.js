const { response } = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


class UserController{

    async show(req, res, next) {
        try {
            const users = await User.findOne({ fullName: req.params.slug }, { _id: 0, hash_password: 0 })
            return res.status(200).json({ users })
        } catch (error) {
            return res.status(401).send('Error')
        }
    }  

    async follow(req, res){
        try {
            const result = await User.findOneAndUpdate({ fullName: req.params.slug }, { $set: { 'following': true } }, { new: true })
            return res.status(200).json({ result })
        } catch (error) {
            return res.status(401).send('Error')
        }
    }
    
    async unfollow(req, res){
        try {
            const result = await User.findOneAndUpdate({ fullName: req.params.slug }, { $unset: { 'following': true } }, { new: true })
            return res.status(200).json({ result })
        } catch (error) {
            return res.status(401).send('Error')
        }
    }

    



}

module.exports = new UserController;