const express = require('express')
const router = express.Router()
const mongoose =require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requiredlogin')
const { uservalidationRules, validate } = require('../middleware/validator')

require('dotenv').config();
const jwtsecret = process.env.JWT_SECRET ;

router.get('/', (req,res)=>{
    res.send("hello in the res auth")
})

//router.get('/protected',requireLogin,(req,res) =>{
 //   res.send( "Hello user protectttted")
// })

router.post('/signup', uservalidationRules(), validate, (req,res)=>{
    console.log(req.body.firstname);
    console.log("i m in auth");
    const {firstname, lastname, email, phoneNo, password, dob, userPhoto, currentCity, gender, isVerified} = req.body;   //we r getting this values from request body and it'll get stored in required const.
    console.log("i m in auth01");
    if( !firstname || !lastname || !phoneNo || !password || !dob || !currentCity || !gender || !isVerified){
        return res.json({ error: "Please add all the fields"});
    }
    console.log("i m in auth02");
    User.findOne({phoneNo:phoneNo}) //this function will find the user with the given phoneNo.
    .then((savedUser) =>{
        if(savedUser){     //if we got true value of savedUser that means it exists in the collections.
            console.log("error in repeat");
            return res.json({error: "User already exists"})
        }
        bcrypt.hash(password, 12)    //this is Bcrypt Js library for encryption of passwords  // npm install bcryptjs
        .then((hashedpassword)=>{
            console.log("i m in auth03");
            const user = new User({
                firstname,                 //here both key and value have same name so directly only "name" is written.
                lastname,
                email,
                phoneNo,
                password : hashedpassword,  //but here password is diff that we got from hashedpassword.
                dob,
                userPhoto:'',
                currentCity,
                gender,
                isVerified
                
            })
            console.log("i m in auth1");
            user.save()   //this will save the user document in the collection // mongoose function it is
            .then(user=>{
                res.json({mesaage: "user added succcessfully"})
            })
            .catch( err =>{
                console.log("error in auth signup" + err); 
            })
        })
        .catch(err=>{
            console.log("error in catch block of auth signup" + err);
        })
        
    }
    )
})

router.post('/signin', (req,res)=>{
    const {phoneNo, password} = req.body

    if(!phoneNo || !password){     //if there is even one value missing then throw err nd msg to give both values.
        res.json({message: "enter both the values!!"})
    }
    console.log("check in signin b4 finding phoneNo in db");
    User.findOne({phoneNo:phoneNo})   //here we find the user having the phoneno as phoneNo. Its a inbuilt moongoose function.
    .then( savedUser =>{

        console.log("check in signin after finding phoneNo in db");
        if(!savedUser){
            console.log("we didn't get user by that phoneNo");
            return res.json({mesaage : "invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)   //this function return boolean value of true and false.
        .then(doMatch =>{
            if(doMatch){
                //res.json({message: "successfully logged in"})
                const token = jwt.sign({_id: savedUser._id}, jwtsecret)
                console.log(token, savedUser);
                res.json({token: token, loggeduser: savedUser}); 
            }
            else{
                res.json({message: "phoneNo or password is incorrect"})
            }
        })
    })
    .catch(err => {
        console.log("error occured during finding phoen no" + err);
    })
}) 


module.exports = router