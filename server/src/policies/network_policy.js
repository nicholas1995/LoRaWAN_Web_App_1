const Joi = require('joi');

module.exports = {
    create (req, res, next){
        let data = JSON.parse(req.body.data);
        const schema = { 
            network_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            network_display_name: Joi.string().required().max(80), 
            network_can_have_gateways: Joi.boolean().insensitive(true) };
        const {error, value} = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'network_name':
                console.log('network_name')
                    res.status(422).send({error:'Invalid Network Name', message: 'Failed to create network.', type: 'error'});
                    break;
                case 'network_display_name':
                console.log('display name')
                    res.status(422).send({ error: 'Invalid Network Display Name', message: 'Failed to create network.', type: 'error'});
                    break;
                case 'network_can_have_gateways':
                console.log('can_have_gateways')
                    res.status(422).send({ error: 'Invalid Value for Can Have Gateways', message: 'Failed to create network.', type: 'error'});
                    break;
                default: 
                console.log('dfgsdfg')
                    res.status(422).send({ error: 'Invalid Information', message: 'Failed to create network.', type: 'error'});
            }
        } else {
            next();
        }
    }, 
    update_user (req, res, next){
        
    }
    
}