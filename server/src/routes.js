const CreateUserPolicy = require('./policies/CreateUserPolicy');
const user = require('./controllers/user');


module.exports = ((app) => {
    //Add User
    app.post('/register', CreateUserPolicy.register, user.add_user);

    //User Login
    app.post('/login', user.login);

    //Get Users
    app.get('/users', user.get_users);

    //Delete User 
    app.post('/user/delete', user.delete_user);
});   