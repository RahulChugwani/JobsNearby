const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userType = mongoose.model('usertype');
const requirementType = mongoose.model("requirementType");
const salaryRange = mongoose.model("salaryRange");
const skillSet = mongoose.model("skillSet")

router.get('/alluserType', (req,res) => {
    console.log("in usertype route");
    userType.find()
        .then(usertype =>{
            console.log("hello in the fieldjs");
            res.json({usertype})
        })
        .catch(err => {
            res.json({error: "error in fetching usertypes from database!"});
        })
})

router.get('/allrequirementType', (req,res) => {
    requirementType.find()
        .then(requirementType =>{
            res.json({requirementType})
        })
        .catch(err => {
            res.json({error: "error in fetching requirement types from database!"});
        })
})

router.get('/allskillSet', (req,res) => {
    skillSet.find()
        .then(skillSet =>{
            res.json({skillSet})
        })
        .catch(err => {
            res.json({error: "error in fetching skillSets from database!"});
        })
})

router.post('/addusertype', (req,res)=>{
    const {name} = req.body;

    if( !name ){
        res.json({error : "please add all the fields"});
    }

    const usertypeElement = new userType({
        name :name
    })
    console.log(usertypeElement);
    usertypeElement.save()
        .then(result => {
            res.json({usertypeElement: result})
        })
        .catch( err => {
            console.log("error occured here: "+  err);
        })

})

router.post('/addrequirementType', (req,res)=>{
    const {name} = req.body;

    if( !name ){
        res.json({error : "please add all the fields"});
    }

    const requirementTypeElement = new requirementType({
        name :name
    })
    console.log(requirementTypeElement);
    requirementTypeElement.save()
        .then(result => {
            res.json({requirementTypeElement: result})
        })
        .catch( err => {
            console.log("error occured here: "+  err);
        })

})

router.post('/addSkill', (req,res)=>{
    const {name} = req.body;

    if( !name ){
        res.json({error : "please add all the fields"});
    }

    const skillSetElement = new skillSet({
        name :name
    })
    console.log(skillSetElement);
    skillSetElement.save()
        .then(result => {
            res.json({skillSetElement: result})
        })
        .catch( err => {
            console.log("error occured here: "+  err);
        })

})

router.post('/addSalaryRange', (req,res)=>{
    const {salaryRangeString, salaryType} = req.body;

    if( !salaryRangeString || !salaryType){
        res.json({error : "please add all the fields"});
    }

    const salaryRangeElement = new salaryRange({
        salaryRangeString :salaryRangeString,
        salaryType: salaryType
    }) 
    console.log(salaryRangeElement);
    salaryRangeElement.save()
        .then(result => {
            res.json({salaryRangeElement: result})
        })
        .catch( err => {
            console.log("error occured here: "+  err);
        })

})

router.get('/allsalaryRange', (req,res) => {
    salaryRange.find()
        .then(salaryRange =>{
            res.json({salaryRange})
        })
        .catch(err => {
            res.json({error: "error in fetching salary ranges from database!"});
        })
})

module.exports = router

