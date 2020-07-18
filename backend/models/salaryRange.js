const mongoose = require('mongoose');

const salaryRangeSchema = new mongoose.Schema({

    salaryRangeString:{
        type: String,
        required: true
    },
    salaryType:{
        type: String,
        required: true
    }
})

mongoose.model('salaryRange', salaryRangeSchema);