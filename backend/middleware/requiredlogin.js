const jwt = require('jsonwebtoken')

require('dotenv').config();
const jwtsecret = process.env.JWT_SECRET ;

const mongoose =require('mongoose')
const User = mongoose.model('User')

module.exports = (req,res,next) => {
    const {authorization} = req.headers

    //authorization === bearer effferegggehe
    if( !authorization){
        res.status(401).json({error : "you must be logged in"})
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token,jwtsecret, (err, payload) =>{
        if(err){
            return res.status(401).json({err : "u must be logged in"})
        }

        const {_id} = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata
            next();
        })
    })
}
