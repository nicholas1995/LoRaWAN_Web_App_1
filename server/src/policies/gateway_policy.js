const Joi = require('joi');

module.exports = {
    create(req, res, next) {
        let data = JSON.parse(req.body.data);
        const schema = {
            gateway_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            gateway_id_lora: Joi.string().hex().required().length(16),
            gateway_description: Joi.string().required().max(200),
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
                    console.log("error in gateway form :gateway_name");
                    res.status(422).send({ error: 'Invalid gateway name.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_id_lora':
                    console.log("error in gateway form :gateway_id");
                    res.status(422).send({ error: 'Invalid gateway ID', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_description':
                    console.log("error in gateway form :gateway_description");
                    res.status(422).send({ error: 'Invalid gateway description.', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_id':
                    console.log("error in gateway form :network_id");
                    res.status(422).send({ error: 'Invalid network ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_server_id':
                    console.log("error in gateway form :network_server_id");
                    res.status(422).send({ error: 'Invalid network server ID.', message: 'Error in form.', type: 'error' });
                    break;
                case 'gateway_profile_id':
                    console.log("error in gateway form :gateway_profile_id");
                    res.status(422).send({ error: 'Invalid gateway profile ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_accuracy':
                    console.log("error in gateway form :gateway_accuracy");
                    res.status(422).send({ error: 'Invalid value gateway location accuracy.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_altitude':
                    console.log("error in gateway form :gateway_altitude");
                    res.status(422).send({ error: 'Invalid value for gateway location altitude.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_latitude':
                    console.log("error in gateway form :gateway_latitude");
                    res.status(422).send({ error: 'Invalid value for gateway location latitude.', message: 'Error in form.', type: 'error' });
                    break;
                case 'gateway_longitude':
                    console.log("error in gateway form :gateway_longitude");
                    res.status(422).send({ error: 'Invalid value for gateway location longitude.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_location_source':
                    console.log("error in gateway form :gateway_location_source");
                    res.status(422).send({ error: 'Invalid value for gateway location source.', message: 'Error in form.', type: 'error'});
                    break;
                case 'discovery_enabled':
                    console.log("error in gateway form :discovery_enabled");
                    res.status(422).send({ error: 'Invalid value for gateway discovery enabled.', message: 'Error in form.', type: 'error'});
                    break;
                case 'fine_time_stamp_key':
                    console.log("error in gateway form :fine_time_stamp_key");
                    res.status(422).send({ error: 'Invalid value for fine timestamp key.', message: 'Error in form.', type: 'error'});
                    break;
                case 'fpga_id':
                    console.log("error in gateway form :fpga_id");
                    res.status(422).send({ error: 'Invalid value for fpga ID.', message: 'Error in form.', type: 'error'});
                    break;
                default:
                    console.log("error in gateway form");
                    res.status(422).send({ error: 'Invalid Information.', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    }, update(req, res, next) {
        console.log('here')
        let data = JSON.parse(req.body.data);
        const schema = {
            gateway_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            gateway_id: Joi.number().integer().required(),
            gateway_id_lora: Joi.string().hex().required().length(16),
            gateway_description: Joi.string().required().max(200),
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
                    console.log("error in gateway form :gateway_name");
                    res.status(422).send({ error: 'Invalid gateway name.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_id':
                    console.log("error in gateway form :gateway_id");
                    res.status(422).send({ error: 'Invalid gateway ID', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_id_lora':
                    console.log("error in gateway form :gateway_id_lora");
                    res.status(422).send({ error: 'Invalid gateway ID', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_description':
                    console.log("error in gateway form :gateway_description");
                    res.status(422).send({ error: 'Invalid gateway description.', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_id':
                    console.log("error in gateway form :network_id");
                    res.status(422).send({ error: 'Invalid network ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_server_id':
                    console.log("error in gateway form :network_server_id");
                    res.status(422).send({ error: 'Invalid network server ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_profile_id':
                    console.log("error in gateway form :gateway_profile_id");
                    res.status(422).send({ error: 'Invalid gateway profile ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_accuracy':
                    console.log("error in gateway form :gateway_accuracy");
                    res.status(422).send({ error: 'Invalid value gateway location accuracy.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_altitude':
                    console.log("error in gateway form :gateway_altitude");
                    res.status(422).send({ error: 'Invalid value for gateway location altitude.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_latitude':
                    console.log("error in gateway form :gateway_latitude");
                    res.status(422).send({ error: 'Invalid value for gateway location latitude.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_longitude':
                    console.log("error in gateway form :gateway_longitude");
                    res.status(422).send({ error: 'Invalid value for gateway location longitude.', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_location_source':
                    console.log("error in gateway form :gateway_location_source");
                    res.status(422).send({ error: 'Invalid value for gateway location source.', message: 'Error in form.', type: 'error'});
                    break;
                case 'discovery_enabled':
                    console.log("error in gateway form :discovery_enabled");
                    res.status(422).send({ error: 'Invalid value for gateway discovery enabled.', message: 'Error in form.', type: 'error'});
                    break;
                case 'fine_time_stamp_key':
                    console.log("error in gateway form :fine_time_stamp_key");
                    res.status(422).send({ error: 'Invalid value for fine timestamp key.', message: 'Error in form.', type: 'error'});
                    break;
                case 'fpga_id':
                    console.log("error in gateway form :fpga_id");
                    res.status(422).send({ error: 'Invalid value for fpga ID.', message: 'Error in form.', type: 'error'});
                    break;
                default:
                    console.log('error in gateway form ')
                    res.status(422).send({ error: 'Invalid Information.', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    }
}