const Joi = require('joi');

module.exports = {
    create (req, res, next){
        let data = JSON.parse(req.body.data);
        const schema = {
            sub_network_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            description: Joi.string().required().max(200),
            network_id: Joi.number().required(),
            service_profile_id: Joi.string().required(),
        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'sub_network_name':
                    console.log('sub_network_name')
                    res.status(422).send({error:'Invalid Sub-Network Name'});
                    break;
                case 'description':
                console.log('description')
                    res.status(422).send({error:'Invalid Sub-Network Description'});
                    break;
                case 'network_id':
                console.log('network_id')
                    res.status(422).send({error:'Invalid Network ID'});
                    break;
                case 'service_profile_id':
                console.log('service_profile_id')
                    res.status(422).send({error:'Invalid Service Profile ID'});
                    break;
                default:
                console.log('dfgsdfg')
                    res.status(422).send({error:'Invalid Information'});
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
            description: Joi.string().required().max(200),
            network_id: Joi.number().required(),
            service_profile_id: Joi.string().required(),
        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'sub_network_name':
                    console.log("sub_network_name");
                    res.status(422).send({ error: 'Invalid Sub-Network Name' });
                    break;
                case 'description':
                    console.log('description')
                    res.status(422).send({ error: 'Invalid Sub-Network Description' });
                    break;
                case 'network_id':
                    console.log('network_id')
                    res.status(422).send({ error: 'Invalid Network ID' });
                    break;
                case 'service_profile_id':
                    console.log('service_profile_id')
                    res.status(422).send({ error: 'Invalid Service Profile ID' });
                    break;
                default:
                    console.log("error")
                    res.status(422).send({ error: 'Invalid Information' });
            }
        } else {
            next();
        }
    }      
}