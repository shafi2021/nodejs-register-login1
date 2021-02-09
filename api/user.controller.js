// user.route.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
//const Userlog = require('../models/userlog.model');
//const sidemenu = require('../../sidemenu-1.json')

//signup
exports.signup = function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash,
                mobile: req.body.mobile,
                // role: req.body.role,
                // status: true,
                // phonenumber: 123,
                // firstlogin: 0,
                // selectchannel: req.body.chennal,
                // grouping: req.body.grouping,
                // inbox: req.body.inbox
            });
            user.save().then(function (result) {
                console.log(result);
                res.status(200).json({
                    success: 'New user has been created'
                });
            }).catch(error => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });
};










exports.signin = function (req, res) {
    //console.log(req.body)
    User.findOne({ email: req.body.email })
        .exec()
        .then(function (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                console.log(result)
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }


                if (result) {
                    console.log(result)
                    const JWTToken = jwt.sign({
                        email: user.email,
                        _id: user._id
                    },
                        'secret',
                        {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        success: 'You are successfully logged in',
                        _id: user._id,
                        token: JWTToken,
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,


                    });

                }
                //
                if (result) {
                    return res.status(200).json({
                        success: 'Welcome to the JWT Auth'
                    });
                }
                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            });
        })



        .catch(error => {
            res.status(500).json({
                error: error
            });
        });;
};
//signin
// exports.signin = function (req, res) {
//    // console.log("comming=>", req.body)
//     User.findOne({
//         email: req.body.email
//     })
//         .exec()
//         .then(function (user) {
//            // console.log("user=>", user)
//             // if (user.status == false) {
//             //     return res.status(401).json({
//             //         Message: 'Login Status Inactive',
//             //         Failed: 'Unauthorized Access'
//             //     })
//             // }
//           //  else if (user.status == true) {
//                 bcrypt.compare(req.body.password, user.password, function (err, result) {
//                     console.log(result)
//                     if (err) {
//                         return res.status(401).json({
//                             failed: 'Unauthorized Access'
//                         });
//                     } else {
//                         new Promise(function (resolve, reject) {
//                             if (result) {
//                                 const JWTToken = jwt.sign({
//                                     // email: user.email,
//                                     // _id: user._id
//                                 },
//                                     'secret', {
//                                     expiresIn: '2h'
//                                 });
//                                 return resolve({
//                                     succcestoken: {
//                                         success: 'Welcome to the JWT Auth',
//                                         token: JWTToken
//                                     }
//                                     //,userdetail: user
//                                 })
//                             }
//                             return res.status(401).json({
//                                 failed: 'Unauthorized Access'
//                             });
//                         })
//                         // .then(function (result) {

//                         //     logintime(result, res)
//                         // })
//                             .catch(error => {
//                                 res.status(500).json({
//                                     error: error
//                                 });
//                             });;
//                     }
//                 })
//            // }
//         })
// };

// //userlist
// exports.userlist = function (req, res) {
//     User.find({}, function (err, result) {
//         if (err)
//             res.send(err);
//         res.json(result)
//     })
// }

// //logintime
// const logintime = function (user, res) {
//     console.log("logintime", user)
//     var obj = {
//         name: user.userdetail.firstname,
//         userid: user.userdetail._id,
//     }
//     var new_userlog = new Userlog(obj);
//     new_userlog.save(function (err, result) {
//         user.succcestoken.loginid = result._id;
//         user.succcestoken.userdetail = {
//             name: user.userdetail.firstname,
//             userid: user.userdetail._id,
//             role: user.userdetail.role,
//             firstlogin: user.userdetail.firstlogin,
//             image: user.userdetail.image
//         };
//         res.status(200).json({
//             success: user.succcestoken
//         })
//     })
// }

