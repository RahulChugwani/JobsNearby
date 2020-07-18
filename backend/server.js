const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator');
//const swaggerUI = require('swagger-ui-express')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000 ;
 
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(expressValidator())
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
//app.use('/api/v1', router);


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });   //connectimg the mongodb database

const connection = mongoose.connection;
connection.once( 'open', ()=>{
    console.log("Mongodb db connection successfull");
    console.log("hppy hpy hppy hppy hppy hppy hppy"); 
});

require('./models/user')   //getting userSchema model from here.
require('./models/jobPost')  //getting jobPost schema model in here.
require('./models/userType')  //getting usertype schema in here
require('./models/requirementType')   //getting requirement type thing in here. 
require('./models/laboursFavPost')   //getting laboursFavPost schema in here.
require('./models/ownersFavLabour')   //getting ownerFavLabour schema in here.
require('./models/salaryRange')  //getting salaryRange schema in here.
require('./models/skillSets')  //gettig skillsets schema in here.

app.use(require('./routes/auth'))   //getting routing auth.js file in this which application will use
app.use(require('./routes/jobPost'))   //getting jobPost router in this which app can use.
app.use(require('./routes/getFields'))  //getting getFields router in here and making it available.
app.use(require('./routes/like'))
app.use(require('./routes/insertUpdates'))  //getting update js files in here so that server.js shld know what to use.

 
app.listen(port, ()=>{
    console.log(`server is  running on port: ${port}`);
})