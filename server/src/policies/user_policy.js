const Joi = require('joi');

module.exports = {
    create (req, res, next){
        let data = req.body.user;
        const schema = {
            first_name: Joi.string().required().regex(
                new RegExp('^[a-zA-Z]{2,32}$')
            ),
            last_name: Joi.string().required().regex(
                new RegExp('^[a-zA-Z]{2,32}$')
            ),
            user_country: Joi.string().min(1).max(60),
            user_city: Joi.string().min(1).max(60),
            user_district: Joi.string().min(1).max(60),
            user_street: Joi.string().min(1).max(60),
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
            user_class: Joi.string(),
            vessels: Joi.array().items().allow('')
        }
        const {error, value} = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'first_name':
                    console.log("service_profile_name");
                    res.status(422).send({error:'Invalid First Name'});
                    break;
                case 'last_name':
                    console.log("last_name");
                    res.status(422).send({error:'Invalid Last Name'});
                    break;
                case 'user_country':
                    console.log("user_country");
                    res.status(422).send({error:'Invalid Country'});
                    break;
                case 'user_city':
                    console.log("user_city");
                    res.status(422).send({error:'Invalid City'});
                    break;
                case 'user_district':
                    console.log("user_district");
                    res.status(422).send({error:'Invalid Disctrict'});
                    break;
                case 'user_street':
                    console.log("user_street");
                    res.status(422).send({error:'Invalid Street'});
                    break;
                case 'home_phone':
                    console.log("home_phone");
                    res.status(422).send({error:'Invalid Home Phone Number'});
                    break;
                case 'mobile_phone':
                    console.log("mobile_phone");
                    res.status(422).send({error:'Invalid Mobile Phone Number'});
                    break;
                case 'email':
                    console.log("email");
                    res.status(422).send({error:'Invalid email'});
                    break;
                case 'password':
                    console.log("password");
                    res.status(422).send({error:'Invalid password'});
                    break;
                case 'user_class':
                    console.log("user_class");
                    res.status(422).send({error:'Invalid user class'});
                    break;
                case 'vessels':
                    console.log("vessels");
                    res.status(422).send({error:'Invalid vessel'});
                    break;
                default:
                console.log(error)
                    res.status(422).send({error:'Invalid Information'});
            }
        } else {
            next();
        }
    },
    update (req, res, next){
        let data = req.body.user;
        const schema = {
            first_name: Joi.string().required().regex(
                new RegExp('^[a-zA-Z]{2,32}$')
            ),
            last_name: Joi.string().required().regex(
                new RegExp('^[a-zA-Z]{2,32}$')
            ),
            user_country: Joi.string().min(1).max(60),
            user_city: Joi.string().min(1).max(60),
            user_district: Joi.string().min(1).max(60),
            user_street: Joi.string().min(1).max(60),
            home_phone: Joi.string().regex(
                new RegExp('^[0-9]{10,10}$')
            ),
            mobile_phone: Joi.string().regex(
                new RegExp('^[0-9]{10,10}$')
            ),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9\@\_\%\&]{8,32}$')
            ),
            user_class: Joi.string(),
            vessels: Joi.object()
        }
        const {error, value} = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'first_name':
                    console.log("service_profile_name");
                    res.status(422).send({error:'Invalid First Name'});
                    break;
                case 'last_name':
                    console.log("last_name");
                    res.status(422).send({error:'Invalid Last Name'});
                    break;
                case 'user_country':
                    console.log("user_country");
                    res.status(422).send({error:'Invalid Country'});
                    break;
                case 'user_city':
                    console.log("user_city");
                    res.status(422).send({error:'Invalid City'});
                    break;
                case 'user_district':
                    console.log("user_district");
                    res.status(422).send({error:'Invalid Disctrict'});
                    break;
                case 'user_street':
                    console.log("user_street");
                    res.status(422).send({error:'Invalid Street'});
                    break;
                case 'home_phone':
                    console.log("home_phone");
                    res.status(422).send({error:'Invalid Home Phone Number'});
                    break;
                case 'mobile_phone':
                    console.log("mobile_phone");
                    res.status(422).send({error:'Invalid Mobile Phone Number'});
                    break;
                case 'password':
                    console.log("password");
                    res.status(422).send({error:'Invalid password'});
                    break;
                case 'user_class':
                    console.log("user_class");
                    res.status(422).send({error:'Invalid user class'});
                    break;
                case 'vessels':
                    console.log("vessels");
                    res.status(422).send({error:'Invalid vessel'});
                    break;
                default:
                console.log(error)
                    res.status(422).send({error:'Invalid Information'});
            }
        } else {
            next();
        }
    }
    
}