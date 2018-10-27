const Joi = require('joi');

module.exports = {
    create (req, res, next){
        const schema = {
            name: Joi.string().required().min(2).max(20),
            display_name: Joi.string().required().min(2).max(20),
            can_have_gateways: Joi.boolean().insensitive(true),
        }
        const {error, value} = Joi.validate(req.body, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'name':
                console.log('name')
                    res.status(422).send({error:'Invalid Network Name'});
                    break;
                case 'display_name':
                console.log('display name')
                    res.status(422).send({error:'Invalid Network Display Name'});
                    break;
                case 'can_have_gateways':
                console.log('can_have_gateways')
                    res.status(422).send({error:'Invalid Value for Can Have Gateways'});
                    break;
                default:
                console.log('dfgsdfg')
                    res.status(422).send({error:'Invalid Information'});
            }
        } else {
            next();
        }
    },
    update_user (req, res, next){
        
    }
    
}