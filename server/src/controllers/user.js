const email = require("../services/email");
const Math = require("mathjs");
const db = require("../db");
const jwt = require("../services/jwt");
const bcrypt = require("bcrypt-nodejs");
const UpdatePasswordPolicy = require("../policies/UpdatePasswordPolicy");
const user_db = require('../services/database/users_db');

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
    console.log("Compare password error");
  }
} 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = {
  //Add User
  add_user: async function(req, res, next) {
    let pw = randomPasswordGenerator();
    let pw_encrypt = await encrypt(pw);
    user_db.add_user(req, pw_encrypt).then( (result) => {
        res.status(200).send({message:"User Created...."});
        email.transporter.sendMail(email.mailOptions(req.body, pw),(error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          }
        ); 
      }).catch( (err) => {
        //This needs to be split up into two errors. One if the database is not runing the second if the user already esists
        //res.status(500).send("Problem occured while trying to connect.");
        res.status(409).send({error:"User already exists in the database"}); 
      });
  },
    //Get Users
    get_users: async function(req,res){
      user_db.get_users().then((result)=>{
            res.status(200).send({
              users: result});
        }).catch((error) => {
            res.status(500).send({error:"Problem occured while trying to connect."});
        })
    },
  //Delete User
  delete_user: async function (req, res) {
    console.log('Called')
    user_db.get_single_user(req.body.email).then(result => { //Make sure the user exists
      if (result == "") {
        res.status(404).send({
          error: "User does not exists"
        })
        console.log('User does not exists');
      } else {
        user_db.delete_user(req.body.email).then(result => {
          res.status(200).send({
            message: 'User account Deleted'
          });
          console.log('User Deleted....');
        }).catch(error => {
          console.log('Error');
        })
      }
    }).catch(error => {
      res.status(500).send({error:"Problem occured while trying to connect."});
    })
  },

  //Login
  login: function(req, res) {
    if(req.body.newuser==0){
      user_db.get_single_user(req.body.email).then(async (result) => {
        console.log(result[0]);
          if (result == "") {
            //Email does not exists
            res.status(403).send({error:"Incorrect email or password!"});
          } else {
                let encryted_data = await compare(req.body.password, result[0].password)
            if (encryted_data ==1) {
              //Correct Credentials
              if (result[0].new_user == "1") {
                //Prevent someone from logging in without changing the default password
                res.send({
                  message:"Need to change default password!",
                  user: {
                    email: result[0].email,
                    new_user: result[0].new_user
                  }});
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
              res.status(403).send({error:"Incorrect  password!"});
            }
          }
        }).catch((err) => {
          res.status(500).send({error:"Problem occured while trying to connect."});
        })
    }else if(req.body.newuser==1){
      user_db.get_single_user(req.body.email).then(async (result) => {
        if (result == "") {
          //Email does not exists
          res.status(403).send({error:"Incorrect email or password!"});
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
              res.status(401).send({error:"Only change password on FIRST Login!"});
            }
          } else {
            //Incorrect Password
            res.status(403).send({error:"Incorrect password!"});
          }
        }
      }).catch((err) =>{
        res.status(500).send({error:"Problem occured while trying to connect."});
      })
    }
  }
};

 