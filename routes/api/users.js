const router = require("express").Router();
const usersController = require("../../controllers/usersController");

var bcrypt = require( 'bcrypt-nodejs' );
var config = require('../config.js');
var User = require('../../models/user');
var jwt = require('jsonwebtoken');

////////////////////////////
// From Auth-Demo Users.js
////////////////////////////

// GET login page to PRESENT as DEFAULT LANDING PAGE
router.get('/', function(req, res, next) {
    res.send('Unprotected "/" Route'); // From Auth-Demo Users.js
    console.log('Unprotected "/" Route');
  });

router.post('/answers',function(req, res) {
    req.decoded; //{id:34342, username: zprager}
    req.body.answers; //[array]
    var query = { username: req.decoded.username };
    User.findOneAndUpdate(query, { answers: req.body.answers }, options, callback)
  });

  //with valid login, return token
  router.post('/login', function(req, res)  {
    // console.log("SAW LOGIN!! req.body: ", req.body);
      if (!req.body.email || !req.body.password) {
          // email address is absolutely necessary for user creation
          res.json({
              success: false,
              message: 'Email and password required.',
              data: {}
          });
          return;
      }
      console.log('attempting login. email: ', req.body.email);
      User.findOne({
               email: req.body.email
              },
              function(err, user) {


                  if (err) {
                      res.status(204);
                      res.json({
                          success: false,
                          message: 'Error occured while checking if the user exists',
                          data: {
                              'error': err
                          }
                      });
                      return;
                  }
                  if(user)
                  {
                    console.log("req.body.password:", req.body.password);
                    console.log("user.password:", user.password);
                    bcrypt.compare( req.body.password, user.password, function ( err, isMatch ) {
                      if ( err )
                          {
                              console.log('error: '+err );
                              res.json({
                                   success: false,
                                   message: 'Error occured while checking if the user exists',
                                   data: {
                              'error': err
                                          }
                              });
                          return;
                          }
                          console.log("isMatch: ", isMatch);
                          if(isMatch)
                              {
                                  
                                  var token = jwt.sign(
                                      {
                                      "id":user._id,
                                      "username":user.email
                                      }, config.jwt.secret, {
                                    expiresIn: 1440*1260*3600 // expires in 24 hours
                                  });
                                  res.json(
                                          {"token":token,
                                          "token_for":req.body.email
                                  });
                              }
                          else{
                              res.status(204);
                              res.json(
                                  {"message":"incorrect password"}
                                          );
                          }
                        });
                  }else
                  {
                      res.status(200);
                      res.json({"message":"no email found"});
                      return;
                  }
              }); // end find
  }); // end login

router.post('/register', function(req, res) {
    // console.log("SAW REGISTER!! req.body: ", req.body);
    if (!req.body.email || !req.body.password)
      {
        // email address is absolutely necessary for user creation
        res.json({
            success: false,
            message: 'email and password required',
            data: {}
        });
        return;
      }
        // see if users exist with the given userName and/or emailAddress

        User.find(
          {
                'email': req.body.email
          }
        , function(err, foundUsers) {
            if (err) {
                res.status(400);
                res.json({
                    success: false,
                    message: 'Error occured while checking if the user exists',
                    data: {
                        'error': err
                    }
                });
                return;
            }
            console.log('found*********** ',foundUsers);
            if (foundUsers && foundUsers.length > 0 ) {
                console.log('founder user: ', foundUsers);
                // if users are found, we cannot create the user
                // send an appropriate response back
                res.status(204);
                res.json({
                    success: false,
                    message: 'User with requested username and/or email already exists',
                    data: {}
                });
                return;
            } else {
                // create the user with specified data
                var user = new User();

                user.first_name = req.body.first_name || 'none';
                user.middle_name = req.body.middle_name;
                user.last_name =  req.body.last_name || 'none';
                user.email =     req.body.email;
                user.username =  req.body.username || 'none';
                user.password =  req.body.password;
                user.user_id =  req.body.user_id;
                user.user_pic =  req.body.user_pic;
                user.birthdate =  req.body.birthdate;
                user.age =  req.body.age;
                user.phone_number = req.body.phone_number || 5555555555;
                // console.log("ROUTE API USERS user: ", user);
                user.save(function(err) {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Error occured while saving the user',
                            data: {
                                'error': err
                            }
                        });
                        return;
                    }
                    var payload = {

                        'number': user.number,
                        'email': user.email
                    };
                    var token = jwt.sign(payload, config.jwt.secret, {
                        expiresIn: 14400*360
                    });

                    res.json({
                        success: true,
                        message: 'User added/created successfully',
                        data: {

                            'token': token
                        }
                    });
                    return;
                });
            }
        });
    }); // end register










////////////////////////////
// These were from SE
// as starting point
////////////////////////////

// Register NEW User
// router
//   .route("/register")
//     .get(usersController.findById);

// router
//   .route("/register", function(req, res, next) {
//       .get(usersController.findById)
//   });
  

  
// User's Home Page
router.route("/home")
    .get(usersController.findByUserName);

// User's Home Page
router.route("/home/:username")
    .get(usersController.findByUserName);

// Get All Users
router.route("/allusers")
    .get(usersController.findAll);
// router.get('/allusers', function(req, res) {
//     console.log("SAW get /allusers!! req.body: ", req.body);
    
// Get Users by ID
// router
//     .route("/:id")
//     .get(usersController.findById)

// Get Users by Username

router
    .route("/:username")
    .get(usersController.findByUserName)

module.exports = router;