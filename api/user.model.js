// user.model.js

const mongoose = require('mongoose');

const user = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name:{type: String},
   email:{type: String},
   password:{type: String},
   mobile:{type: Number},
   // firstlogin: {type: Number, required: true},
   // email: {type: String, required: true},
   // password: {type: String, required: true},
   // selectchannel:[],
   // grouping:[],
   // inbox:{type:Object},
   // image:{type:String}
});

module.exports = mongoose.model('User', user);