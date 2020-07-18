const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requiredlogin')  //this is the middleware that we have added in there.
const { postValidationRules, postValidate } = require('../middleware/postValidator')

const JobPost = mongoose.model("JobPost")
/*
"postTitle": "work at shop", 
"labourType": "dailywage", 
"salaryMin": 500, 
"salaryMax": 1000, 
"workersCount": 10, 
"timing" : "10-5pm", 
"description" : "hard work"

*/
 
router.get('/alljobpost', (req,res)=>{   //func for displaying all jobposts uploaded
    JobPost.find()
        .populate("postedBy", "_id name phoneNo")  //we r using populate func here to expand user ObjectId 
        .then(posts =>{                            //bcoz while showing postedBy displays only ObjectId of user so we have populated it
            res.json({posts: posts});              //2nd arg has variables that needs to be populate.
        })
        .catch(err =>{
            console.log(err);
        })
})



router.post('/createjobpost', requireLogin, postValidationRules(), postValidate, (req,res) =>{   //func for creating jobpost
    const {postTitle, requirementType, workerType, salaryRange, numberOfWorkerRequired, gender, inTime, outTime, workDescription, facilityProvided, requiredSkillSetsId } = req.body;  //getting from req body

    if( !postTitle || !requirementType || !workerType || !salaryRange || !numberOfWorkerRequired || !requiredSkillSetsId || !workDescription){
            return res.status(422).json({error: "Please add all the fields"});
    }

    req.user.password = undefined;  //we have made the password field here undefined so that when it will get stored in postedBy
    // there will be no password present // we r not changing req.user...its funct variable now.
    console.log("we r in route function");
    const jobpost = new JobPost({
        postTitle, 
        requirementType,
        workerType,
        salaryRange,
        numberOfWorkerRequired,
        gender,
        inTime,
        outTime,
        workDescription,
        facilityProvided,
        requiredSkillSetsId,
        postedBy: req.user    //we have middleware requireLogin here in this function which is sending us a req.user which is updated in middleware func
    })

    console.log("jobpost is created");
    console.log(jobpost);
    console.log(req.user);
    jobpost.save().then(result =>{
        res.json({jobpost: result});
    })
    .catch(err=>{
        console.log(err);
    })


})


router.get('/myjobpost',requireLogin, (req,res) =>{
    JobPost.find({postedBy: req.user._id})
        .populate("postedBy", "_id name phoneNo")
        .then( posts =>{
            res.json(posts);
        })
        .catch(err=>{
            console.log(err);
        })
} )



module.exports = router