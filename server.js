// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//MongoDB
mongoose.connect('mongodb://localhost/talent_hunt');


// Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes
app.use('/api', require('./routes/api'));


// Start server
app.listen(3000);
console.log('API is running on port 3000');
