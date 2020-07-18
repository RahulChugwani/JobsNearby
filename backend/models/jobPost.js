const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const jobPostSchema = new mongoose.Schema({
    postTitle:{
        type: String, required: true
    },
    requirementType:{
        type: String, required: true
    },
    workerType:{
        type: String, required: true
    },
    salaryRange:{
        type: String, required: true
    },
    numberOfWorkerRequired:{
        type: Number, required: true
    },
    gender:{
        type: String, required: true
    },
    inTime:{
        type: String, //required: true
    },
    outTime:{
        type: String, //required: true
    },
    workDescription:{
        type: String, required: true
    },
    facilityProvided:{
        type: [String], //required: true
    },
    requiredSkillSetsId:{
        type: [Number],
        required: true
    },
    comments:{
        type: [String],
        //required: true
    },
    postedBy:{
        type: ObjectId,
        ref: "User"
    }     
})

mongoose.model('JobPost', jobPostSchema)