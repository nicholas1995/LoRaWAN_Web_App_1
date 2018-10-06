const email = require("../email");
const Math = require("mathjs");
const db = require("../../db");
const jwt = require("../../controllers/jwt");
const bcrypt = require("bcrypt-nodejs");
const UpdatePasswordPolicy = require("../../policies/UpdatePasswordPolicy");

//Creates a random password of length 8 using characters 0-9 and
function randomPasswordGenerator() {
  return Math.random(0, 2)
    .toString(36)
    .substring(2, 10);
}

function toJSON(user) {
  //this converts the user data returned from the database query to a json object
  return {
    email: user[0].email,
    first_name: user[0].first_name,
    last_name: user[0].last_name,
    password: user[0].password
  };
}
function encrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(5, (error, result) => {
      bcrypt.hash(password, result, null, (error, result) => {
        resolve(result);
      });
    });
  });
}
//Function compares the plain text password and the encryted password stored in the 
//database and returns 1 if they are the same and 0 if they are different 
function compare(data, encrypted) { 
  try {
    return new Promise((resolve, reject) => {
      bcrypt.compare(data, encrypted, (error, result) => {
        if (result == true) {
          return resolve(1);
        } else {
          return resolve(0);
        }
      });
    });
  } catch (err) {
    console.log("Compare password");
  }
}
module.exports = {
  //Registerq
  register: async function(req, res, next) {
    let pw = randomPasswordGenerator();
    let pw_encrypt = await encrypt(pw);
    let sql = `INSERT INTO users (email,first_name,last_name,password,address,home_phone,mobile_phone,new_user)
    VALUES ('${req.body.email}','${req.body.first_name}','${req.body.last_name}','${pw_encrypt}','${req.body.address}','${req.body.home_phone}','${req.body.mobile_phone}','1')`;
    let query = db.queryAsync(sql).then(function(result) {
        res.status(200).send("User Created....");
        email.transporter.sendMail(email.mailOptions(req.body, pw),(error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        );
      }).catch(function(err) {
        //This needs to be split up into two errors. One if the database is not runing the second if the user already esists
        //res.status(500).send("Problem occured while trying to connect.");
        res.status(409).send("User already exists in the database"); 
      });
  },

  //Login
  login: function(req, res) {
    let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`;
    let query = db.queryAsync(sql).then(async function(result){
        if (result == "") {
          //Email does not exists
          res.status(403).send("Incorrect email or password!");
        } else {
              let encryted_data = await compare(req.body.password, result[0].password)
          if (encryted_data ==1) {
            //Correct Credentials
            if (result[0].new_user == "1") {
              //Prevent someone from logging in without changing the default password
              res.status(412).send("Need to change default password!");
            } else {
              var userJSON = toJSON(result);
              res.send({
                user: userJSON,
                token: jwt.jwtUserSignin(userJSON),
                message: 'Successful Login'
              });
            }
          }else {
            //Incorrect Password
            res.status(403).send("Incorrect  password!");
          }
      }
    }).catch(function(err){
      res.status(500).send("Problem occured while trying to connect.");
    })
  },
  //Login New User
  login_new_user: function(req, res) {
    let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`;
    let query = db.queryAsync(sql).then(async function(result){
      if (result == "") {
        //Email does not exists
        res.status(403).send("Incorrect email or password!");
      } else {
        let encryted_data = await compare(req.body.password, result[0].password)
        if (encryted_data == 1) {
          //Correct Credentials
          if (result[0].new_user == "1") {
            //Prevent someone from logging in without changing the default password
            var newUserObject = {
              newpassword: req.body.newpassword
            }; //Ensure to make sure new user password meets password policy and then update the database with this new password
            UpdatePasswordPolicy.updateUserPassword(newUserObject,res,async function() {
                let encrypted_password = await encrypt(newUserObject.newpassword);
                let sql = `UPDATE users SET password = '${encrypted_password}', new_user = 'false' WHERE email = '${req.body.email}';`;
                let query = db.query(sql, (err, result) => {
                  if (err) throw err;
                  console.log("Password Updated....");
                });
                var userJSON = toJSON(result);
                res.send({
                  user: userJSON,
                  token: jwt.jwtUserSignin(userJSON),
                  message: 'Password Updated!'
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
    }).catch(function(err){
      res.status(500).send("Problem occured while trying to connect.");
    })
  }
};

