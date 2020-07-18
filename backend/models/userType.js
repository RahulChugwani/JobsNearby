const mongoose = require('mongoose')

const UserTypeSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    }
})

mongoose.model('usertype', UserTypeSchema);

