const Joi = require('joi');

module.exports = {
    create (req, res, next){
        let data = JSON.parse(req.body.data);
        const schema = { 
            network_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            display_name: Joi.string().required().max(60), 
            can_have_gateways: Joi.boolean().insensitive(true) };
        const {error, value} = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'network_name':
                console.log('network_name')
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