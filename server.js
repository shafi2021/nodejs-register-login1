var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/user.model'), //created model loading here
  bodyParser = require('body-parser'),
  cors = require('cors');


  // mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reg-login',{ useNewUrlParser: true, useUnifiedTopology: true }); 

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname,  + '/static'));


var userroutes = require('./api/user.route'); //importing route
userroutes(app); //register the route




app.listen(port);


console.log('todo list RESTful API server started on: ' + port);