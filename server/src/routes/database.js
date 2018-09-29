module.exports = ((app, db) => {

    //Create Network
    app.get('/addnetwork/:network_name/:network_info1/:network_info2', (req, res) => {
        let sql = `INSERT INTO network (network_name,network_info1,network_info2)
        VALUES ('${req.params.network_name}','${req.params.network_info1}','${req.params.network_info2}')`;
        let query = db.query(sql, (err, result) => {
            if(err)throw err;
            console.log(result);
            res.send('Enter made....');
        });
    }); 

    //Read Networks
    app.get('/getnetwork', (req, res) => {
    let sql = 'SELECT * FROM network';
    let query = db.query(sql, (err, result) => {
        if(err)throw err;
        console.log('Networks Fetched....');
        res.send(result);
    });
   }); 

    //Create User
    app.post('/register', (req, res) => {
        let sql = `INSERT INTO users (email,first_name,last_name,password,address,home_phone,mobile_phone)
        VALUES ('${req.body.email}','${req.body.first_name}','${req.body.last_name}','${req.body.password}','${req.body.address}','${req.body.home_phone}','${req.body.mobile_phone}')`;
        let query = db.query(sql, (err, result) => {
            if(err)console.log('DATABASE ERROR...............');
            console.log(result);
            res.send('User Added....');
        });
    });
});
 