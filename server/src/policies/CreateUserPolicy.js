const Joi = require('joi');

module.exports = {
    register (req, res, next){
        console.log(req.body.user_class)
        const schema = {
            first_name: Joi.string().required().regex(
                new RegExp('^[a-zA-Z]{2,32}$')
            ),
            last_name: Joi.string().required().regex(
                new RegExp('^[a-zA-Z]{2,32}$')
            ),
            address: Joi.string().min(1).max(60),
            home_phone: Joi.string().regex(
                new RegExp('^[0-9]{10,10}$')
            ),
            mobile_phone: Joi.string().regex(
                new RegExp('^[0-9]{10,10}$')
            ),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9\@\_\%\&]{8,32}$')
            ),
            user_class: Joi.string()
        }
        const {error, value} = Joi.validate(req.body, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'first_name':
                    res.status(422).send({error:'Invalid First Name'});
                    break;
                case 'last_name':
                    res.status(422).send({error:'Invalid Last Name'});
                    break;
                case 'address':
                    res.status(422).send({error:'Invalid Address'});
                    break;
                case 'home_phone':
                    res.status(422).send({error:'Invalid Home Phone Number'});
                    break;
                case 'mobile_phone':
                    res.status(422).send({error:'Invalid Mobile Phone Number'});
                    break;
                case 'email':
                    res.status(422).send({error:'Invalid email'});
                    break;
                case 'password':
                    res.status(422).send({error:'Invalid password'});
                    break;
                case 'user_class':
                    res.status(422).send({error:'Invalid user class'});
                    break;
                default:
                    res.status(422).send({error:'Invalid Information'});
            }
        } else {
            next();
        }
    },
    update_user (req, res, next){
        const schema = {
            first_name: Joi.string().required().regex(
                new RegExp('^[a-zA-Z]{2,32}$')
            ),
            last_name: Joi.string().required().regex(
                new RegExp('^[a-zA-Z]{2,32}$')
            ),
            address: Joi.string().min(1).max(40),
            home_phone: Joi.string().regex(
                new RegExp('^[0-9]{10,10}$')
            ),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            mobile_phone: Joi.string().regex(
                new RegExp('^[0-9]{10,10}$')
            )
        }
        const {error, value} = Joi.validate(req.body, schema) 
        if (error) {
            switch (error.details[0].context.key) {
                case 'first_name':
                    res.status(422).send({error:'Invalid First Name'});
                    break;
                case 'last_name':
                    res.status(422).send({error:'Invalid Last Name'});
                    break;
                case 'address':
                    res.status(422).send({error:'Invalid Address'});
                    break;
                case 'home_phone':
                    res.status(422).send({error:'Invalid Home Phone Number'});
                    break;
                case 'mobile_phone':
                    res.status(422).send({error:'Invalid Mobile Phone Number'});
                    break;
                case 'email':
                    res.status(422).send({error:'Invalid email'});
                    break;
                default:
                    res.status(422).send({error:'Invalid Information'});
            }
        } else {
            next();
        }
    }
    
}