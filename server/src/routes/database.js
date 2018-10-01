const CreateUserPolicy = require('../policies/CreateUserPolicy');
const jwebt = require('jsonwebtoken');
const config = require('../configeration/config');
const Math = require('mathjs');


function jwebtUserSignin(user){
    return jwebt.sign(user, config.authentication.jwebtSecret, {
        expiresIn: '24h'
    });
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
//Creates a random password of length 8 using characters 0-9 and 
function randomPasswordGenerator(){ 
    return Math.random(0,2).toString(36).substring(2, 10) 
};



module.exports = ((app, db) => {
    //Create User
    app.post('/register', CreateUserPolicy.register, (req, res) => {
        var pw = randomPasswordGenerator();
        let sql = `INSERT INTO users (email,first_name,last_name,password,address,home_phone,mobile_phone)
        VALUES ('${req.body.email}','${req.body.first_name}','${req.body.last_name}','${pw}','${req.body.address}','${req.body.home_phone}','${req.body.mobile_phone}')`;
        let query = db.query(sql, (err, result) => {
            if(err)
            {   
                res.status(409).send('This email already exists');
            }else{
            console.log(result);
                res.status(201).send('User Created....');
            }
        });
    });

        //User Login
        app.post('/login', (req, res) => {
            let sql = `SELECT *
            FROM users
            WHERE email = '${req.body.email}'`;
        let query = db.query(sql, (err, result) => {
            if(err){
                res.status(500).send('Problem occured while trying to connect.');
            }
            else{
                if(result== '')
                {   //Email does not exists
                    res.status(403).send('Incorrect email or password!'); 
                }
                else{
                    if(req.body.password == result[0].password){
                        //Correct Credentials
                        var userJSON = toJSON(result);
                        res.send({
                           user: userJSON,
                           token: jwebtUserSignin(userJSON)
                        });
                    }
                    else{
                        //Incorrect Password
                        res.status(403).send('Incorrect  password!'); 
                    }
                }
            } 
        });
}); 
});  