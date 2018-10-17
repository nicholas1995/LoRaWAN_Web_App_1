const CreateUserPolicy = require('./policies/CreateUserPolicy');
const user = require('./controllers/user');
const authenticate = require('./policies/isAuthenticated');


module.exports = ((app) => {
    //Add User
    app.post('/register',authenticate, CreateUserPolicy.register, user.add_user);

    //User Login
    app.post('/login', user.login);

    //Get Users
    app.get('/users',authenticate, user.get_users);

    //Delete User 
    app.post('/user/delete',authenticate, user.delete_user);

    //Update User
    app.put('/user/update',authenticate,CreateUserPolicy.update_user, user.update_user);
});    