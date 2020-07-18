const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')

const requireLogin = require('../middleware/requiredlogin')

require('dotenv').config();
const jwtsecret = process.env.JWT_SECRET ;

router.put('/updateUserWelcome', requireLogin, (req, res) =>{
    User.findByIdAndUpdate(req.user._id,{
        usertype: req.body.usertype
    },{
        new: true
    }).exec((err, result)=>{
        if(err){
            return res.json({error: "not updated properly usertype "+ err})
        }
        else{
            res.json(result)
        }
    })
})


module.exports = router;
