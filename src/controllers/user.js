const email = require("../services/email");
const Math = require("mathjs");
const db = require("../db");
const jwt = require("../services/jwt");
const bcrypt = require("bcrypt-nodejs");
const UpdatePasswordPolicy = require("../policies/UpdatePasswordPolicy");
const user_db = require('../services/database/users_db');
const devices_db = require("../services/database/devices_db");
const USER_VESSEL_DB = require("../services/database/user_vessel_db");
const db_user_reset_password_token = require("../services/database/user_reset_password_token_db");
const db_activate_user_account_token = require("../services/database/activate_user_account_token_db");




//Creates a random password of length 8 using characters 0-9 and
function randomPasswordGenerator() {
  return Math.random(0, 2)
    .toString(36)
    .substring(2, 10);
}

function toJSON(user) {
  //this converts the user data returned from the database query to a json object
  return {
    id: user[0].id,
    email: user[0].email,
    user_class: user[0].user_class
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
    throw err;
  }
} 


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = {
  //Get Users
  get: async function (req, res) {
    let users;
    try {
      if(req.access == 'self'){
        users = await user_db.get_profile(req.user.email).catch(err => {
          //Error fetching user profile information from database
          throw err;
        });
        users = users[0];
        users = {
          first_name: users.first_name,
          last_name: users.last_name,
          address: users.address,
          home_phone: users.home_phone,
          mobile_phone: users.mobile_phone,
          email: users.email
        }
      }else if(req.access == 'all'){
        users = await user_db.get_users()
          .catch((err) => {
            throw err;
          })
      }
      users = JSON.stringify(users);
      res.status(200).send({ users: users, message: 'Users fetched', type: 'success' });
    } catch (err) {
      res.status(500).send({ message: "Failed to get users", type: 'error' });
    }
  }, 
  get_one: async function (req, res) {
    let users;
    try {
        users = await user_db.get_user(req.params.user_id)
          .catch(err => {
            //Error fetching user account information from database
            throw err;
          });
        users = users[0];
        users = {
          user_id: users.id,
          first_name: users.first_name,
          last_name: users.last_name,
          user_country: users.user_country,
          user_city: users.user_city,
          user_district: users.user_district,
          user_street: users.user_street,
          home_phone: users.home_phone,
          mobile_phone: users.mobile_phone,
          user_class: users.user_class,
          email: users.email
        }
      res.status(200).send({ users: users, message: 'Users fetched', type: 'success' });
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: "Failed to get users", type: 'error' });
    }
  }, 
  //Add User
  create: async function(req, res){
    try{
      let data = req.body.user;
      await user_db.add_user(data, 'null')
      .catch((err) => {
        throw err;
      }); 
      let user = await user_db.get_profile(data.email)
        .catch(err => {
          //Error fetching the user account information of the previously created account
          //We do this to get the id of the associated account.
          throw err;
        })
      let user_JSON = {
        email: `${data.email}`,
        user_id:  `${user[0].id}`
      }
      let token =  jwt.jwt_activate_account(user_JSON);
      var mailOptions = {
        from: 'lorawanconsole@gmail.com',
        to: data.email,
        subject: 'Activate Account',
        html: `<h2>Good Day ${data.first_name},</h2> 
        <p>An account has been created using your email address for the Private Marine IoT Network Web Based Console.<br> 
        You have been granted ${data.user_class} privilages. Click <b><a href="http://localhost:8081/#/user/activate/${token}">here</a></b> to activate your account and create a password.<br>
        <b>This link is only valid for the next 48 hours.</b>
        </p>
        
        Thank You,<br>
        The Private Marine IoT Network Web Based Console Team`,
        };
        await email.transporter.sendMail(mailOptions)
        .catch(err => {
          throw err;
        })
        console.log('email sent')
        await db_activate_user_account_token.create_activate_user_account_token(token, user[0].id)
        .catch(err => {
          //Error creating token in black list
          throw err;
        })
      if (data.vessels.length > 0 ){
        for(let i =0; i< data.vessels.length; i++){
          await USER_VESSEL_DB.create_user_vessel_relationship(user[0].id, data.vessels[i])
            .catch(err => {
              //Error adding a user device eui to the database
              throw err;
            })
        }
      };  
      res.status(200).send({message: 'User created.', type: 'success' });
    }catch(err){
      res.status(500).send({ message: "Error creating user account", type: "error" });
    }  
  },
  resend_activate_account_request : async function(req, res, token_old, user_information){
    //This resends the email to the user to activate their acount after the initial link expired
    try{  
        await db_activate_user_account_token.delete_activate_user_account_token(token_old)
        .catch(err => {
          //Error deleting token in black list
          throw err;
        })
        let user_JSON = {
          email: `${user_information.email}`,
          user_id: `${user_information.user_id}`,
        }
        let token =  jwt.jwt_activate_account(user_JSON)
        var mailOptions = {
          from: 'lorawanconsole@gmail.com',
          to: user_information.email, 
          subject: 'Activate Account',
          html: `<h2>Good Day,</h2> 
          <p>An account has been created using your email address for the Private Marine IoT Network Web Based Console.<br> 
          However, the previous link expired. Please click <b><a href="http://localhost:8081/#/user/activate/${token}">here</a></b> to activate your account and create a password.<br>
          <b>This link is only valid for the next 48 hours.</b>
          </p>
          
          Thank You,<br>
          The Private Marine IoT Network Web Based Console Team`,
          };
          await email.transporter.sendMail(mailOptions)
            .catch(err => {
              throw err;
            })
          await db_activate_user_account_token.create_activate_user_account_token(token, user_information.user_id)
          .catch(err => {
            //Error creating token in black list
            throw err;
          })
          console.log('Email Sent')
          res.status(401).send({ error: "Token previously expired. Please check email for new account activation link." });
    }catch(err){
      console.log(err)
    }
  },
  activate_account: async function(req, res){
    try{
      let error_location = null;
      let password = req.body.data.password
      let result = await user_db.get_profile(req.user.email)
      .catch(err => {
        //Error getting user form database using email to find
        throw err;
      })
      if (result == "") {//Email does not exists 

      }
      else{
        if(result[0].user_account_activation == 1 ){//Correct email but account already activated
          res.status(403).send({ message: "Account already activated. This is an old link." });
        }else{
          let encrypted_password = await encrypt(password)
          .catch(err => {
            //Error encrypting pw
            throw err;
          });
          await user_db.update_user_pw(encrypted_password, req.user.email)
              .catch(err => {
                //Error updating user pw
                error_location = 0;
                throw err;
              })
              await user_db.activate_user_account(req.user.email)
                .catch(err => {
                  //Error setting user_account_activation flag
                  throw err;
                })
           //Password Updated.... Now we are going to login the user
          let result = await user_db.get_profile(req.user.email)
          .catch(err => {
            //Error getting user form database using email to find(Password updated)
            error_location = 1;
            throw err;
          })
          let userJSON = toJSON(result);
                let data = {
                  user: userJSON,
                  user_class: result[0].user_class,
                  token: jwt.jwtUserSignin(userJSON), 
                  message: 'Successful Login',
                  user_name: (result[0].first_name + " " + result[0].last_name)
                }
          let token = req.headers.authorization
          token = token.slice(7)
          await db_activate_user_account_token.delete_activate_user_account_token(token)
          .catch(err => {
            throw err;
          })
          res.status(200).send(data); 
        }
      }
    }catch(err){
      console.log(err)
      if(error_location ==0){
          res.status(500).send({ message: "Failed update password" , type: 'error'});
      }
      else if(error_location ==1){
          res.status(200).send({ message: "Password Updated. Failed to login", type: 'info'})
      }else{
          res.status(500).send({ message: 'Server Error', type: 'error'})
      }
    }
  },
  //Update User
  update: async function (req, res) {
    try {
      let data = req.body.user;
      await user_db.update_user(data, req.params.user_id)
        .catch(err => {
          //Error updating user on the database
          throw err;
        });
        if(data.vessels.deleted.length > 0){
          for (let i = 0; i < data.vessels.deleted.length ;i++){
            await USER_VESSEL_DB.delete_user_vessel_relationship(req.params.user_id, data.vessels.deleted[i])
              .catch(err => {
                //Error deleting user vessel relationship
                throw err;
              });
          }
        }
        if (data.vessels.added.length > 0) {
          for (let i = 0; i < data.vessels.added.length; i++) {
            await USER_VESSEL_DB.create_user_vessel_relationship(req.params.user_id, data.vessels.added[i])
              .catch(err => {
                //Error deleting user vessel relationship
                throw err;
              });
          }
      }
      res.status(200).send({ message: 'User updated.', type: 'success' });
    } catch (err) {
      console.log(err);
    }
  },
  //Delete User
  delete: async function (req, res) {
    let users;
    try {
      await user_db.delete_user(req.params.id)
        .catch(err => {
          //Error deleting user
          throw err;
        })
      users = await user_db.get_users()
        .catch((err) => {
          throw err;
        })
      users = users;
      res.status(200).send({ users: users, message: 'User deleted.', type: 'success' });
    } catch (err) {
      console.log(err);
    }
  }, 

  //Get User Vessels (devices associated with a fisher)
  get_user_vessels: async function (req, res) {
    let user_vessels;
    try {
      user_vessels = await USER_VESSEL_DB.get_user_vessels_not_deleted(req.params.user_id)
        .catch((err) => {
          throw err;
        })
      user_vessels = JSON.stringify(user_vessels);
      res.status(200).send({ user_vessels: user_vessels, message: 'User vessels fetched', type: 'success' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Failed to get user vessels", type: 'error' });
    }
  }, 

  //Login New
  login_new: async function(req, res){
    try{
      let data = JSON.parse(req.body.data); 
      let result = await user_db.get_profile(data.email)
        .catch(err => {
          //Error getting user form database using email to find
          throw err;
        })
      if (result == "") {//Email does not exists
        res.status(403).send({ message: "Incorrect login credentials" });
      }
      else{
        if(result[0].user_reset_password == 1 ){//Correct email but password requested to be reset. PREVENT LOGIN
          res.status(403).send({ message: "Password requested to be changed. Please check email for instructions." });
        }else if(result[0].user_account_activation == 0 ){//Correct email but account not activated
          res.status(403).send({ message: "Please check email address for link to activte your account. Once activated you can login." });
        }else{
          let encryted_data = await compare(data.password, result[0].password)
          .catch(err => {
            //Error checking to see if passwords are the same
            throw err;
          });
        if (encryted_data ==1){//Correct login credentials
          if(result[0].new_user ==1){//New User
            res.status(409).send({ new_user: 1 });
          }
          else{//Existing user
            let userJSON = toJSON(result);
            let data = {
              user: userJSON,
              user_class: result[0].user_class,
              token: jwt.jwtUserSignin(userJSON),
              message: 'Successful Login',
              user_name: (result[0].first_name + " " + result[0].last_name)
            }
            data = JSON.stringify(data);
            res.status(200).send(data);
          }
        }else{
          //Incorrect PW;
          res.status(403).send({ message: "Incorrect login credentials" });
        }
        }

      }
    }catch(err){
      console.log(err);
    } 
  },
  //Login New User
  login_new_user: async function(req, res){
    let data;
    try{
      data = JSON.parse(req.body.data);
      let result = await user_db.get_profile(data.email)
        .catch(err => {
          //Error getting user form database using email to find
          throw err;
        })
      if (result == "") {//Email does not exists
        res.status(403).send({ message: "Incorrect login credentials" });
      }
      else {
        let encryted_data = await compare(data.password, result[0].password)
          .catch(err => {
            //Error checking to see if passwords are the same
            throw err;
          });
        if (encryted_data == 1) {//Correct login credentials
          UpdatePasswordPolicy.updateUserPassword(data.new_password, res, async function (){
            let encrypted_password = await encrypt(data.new_password)
              .catch(err => {
                //Error encrypting pw
                throw err;
              });
            await user_db.update_user_pw(encrypted_password,data.email)
              .catch(err => {
                //Error updating user pw
                throw err;
              })
            let userJSON = toJSON(result);
            data = {
              user: userJSON,
              user_class: result[0].user_class,
              token: jwt.jwtUserSignin(userJSON),
              message: 'Successful Login',
              user_name: (result[0].first_name + " " + result[0].last_name)
            };
            data = JSON.stringify(data);
            res.status(200).send(data);
          }).catch(err => {
            console.log(err)
          })
        }else {
          //Incorrect PW;
          res.status(403).send({ message: "Incorrect login credentials" });
        }
      }
    }catch(err){

    }
  }, 
  //Get Profile Information
  profile_get: async function(req,res){
    let user_information;
    try{
      user_information = await user_db.get_profile(req.user.email)
        .catch(err => {
          //Error fetching user profile information from database
          throw err;
        })
      user_information = user_information[0];
      user_information = {
        first_name: user_information.first_name,
        last_name: user_information.last_name,
        user_country: user_information.user_country,
        user_city: user_information.user_city,
        user_district: user_information.user_district,
        user_street: user_information.user_street,
        home_phone: user_information.home_phone,
        mobile_phone: user_information.mobile_phone,
        email: user_information.email
      }
      user_information = JSON.stringify(user_information);
      res.status(200).send({ user_information})
    }catch(err){
      console.log(err);
      console.log('Error trying to send profile information');
    }
  },
  profile_update: async function(req, res){
    let user_information;
    try{
      user_information = JSON.parse(req.body.data);
      await user_db.update_profile(user_information)
        .catch(err => {
          throw err;
        });
      let data = { user_name: (user_information.first_name + " " + user_information.last_name) }
      data = JSON.stringify(data);
      res.status(200).send({data});

    }catch(err){
      console.log(err);
    }
  },
  profile_update_password: async function(req, res){
    let data;
    try{
      data = JSON.parse(req.body.data);
      let result = await user_db.get_profile(req.user.email)
        .catch(err => {
          //Error getting user form database using email to find
          throw err;
        })
      let encryted_data = await compare(data.current_password, result[0].password)
        .catch(err => {
          //Error checking to see if passwords are the same
          throw err;
        });
      if (encryted_data == 1) {//Correct login credentials
          let encrypted_password = await encrypt(data.new_password)
            .catch(err => {
              //Error encrypting pw
              throw err;
            });
        await user_db.update_user_pw(encrypted_password, req.user.email)
            .catch(err => {
              //Error updating user pw
              throw err;
            })
        res.status(200).send({ message: "Password Updated" });
      } else {
        //Incorrect PW;
        res.status(403).send({ message: "Incorrect password" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  reset_password_request: async function(req, res){
    //This sends the email to the user to reset their password
    try{
      let result = await user_db.get_profile(req.body.email)
        .catch(err => {
          //Error getting user form database using email to find
          throw err;
        })
      if (result == "") {//Email does not exists (sends this message so they user will not be able to fish for emails)
        res.status(403).send({ message: "Check email for instructions to reset your password. If no email received ensure that email entered above is correct." });
      }else if(result[0].user_account_activation == 0 ){//Correct email but account not activated
        res.status(403).send({ message: "Account not activated. Please check email for activation link." });
      }else{
        if(result[0].user_reset_password == 1 ){//Correct email but password requested to be reset. PREVENT LOGIN
          res.status(403).send({ message: "Password previously requested to be changed. Please check email for instructions." });
        }else{
          let user_JSON = {
            email: `${req.body.email}`,
            user_id: `${result[0].id}`
          }
          let token =  jwt.jwt_user_reset_pw(user_JSON)
          var mailOptions = {
            from: 'lorawanconsole@gmail.com',
            to: req.body.email,
            subject: 'Password Reset',
            html: `<h2>Good Day ${result[0].first_name},</h2> 
            <p>You recently requested to reset your password for your Private Marine IoT Network Web Based Console account.
            <br> Click <b><a href="http://localhost:8081/#/user/reset_password/${token}">here</a></b> to reset it. 
            <b>This password reset link is only valid for the next 24 hours.</b>
            </p>
  
            Thank You,<br>
            The Private Marine IoT Network Web Based Console Team`,
            };
            await email.transporter.sendMail(mailOptions)
              .catch(err => {
                throw err;
              })
            await user_db.update_user_reset_password(req.body.email, 1)
              .catch(err => {
                //Error setting user_reset_password flag
                throw err;
              })
              await db_user_reset_password_token.create_user_reset_password_token(token, result[0].id)
              .catch(err => {
                //Error creating token in black list
                throw err;
              })
          console.log('Email Sent')
          res.status(403).send({ message: "Check email for instructions to reset your password. If no email received ensure that email entered above is correct." });
        }
      }

    }catch(err){
      console.log(err)
    }
  }, 
  resend_reset_password_request : async function(req, res, token_old, user_information){
    //This resends the email to the user to reset their password after the initial one expired
    try{  
      await db_user_reset_password_token.delete_user_reset_password_token(token_old)
      .catch(err => {
        //Error creating token in black list
        throw err;
      })
          let user_JSON = {
            email: `${user_information.email}`,
            user_id: `${user_information.user_id}`
          }
          let token =  jwt.jwt_user_reset_pw(user_JSON)
          var mailOptions = {
            from: 'lorawanconsole@gmail.com',
            to: user_information.email,
            subject: 'Password Reset',
            html: `<h2>Good Day,</h2> 
            <p>You recently requested to reset your password for your Private Marine IoT Network Web Based Console account.
            <br>Click <b><a href="http://localhost:8081/#/user/reset_password/${token}">here</a></b> to reset it. 
            <b>This password reset link is only valid for the next 24 hours.</b>
            </p>
  
            Thank You,<br>
            The Private Marine IoT Network Web Based Console Team`,
            };
            let email_result = await email.transporter.sendMail(mailOptions)
              .catch(err => {
                throw err;
              })
              await db_user_reset_password_token.create_user_reset_password_token(token, user_information.user_id)
              .catch(err => {
                //Error creating token in black list 
                throw err;
              })
          console.log('Email Sent')
          res.status(401).send({ error: "Token previously expired. Please check email for new reset password link." });
    }catch(err){
      console.log(err)
    }
  },
  reset_password: async function(req, res){
    try{
      let error_location = null;
      let password = req.body.data.new_password
      let result = await user_db.get_profile(req.user.email)
      .catch(err => {
        //Error getting user form database using email to find
        throw err;
      })
      if (result == "") {//Email does not exists 

      }
      else{
        if(result[0].user_reset_password == 0 ){//Correct email but password requested to be reset. PREVENT changing password again
          res.status(403).send({ message: "Password already updated. This is an old link!" });
        }else{
          let encrypted_password = await encrypt(password)
          .catch(err => {
            //Error encrypting pw
            throw err;
          });
          await user_db.update_user_pw(encrypted_password, req.user.email)
              .catch(err => {
                //Error updating user pw
                error_location = 0;
                throw err;
              })
              await user_db.update_user_reset_password(req.user.email, 0)
                .catch(err => {
                  //Error setting user_reset_password flag
                  throw err;
                })
          //Password Updated.... Now we are going to login the user
          let result = await user_db.get_profile(req.user.email)
          .catch(err => {
            //Error getting user form database using email to find(Password updated)
            error_location = 1;
            throw err;
          })
          let userJSON = toJSON(result);
                let data = {
                  user: userJSON,
                  user_class: result[0].user_class,
                  token: jwt.jwtUserSignin(userJSON), 
                  message: 'Successful Login',
                  user_name: (result[0].first_name + " " + result[0].last_name)
                }
          let token = req.headers.authorization
          token = token.slice(7)
          await db_user_reset_password_token.delete_user_reset_password_token(token)
          .catch(err => {
            throw err;
          })
          res.status(200).send(data);
        }
      }
    }catch(err){
      console.log(err)
      if(error_location ==0){
          res.status(500).send({ message: "Failed update password" , type: 'error'});
      }
      else if(error_location ==1){
          res.status(200).send({ message: "Password Updated. Failed to login", type: 'info'})
      }else{
          res.status(500).send({ message: 'Server Error', type: 'error'})
      }
    }
  },

};