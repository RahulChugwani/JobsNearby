const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const laboursFavPostSchema = new mongoose.Schema({
    labourId:{
        type: ObjectId,
        ref: "User"
    },
    postId:{
        type: ObjectId,
        ref: "JobPost"
    }
})

mongoose.model('laboursFavPost', laboursFavPostSchema);