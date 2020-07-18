const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
    },
    usertype:{
        type: String,
        required: true
    },
    phoneNo:{
        type: Number,
        required: true
    },
    aadharCardNo:{
        type: Number,
        //required: true
    },
    userPhoto:{
        type: String,
        //required: true
    },
    aadharPhoto:{
        type: String,
        //required: true
    },
    password:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        //required: true
    },
    currentCity:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
    skillSetId: [Number],


    
})

mongoose.model('User', userSchema)