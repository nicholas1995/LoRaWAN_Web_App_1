const email = require("../services/email");
const Math = require("mathjs");
const db = require("../db");
const jwt = require("../services/jwt");
const bcrypt = require("bcrypt-nodejs");
const UpdatePasswordPolicy = require("../policies/UpdatePasswordPolicy");
const user_db = require('../services/database/users_db');
const devices_db = require("../services/database/devices_db");

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
      users = await user_db.get_users()
        .catch((err) => {
          throw err;
        })
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
      if (data.user_class == 'Fisher'){
        for(let i =0; i< data.devices.length; i++){
          await user_db.add_device_fisher(data.email, data.devices[i])
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
      await user_db.delete_fisher_devices(data.email) //delete for whoever you are
        .catch(err => {
          //Error comparing existing set and updated set of devices
          throw err;
        })
      if (data.user_class == 'Fisher') { //only add if ur a fisher
        for (let i = 0; i < data.devices.length; i++) {
          await user_db.add_device_fisher(data.email, data.devices[i])
            .catch(err => { 
              //Error adding a user device eui to the database
              throw err;
            })
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
      await user_db.delete_user(req.params.email)
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
    //Get User Devices (devices associated with a fisher)
    get_user_devices: async function (req, res) {
      let user_devices;
      let devices;
      try {
        user_devices = await user_db.get_fisher_devices(req.params.user_email)
          .catch((err) => {
            throw err;
          })
        devices = await devices_db.get()
          .catch(err => {
            throw err;
          });
        user_devices = JSON.stringify(user_devices);
        devices = JSON.stringify(devices);
        res.status(200).send({ user_devices: user_devices, devices: devices,message: 'Users fetched', type: 'success' });
      } catch (err) {
        res.status(500).send({ message: "Failed to get user devices", type: 'error' });
      }
    }, 

  //Login New
  login_new: async function(req, res){
    try{
      let data = JSON.parse(req.body.data); 
      let result =await user_db.get_single_user(data.email)
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
      let result = await user_db.get_single_user(data.email)
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
  profile: function(req,res){
    try{
      res.status(200).send({user:{
        first_name: req.user[0].first_name,
        last_name: req.user[0].last_name,
        address: req.user[0].address,
        home_phone: req.user[0].home_phone,
        mobile_phone: req.user[0].mobile_phone,
        email: req.user[0].email
      }});
    }catch(err){
      console.log('Error trying to send profile information');
    }
  }
};