const mongoose = require('mongoose')

const SkillSetsSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    }
})

mongoose.model('skillSet', SkillSetsSchema);