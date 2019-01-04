const email = require("../services/email");
const Math = require("mathjs");
const db = require("../db");
const jwt = require("../services/jwt");
const bcrypt = require("bcrypt-nodejs");
const UpdatePasswordPolicy = require("../policies/UpdatePasswordPolicy");
const user_db = require('../services/database/users_db');
const devices_db = require("../services/database/devices_db");
const USER_VESSEL_DB = require("../services/database/user_vessel_db");


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
  //Add User
  create: async function(req, res){
    let users;
    try{
      let data = JSON.parse(req.body.data);
      let pw = randomPasswordGenerator();
      let pw_encrypt = await encrypt(pw)
      .catch(err => {
        //Error encrypting pw
        throw err;
      });
      await user_db.add_user(data, pw_encrypt)
        .catch((err) => {
          throw err;
        });
      await email.transporter.sendMail(email.mailOptions(data, pw))
        .catch(err => {
          //Error sending email
          throw err;
        })
        console.log('email sent')
      if (data.vessels.length > 0 ){
        let user = await user_db.get_profile(data.email)
          .catch(err => {
            //Error getting profile information for user created
            throw err;
          });
        for(let i =0; i< data.vessels.length; i++){
          await USER_VESSEL_DB.create_user_vessel_relationship(user[0].id, data.vessels[i])
            .catch(err => {
              //Error adding a user device eui to the database
              throw err;
            })
        }
      };
      users = await user_db.get_users()
        .catch((err) => {
          throw err;
        })
      users = JSON.stringify(users);
      res.status(200).send({ users: users, message: 'User created.', type: 'success' });
    }catch(err){
      console.log(err);
    }  
  },
  //Update User
  update: async function (req, res) {
    let users;
    try {
      let data = JSON.parse(req.body.data);
      await user_db.update_user(data)
        .catch(err => {
          //Error updating user on the database
          throw err;
        });
        if(data.vessels.deleted.length > 0){
          for (let i = 0; i < data.vessels.deleted.length ;i++){
            await USER_VESSEL_DB.delete_user_vessel_relationship(data.id, data.vessels.deleted[i])
              .catch(err => {
                //Error deleting user vessel relationship
                throw err;
              });
          }
        }
        if (data.vessels.added.length > 0) {
          for (let i = 0; i < data.vessels.added.length; i++) {
            await USER_VESSEL_DB.create_user_vessel_relationship(data.id, data.vessels.added[i])
              .catch(err => {
                //Error deleting user vessel relationship
                throw err;
              });
          }
      }
      users = await user_db.get_users()
        .catch((err) => {
          throw err;
        })
      users = JSON.stringify(users);
      res.status(200).send({ users: users, message: 'User updated.', type: 'success' });
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
      users = JSON.stringify(users);
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
        address: user_information.address,
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
  }
};