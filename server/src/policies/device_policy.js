const Joi = require('joi');

module.exports = {
    create(req, res, next) {
        let data = JSON.parse(req.body.data);
        if(data.reference_altitude =="")data.reference_altitude = 1; //this is just to allow it to validate if the reference is left out 
        const schema = {
            device_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            device_eui: Joi.string().hex().required().max(16).min(16),
            description: Joi.string().required().max(200),
            sub_network_id: Joi.string().required(),
            device_profile_id: Joi.string().required(),
            reference_altitude: Joi.number().greater(0),
            skip_frame_counter: Joi.boolean().required()
        } 
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'device_name':
                    console.log('name')
                    res.status(422).send({ error: 'Invalid device name.' });
                    break;
                case 'device_eui':
                    console.log('eui')
                    res.status(422).send({ error: 'Invalid device EUI.' });
                    break;
                case 'description':
                    console.log('description')
                    res.status(422).send({ error: 'Invalid device description.' });
                    break;
                case 'sub_network_id':
                    console.log('sub_network_id')
                    res.status(422).send({ error: 'Invalid sub-network ID.' });
                    break;
                case 'device_profile_id':
                    console.log('device_profile_id')
                    res.status(422).send({ error: 'Invalid device profile ID.' });
                    break;
                case 'reference_altitude':
                    console.log("reference_altitude");
                    res.status(422).send({ error: 'Invalid reference altitude.' });
                    break;
                case 'skip_frame_counter':
                    console.log("skip_frame_counter");
                    res.status(422).send({ error: 'Invalid value for skip frame counter.' });
                    break;
                default:
                    res.status(422).send({ error: 'Invalid Information.' });
            }
        } else {
            next();
        }
    },
    update(req, res, next) {
        let data = JSON.parse(req.body.data);
        const schema = {
            device_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            device_eui: Joi.string().hex().required().max(16).min(16),
            description: Joi.string().required().max(200),
            sub_network_id: Joi.string().required(),
            device_profile_id: Joi.string().required(),
            skip_frame_counter: Joi.boolean().required()
        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'device_name':
                    console.log("device_name");
                    res.status(422).send({ error: 'Invalid device name.' });
                    break;
                case 'device_eui':
                    console.log("device_eui");
                    res.status(422).send({ error: 'Invalid device EUI.' });
                    break;
                case 'description':
                    console.log("description");
                    res.status(422).send({ error: 'Invalid device description.' });
                    break;
                case 'sub_network_id':
                    console.log("sub_network_id");
                    res.status(422).send({ error: 'Invalid sub-network ID.' });
                    break;
                case 'device_profile_id':
                    console.log("device_profile_id");
                    res.status(422).send({ error: 'Invalid device profile ID.' });
                    break;
                case 'skip_frame_counter':
                    console.log("skip_frame_counter");
                    res.status(422).send({ error: 'Invalid value for skip frame counter.' });
                    break;
                default:
                    res.status(422).send({ error: 'Invalid Information.' });
            }
        } else {
            next();
        }
    }
}