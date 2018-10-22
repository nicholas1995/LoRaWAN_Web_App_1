const CreateUserPolicy = require('./policies/CreateUserPolicy');
const user = require('./controllers/user');
const authenticate = require('./policies/isAuthenticated');


module.exports = ((app) => {

    //Add User
    app.post('/user',authenticate, CreateUserPolicy.register, user.add_user);

    //User Login
    app.post('/login', user.login);

    //Get Users
    app.get('/user',authenticate, user.get_users);

    //Delete User 
    app.delete('/user',authenticate, user.delete_user); //should change to a delete method instead of putting delete in the path 

    //Update User
    app.put('/user',authenticate,CreateUserPolicy.update_user, user.update_user);

    //Get Profile Information
    app.get('/profile',authenticate, user.profile);
});     