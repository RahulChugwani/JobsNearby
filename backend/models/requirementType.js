const mongoose = require('mongoose')

const RequirementTypeSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    }
})

mongoose.model('requirementType', RequirementTypeSchema);