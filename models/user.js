// Dependencies
const restful = require('node-restful');
const mongoose = restful.mongoose;


// schema
const userSchema = new mongoose.Schema({
  username: String,
  recommend: Array,

});


// Return model
module.exports = restful.model('User', userSchema);
