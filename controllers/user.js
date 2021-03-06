const User = require('../models/user');
//To encrypt our login info
const bcrypt = require('bcrypt');
//using jwt
const jwt = require('jsonwebtoken');

exports.signup = (req,res,next) => {
    //we call bcrypt's hash function on our password and ask it to salt the password 10 times
    //it's an asynchronous task and thus returns a promise
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save().then(() => {
            res.status(201).json({
                message: 'User added succesfully!'
            });
        }).catch((error) => {
            res.status(500).json({
                error: error
            });
        });
    });
}

//implementing the login function
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            const token = jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
            res.status(200).json({
              userId: user._id,
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  }
// exports.login = (req,res,next) => {
//     //check if user actually exists
//     User.findOne({ email: req.body.email }).then((user) => {
//         //if user does not exist
//         if (!user) {
//            return  res.status(401).json({
//                 error: new Error('User not found')
//             })
//         }
//         //user exists -compare passwords
//         bcrypt.compare(req.body.password, user.password).then((valid) => {
//             //if password not found
//             if (!valid) {
//                 return res.status(401).json({
//                     error: new Error('Incorrect password')
//                 });
//             }
//             //succeful login
//             //we need to create the token for the user
//             const token = jwt.sign(
//                 { userId: user._id },
//                 'RANDOM_TOKEN_SECRET',
//                 { expiresIn: '24h' });
//               res.status(200).json({
//                 userId: user._id,
//                 token: token
//               });
//             }
//         ).catch((error) => {
//             res.status(500).json({
//                 error: error
//             });
//         });
//     });
// }
