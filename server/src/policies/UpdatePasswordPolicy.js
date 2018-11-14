const Joi = require('joi');

module.exports = {
    updateUserPassword (pw,res, next){
        data = {//needs to be an object to get validated
            pw:pw
        }
        const schema = {
            pw: Joi.string().required().regex(
                new RegExp('^[a-zA-Z0-9\@\_\%\&]{8,32}$')
            )
        }
        const { error, value } = Joi.validate(data, schema);
        if (error) {
            console.log('Password')
            res.status(422).send({error:'Enter valid password'});
        } else {
            next();
        }
    }
     
}    