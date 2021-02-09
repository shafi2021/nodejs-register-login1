'use strict';
module.exports = function (app) {
  var User = require('./user.controller');
//  var multer = require('multer');


  // var storage = multer.diskStorage({
  //   destination: function (req, file, callback) {
  //       callback(null, 'uploads');
  //   },
  //   filename: function (req, file, callback) {
  //       callback(null, file.fieldname + '-' + Date.now() + '.jpeg');
  //   }
  // });
  // let upload = multer({storage:storage});


  // todoList Routes
  app.route('/signup')
    .post(User.signup);

  // app.route('/userlist')
  //   .get(User.userlist);
  // app.route('/user/:userId')
  //   .get(User.read_userbyid)
  //   .put(User.update_a_user)
  //   .delete(User.delete_a_user)
  app.route('/signin')
    .post(User.signin)
  // app.route('/channellist')
  //   .get(User.getchannelmenus)

  // app.route('/promisetest')
  //   .post(User.promisetest)

  // app.route('/logouttime/:logoutid')
  //   .put(User.logouttime)

  // app.route('/firstlogin/:userId')
  // .put(User.firstlogin)

  // app.route('/imageupload/:userId')
  // .post(upload.single('image'), User.imageupload)

  // app.route('/getimage/:userId')
  // .get(User.getimage)


  
};