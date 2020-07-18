const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const ownersFavLabourSchema = new mongoose.Schema({
    ownerId:{
        type: ObjectId,
        ref: "User"
    },
    labourId:{
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model('ownersFavLabour', ownersFavLabourSchema);