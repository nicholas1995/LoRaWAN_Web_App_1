const email = require("../email");
const Math = require("mathjs");
const db = require("../../db");
const jwt = require('../../controllers/jwt');
const UpdatePasswordPolicy = require('../../policies/UpdatePasswordPolicy');

//Creates a random password of length 8 using characters 0-9 and
function randomPasswordGenerator() {
  return Math.random(0, 2)
    .toString(36)
    .substring(2, 10);
}

function toJSON(user) { //this converts the user data returned from the database query to a json object
  return {
      "email": user[0].email,
      "first_name": user[0].first_name,
      "last_name": user[0].last_name,
      "password": user[0].password,
      "address": user[0].address,
      "home_phone": user[0].home_phone,
      "mobile_phone": user[0].mobile_phone,
      "date_created": user[0].date_created
  }
};

module.exports = {
  //Register
  register: function(req, res) {
    let pw = randomPasswordGenerator();
    let sql = `INSERT INTO users (email,first_name,last_name,password,address,home_phone,mobile_phone,new_user)
    VALUES ('${req.body.email}','${req.body.first_name}','${req.body.last_name}','${pw}','${req.body.address}','${req.body.home_phone}','${req.body.mobile_phone}','1')`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.status(409).send("This email already exists");
      } else {
        console.log('User Created...');
        res.status(201).send("User Created....");
        email.transporter.sendMail(email.mailOptions(req.body, pw),(error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );
      }
    });
  },
  //Login
  login: function(req, res) {
    let sql = `SELECT *FROM users WHERE email = '${req.body.email}'`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send("Problem occured while trying to connect.");
      } else {
        if (result == "") {
          //Email does not exists
          res.status(403).send("Incorrect email or password!");
        } else {
          if (req.body.password == result[0].password) {
            //Correct Credentials
            if (result[0].new_user == "1") {
              //Prevent someone from logging in without changing the default password
              res.status(412).send("Need to change default password!");
            } else {
              var userJSON = toJSON(result);
              res.send({
                user: userJSON,
                token: jwt.jwebtUserSignin(userJSON)
              });
            }
          } else {
            //Incorrect Password
            res.status(403).send("Incorrect  password!");
          }
        }
      }
    });
  },
  //Login New User
  login_new_user: function(req, res) {
    let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`;
    let query = db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send("Problem occured while trying to connect.");
      } else {
        if (result == "") {
          //Email does not exists
          res.status(403).send("Incorrect email or password!");
        } else {
          if (req.body.password == result[0].password) {
            //Correct Credentials
            if (result[0].new_user == "1") {
              //Prevent someone from logging in without changing the default password
              var newUserObject = {
                newpassword: req.body.newpassword
              }; //Ensure to make sure new user password meets password policy and then update the database with this new password
              UpdatePasswordPolicy.updateUserPassword(
                newUserObject,
                res,
                function() {
                  let sql = `UPDATE users SET password = '${newUserObject.newpassword}', new_user = 'false' WHERE email = '${req.body.email}';`;
                  let query = db.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log("Password Updated....");
                  });
                  var userJSON = toJSON(result);
                  res.send({
                    user: userJSON,
                    token: jwt.jwebtUserSignin(userJSON)
                  });
                }
              );
            } else {
              res.status(401).send("Only change password on FIRST Login!");
            }
          } else {
            //Incorrect Password
            res.status(403).send("Incorrect password!");
          }
        }
      }
    });
  }
};
