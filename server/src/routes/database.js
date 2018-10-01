const CreateUserPolicy = require('../policies/CreateUserPolicy');
const jwebt = require('jsonwebtoken');
const config = require('../configeration/config');
module.exports = ((app, db) => {
    //Create User
    app.post('/register', CreateUserPolicy.register, (req, res) => {
        let sql = `INSERT INTO users (email,first_name,last_name,password,address,home_phone,mobile_phone)
        VALUES ('${req.body.email}','${req.body.first_name}','${req.body.last_name}','${req.body.password}','${req.body.address}','${req.body.home_phone}','${req.body.mobile_phone}')`;
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
                        res.send({
                           user: result[0]
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