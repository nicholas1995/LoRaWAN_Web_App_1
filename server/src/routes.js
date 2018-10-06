const CreateUserPolicy = require('./policies/CreateUserPolicy');
const database_user = require('./services/database/user');

module.exports = ((app) => {
    //Create User
    app.post('/register', CreateUserPolicy.register, database_user.register);

    //User Login
    app.post('/login', database_user.login);
});   