// //firstlogin
// exports.firstlogin = function (req, res) {
//     console.log(req.body)
//    //
//    User.findOne({
//     "_id": req.params.userId
// })
// .exec()
// .then(function (user) {
//     console.log("user=>", user)
//     bcrypt.compare(req.body.password, user.password, function (err, result) {
//         if (result) {
//             res.json("exist")
//         }else if (req.body.changed) {
//         bcrypt.hash(req.body.password, 10, function (err, hash) {

//             User.findOneAndUpdate({

//                     "_id": req.params.userId,


//                 },

//                 {
//                     "$set": {
//                         "password": hash,
//                         "firstlogin": 1
//                     }
//                 }, {
//                     new: true,
//                     upsert: true
//                 }, function (err, doc) {
//                     if (err)
//                         throw err; // handle error;
//                     res.json("success")
//                 }

//             );
//         })

//     } 
//     else {
//         User.findOneAndUpdate({
//                 "_id": req.params.userId,
//             }, {
//                 "$set": {
//                     "firstlogin": 1
//                 }
//             }, {
//                 new: true,
//                 upsert: true
//             }, function (err, doc) {
//                 if (err)
//                     throw err; // handle error;
//                 res.json("success")
//             }

//         );
//     }
// })

// })
// };

// //logouttime
// exports.logouttime = function (req, res) {
//     console.log(req.params.logoutid)
//     Userlog.update({
//         _id: req.params.logoutid
//     }, {
//         logouttime: new Date
//     }, function (err, result) {
//         res.json("logouttime-checked")
//     })
// }




// //gettingchannelmenus
// exports.getchannelmenus = function (req, res) {
//     if (sidemenu.length >= 1) {
//         const selectedname = sidemenu.filter(data => {
//             return data.displayName == "Channel"
//         })
//         if (selectedname.length == 0) {
//             res.json("there is no data in chennel")
//         } else {
//             res.json(selectedname[0].children)
//         }

//     } else {
//         res.status(200).json("There is no data in menulist")
//     }

// }
// //--end--//

// exports.promisetest = function (req, res) {
//     new Promise(function (resolve, reject) {

//         setTimeout(() => resolve(1), 3000); // (*)

//     }).then(function (result) { // (**)

//         console.log(result); // 1
//         return result * 2;

//     }).then(function (result) { // (***)

//         console.log(result); // 2
//         return result * 2;

//     }).then(function (result) {

//         console.log(result); // 4
//         return result * 2;

//     });
// }

// //readuserbyid
// exports.read_userbyid = function (req, res) {
//     User.findById(req.params.userId, function (err, result) {
//         if (err)
//             res.send(err);
//         res.json(result);
//     });
// }

// //
// exports.update_a_user = function (req, res) {
//     User.findOneAndUpdate({
//         _id: req.params.userId
//     }, req.body, {
//         new: true
//     }, function (err, result) {
//         if (err)
//             res.send(err);
//         res.json(result);
//     });
// };

// //delete-user
// exports.delete_a_user = function (req, res) {


//     User.remove({
//         _id: req.params.userId
//     }, function (err, result) {
//         if (err)
//             res.send(err);
//         res.json({
//             message: 'Task successfully deleted'
//         });
//     });
// };

// //imageupload
// exports.imageupload = function (req, res) {
//     if (req.file.path) {
//         console.log(req.body)
//         User.update({
//             _id: req.params.userId
//         }, {
//             image: 'http://localhost:3000/' + req.file.path
//         }, {
//             multi: true
//         }, function (err, task) {
//             if (err) {
//                 //res.json(err)
//                 res.send("Error: Check Catergory Object ID")
//             } else {
//                 res.json({
//                     message: 'Image Update successfully '
//                 });

//             }
//         })
//     } else {
//         res.status(200).json("There no file path")
//     }

// }

// //getimage
// exports.getimage = function (req, res) {

//     User.findById({
//         _id: req.params.userId
//     }, function (err, result) {
//         if (err)
//             res.status(400).send(err)
//         if (result.image) {
//             var obj={
//                 image:result.image
//             }
//             res.status(200).json(obj)
//         }else{
//             res.status(200).json('there is no image for this user')
//         }

//     })
// }

