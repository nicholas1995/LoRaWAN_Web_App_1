const Joi = require('joi');

module.exports = {
    create(req, res, next) {
        let data = JSON.parse(req.body.data);
        const schema = {
            gateway_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            gateway_id: Joi.string().hex().required().length(16),
            description: Joi.string().required().max(200),
            network_id: Joi.number().integer().required(),
            network_server_id: Joi.number().integer().required(),
            gateway_profile_id: Joi.string().required(),
            gateway_accuracy: Joi.number().required(),
            gateway_altitude: Joi.number().required(),
            gateway_latitude: Joi.number().required(),
            gateway_longitude: Joi.number().required(),
            gateway_location_source: Joi.required(),
            discovery_enabled: Joi.boolean().required(),
            fine_time_stamp_key: Joi.string().hex().length(32).allow(''),
            fpga_id: Joi.string().length(16).hex().allow(''),
        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'gateway_name':
                    console.log("gateway_name");
                    res.status(422).send({ error: 'Invalid gateway name.' });
                    break;
                case 'gateway_id':
                    console.log('gateway_id')
                    res.status(422).send({ error: 'Invalid gateway ID' });
                    break;
                case 'description':
                    console.log('description')
                    res.status(422).send({ error: 'Invalid gateway description.' });
                    break;
                case 'network_id':
                    console.log("network_id");
                    res.status(422).send({ error: 'Invalid network ID.' });
                    break;
                case 'network_server_id':
                    console.log("network_server_id");
                    res.status(422).send({ error: 'Invalid network server ID.' });
                    break;
                case 'gateway_profile_id':
                    console.log("gateway_profile_id");
                    res.status(422).send({ error: 'Invalid gateway profile ID.' });
                    break;
                case 'gateway_accuracy':
                    console.log("gateway_accuracy");
                    res.status(422).send({ error: 'Invalid value gateway location accuracy.' });
                    break;
                case 'gateway_altitude':
                    console.log("gateway_altitude");
                    res.status(422).send({ error: 'Invalid value for gateway location altitude.' });
                    break;
                case 'gateway_latitude':
                    console.log("gateway_latitude");
                    res.status(422).send({ error: 'Invalid value for gateway location latitude.' });
                    break;
                case 'gateway_longitude':
                    console.log("gateway_longitude");
                    res.status(422).send({ error: 'Invalid value for gateway location longitude.' });
                    break;
                case 'gateway_location_source':
                    console.log("gateway_location_source");
                    res.status(422).send({ error: 'Invalid value for gateway location source.' });
                    break;
                case 'discovery_enabled':
                    console.log("discovery_enabled");
                    res.status(422).send({ error: 'Invalid value for gateway discovery enabled.' });
                    break;
                case 'fine_time_stamp_key':
                    console.log("fine_time_stamp_key");
                    res.status(422).send({ error: 'Invalid value for fine timestamp key.' });
                    break;
                case 'fpga_id':
                    console.log("fpga_id");
                    res.status(422).send({ error: 'Invalid value for fpga ID.' });
                    break;
                default:
                    res.status(422).send({ error: 'Invalid Information.' });
            }
        } else {
            next();
        }
    }
}