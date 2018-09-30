const Joi = require('joi');

module.exports = {
    register (req, res, next){
        const schema = {
            email: Joi.string().email().required(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9\@\_\%\&]{8,32}$')
            ),
            first_name: Joi.string().regex(
                new RegExp('^[a-zA-Z]{1,32}$')
            ),
            last_name: Joi.string().regex(
                new RegExp('^[a-zA-Z]{1,32}$')
            ),
            address: Joi.string().min(1).max(40),
            home_phone: Joi.number(),
            mobile_phone: Joi.number()

        }
        const {error, value} = Joi.validate(req.body, schema)
        if (error) {
            console.log(req.body.email);
            console.log(req.body.password);

            switch (error.details[0].context.key) {
                case 'email':
                    res.send('You must provide valid email');
                    break;
                case 'password':
                    res.send('Enter valid password');
                    break;
                case 'first_name':
                    res.send('Enter Valied First Name');
                    break;
                case 'last_name': 
                    res.send('Enter valid Last Name');
                    break;
                case 'address':
                    res.send('Enter Valid Address');
                    break;
                case 'home_phone':
                console.log(req.body.home_phone);
                    res.send('Enter valid Home Phone Number');
                    break;
                case 'mobile_phone':
                    res.send('Enter valid Mobile Phone Number');
                    break;
                default:
                res.send('Invalid Information');
            }
        } else {
            next();
        }
    }
}