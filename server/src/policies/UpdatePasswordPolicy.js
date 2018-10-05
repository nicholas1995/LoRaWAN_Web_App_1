const Joi = require('joi');

module.exports = {
    updateUserPassword (user,res, next){
        const schema = {
            newpassword: Joi.string().required().regex(
                new RegExp('^[a-zA-Z0-9\@\_\%\&]{8,32}$')
            )
        }
        const {error, value} = Joi.validate(user, schema)
        if (error) {
            res.status(422).send('Enter valid password');
        } else {
            next();
        }
    }
    
}    