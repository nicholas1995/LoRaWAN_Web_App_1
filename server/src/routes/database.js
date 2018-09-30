const CreateUserPolicy = require('../policies/CreateUserPolicy');
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
});

 