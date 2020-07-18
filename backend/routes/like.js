const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requiredlogin')

const laboursFavPost = mongoose.model('laboursFavPost');
const ownersFavLabour = mongoose.model('ownersFavLabour');


router.post('/likePost', requireLogin, (req,res) => {

    const postId = req.body;
    console.log("post: ");
     console.log(postId);

    if(!postId){
        return res.json({error: "no post id is sent here"});
    }

    const laboursFavPostElement = new laboursFavPost({
        labourId: req.user,
        postId: postId.postId
    })
    console.log("favpost here");
    console.log(laboursFavPostElement);

    laboursFavPostElement.save()
        .then(result => {
            res.json({laboursFavPostElement: result})
        })
        .catch(err => {
            console.log("error occured here:" + err);
        })

})

router.get('/getlikedPosts', requireLogin, (req,res) =>{

    laboursFavPost.find({labourId: req.user._id})
        .populate("postId", "_id postTitle labourType description workersCount")
        .populate("labourId",  "_id firstname usertype phoneNo")
        .then(posts =>{
            res.json({posts: posts})
        })
        .catch(err =>{
            console.log("err occured here: "+ err);
        })

})

router.delete('/unlikePost', requireLogin, (req,res) =>{
    const postId = req.body;
    laboursFavPost.find({ labourId: req.user_id, postId: postId })
        .then(() =>{
            console.log("unliked post successfully");
            res.json("likedposts got deleted");
        })
        .catch((err) =>{
            console.log("some err occurred here " + err);
        })

})

router.post('/likeLabour', requireLogin, (req,res) => {

    const labourId = req.body;

    if(!labourId){
        return res.json({error: "no labour id is sent here"});
    }

    const ownersFavLabourElement = new ownersFavLabour({
        ownerId: req.user,
        labourId: labourId
    })

    console.log(ownersFavLabourElement);
    ownersFavLabourElement.save()
        .then(result => {
            res.json({ownersFavLabourElement: result})
        })
        .catch(err => {
            console.log("error occured here:" + err);
        })

})

router.get('/getlikedLabours', requireLogin, (req,res) =>{

    ownersFavLabour.find({ownerId: req.user._id})
        .populate("ownerId", "_id firstname usertype phoneNo")
        .populate("labourId",  "_id firstname usertype phoneNo")
        .then(posts =>{
            res.json({posts: posts})
        })
        .catch(err =>{
            console.log("err occured here: "+ err);
        })

})

router.delete('/unlikeLabour', requireLogin, (req,res) =>{
    const labourId = req.body;
    ownersFavLabour.find({ ownerId: req.user_id, labourId: labourId })
        .then(() =>{
            console.log("unliked labour successfully");
            res.json("liked labour got deleted");
        })
        .catch((err) =>{
            console.log("some err occurred here " + err);
        })

})


module.exports = router;