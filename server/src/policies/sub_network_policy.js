const Joi = require('joi');

module.exports = {
    create (req, res, next){
        let data = JSON.parse(req.body.data);
        const schema = {
            sub_network_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            sub_network_description: Joi.string().required().max(200),
            network_id: Joi.number().required(),
            service_profile_id: Joi.string().required(),
            payload_codec: Joi.string().required().allow(''),
        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'sub_network_name':
                    console.log('sub_network_name')
                    res.status(422).send({ error: 'Invalid Sub-Network Name', message: 'Error in form.', type: 'error'});
                    break;
                case 'sub_network_description':
                console.log('description')
                    res.status(422).send({ error: 'Invalid Sub-Network Description', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_id':
                console.log('network_id')
                    res.status(422).send({ error: 'Invalid Network ID', message: 'Error in form.', type: 'error'});
                    break;
                case 'service_profile_id':
                console.log('service_profile_id')
                    res.status(422).send({ error: 'Invalid Service Profile ID', message: 'Error in form.', type: 'error'});
                    break;
                case 'payload_codec':
                    console.log('payload_codec')
                    res.status(422).send({ error: 'Invalid Payload Codec', message: 'Error in form.', type: 'error'});
                    break;
                default:
                console.log('Error in sub-netork form')
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    },
    update(req, res, next) {
        let data = JSON.parse(req.body.data);
        const schema = {
            sub_network_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            sub_network_description: Joi.string().required().max(200),
            network_id: Joi.number().required(),
            service_profile_id: Joi.string().required(),
            payload_codec: Joi.string().required().allow(''),
        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'sub_network_name':
                    console.log("sub_network_name");
                    res.status(422).send({ error: 'Invalid Sub-Network Name', message: 'Error in form.', type: 'error'});
                    break;
                case 'sub_network_description':
                    console.log('description')
                    res.status(422).send({ error: 'Invalid Sub-Network Description', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_id':
                    console.log('network_id')
                    res.status(422).send({ error: 'Invalid Network ID', message: 'Error in form.', type: 'error'});
                    break;
                case 'service_profile_id':
                    console.log('service_profile_id')
                    res.status(422).send({ error: 'Invalid Service Profile ID', message: 'Error in form.', type: 'error'});
                    break;
                case 'payload_codec':
                    console.log('payload_codec')
                    res.status(422).send({ error: 'Invalid Payload Codec', message: 'Error in form.', type: 'error'});
                    break;
                default:
                    console.log("error in sub-network form")
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    }      
}