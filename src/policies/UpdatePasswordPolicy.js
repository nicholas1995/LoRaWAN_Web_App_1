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
    },
    password_policy(req, res, next) {
        let data = JSON.parse(req.body.data);
        const schema = {
            current_password: Joi.string().required().regex(
                new RegExp('^[a-zA-Z0-9\@\_\%\&]{8,32}$')
            ),
            new_password: Joi.string().required().regex(
                new RegExp('^[a-zA-Z0-9\@\_\%\&]{8,32}$')
            )
        }
        const { error, value } = Joi.validate(data, schema);
        if (error) {
            switch (error.details[0].context.key) {
                case 'current_password':
                    console.log('New Password')
                    res.status(422).send({ error: 'Invalid password.' });
                    break;
                case 'new_password':
                    console.log('New Password')
                    res.status(422).send({ error: 'Invalid new password.' });
                    break;
                default:
                    console.log(error);
                    res.status(422).send({ error: 'Invalid Information.' });
                    break;
            }
        } else {
            next();
        }
    }
     
}    