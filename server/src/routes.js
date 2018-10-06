const CreateUserPolicy = require('./policies/CreateUserPolicy');
const database_user = require('./controllers/user');
const read_user = require('./controllers/read_users');


module.exports = ((app) => {
    //Create User
    app.post('/register', CreateUserPolicy.register, database_user.register);

    //User Login
    app.post('/login', database_user.login);

    app.get('/users', read_user.read_user)
});   