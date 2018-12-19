const Joi = require('joi');

module.exports = {
    create(req, res, next) {
        let data = JSON.parse(req.body.data);
        if(data.reference_altitude =="")data.reference_altitude = 1; //this is just to allow it to validate if the reference is left out 
        const schema = {
            device_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            device_eui: Joi.string().hex().required().max(16).min(16),
            device_description: Joi.string().required().max(200),
            sub_network_id: Joi.string().required(),
            vessel_id: Joi.number().required().allow(''),
            device_profile_id: Joi.string().required(),
            reference_altitude: Joi.number().greater(-1).allow(''),
            skip_frame_counter: Joi.boolean().required()
        } 
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'device_name':
                    console.log("error in device form : name");
                    res.status(422).send({ error: 'Invalid device name.', message: 'Error in form.', type: 'error'});
                    break;
                case 'device_eui':
                    console.log("error in device form : eui");
                    res.status(422).send({ error: 'Invalid device EUI.', message: 'Error in form.', type: 'error'});
                    break;
                case 'device_description':
                    console.log("error in device form : description");
                    res.status(422).send({ error: 'Invalid device description.', message: 'Error in form.', type: 'error' });
                    break;
                case 'sub_network_id':
                    console.log("error in device form : sub_network_id");
                    res.status(422).send({ error: 'Invalid sub-network ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'vessel_id':
                    console.log("error in device form : vessel id");
                    res.status(422).send({ error: 'Invalid vessel ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'device_profile_id':
                    console.log("error in device form : device_profile_id");
                    res.status(422).send({ error: 'Invalid device profile ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'reference_altitude':
                    console.log("error in device form : reference_altitude");
                    res.status(422).send({ error: 'Invalid reference altitude.', message: 'Error in form.', type: 'error'});
                    break;
                case 'skip_frame_counter':
                    console.log("error in device form : skip_frame_counter");
                    res.status(422).send({ error: 'Invalid value for skip frame counter.', message: 'Error in form.', type: 'error'});
                    break;
                default:
                    res.status(422).send({ error: 'Invalid Information.', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    },
    update(req, res, next) {
        let data = JSON.parse(req.body.data);
        const schema = {
            device_id: Joi.number(),
            device_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            device_eui: Joi.string().hex().required().max(16).min(16),
            device_description: Joi.string().required().max(200),
            sub_network_id: Joi.string().required(),
            vessel_id: Joi.number().allow(''),
            device_profile_id: Joi.string().required(),
            reference_altitude: Joi.number().greater(-1),
            skip_frame_counter: Joi.boolean().required()
        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'device_id':
                    console.log("error in device form : device_id");
                    res.status(422).send({ error: 'Invalid device id.', message: 'Error in form.', type: 'error'});
                    break;
                case 'device_name':
                    console.log("error in device form : device_name");
                    res.status(422).send({ error: 'Invalid device name.', message: 'Error in form.', type: 'error'});
                    break;
                case 'device_eui':
                    console.log("error in device form : device_eui");
                    res.status(422).send({ error: 'Invalid device EUI.', message: 'Error in form.', type: 'error'});
                    break;
                case 'device_description':
                    console.log("error in device form : description");
                    res.status(422).send({ error: 'Invalid device description.', message: 'Error in form.', type: 'error'});
                    break;
                case 'sub_network_id':
                    console.log("error in device form : sub_network_id");
                    res.status(422).send({ error: 'Invalid sub-network ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'vessel_id':
                    console.log("error in device form : vessel_id");
                    res.status(422).send({ error: 'Invalid vessel ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'device_profile_id':
                    console.log("error in device form : device_profile_id");
                    res.status(422).send({ error: 'Invalid device profile ID.', message: 'Error in form.', type: 'error'});
                    break;
                case 'reference_altitude':
                    console.log("error in device form : reference_altitude");
                    res.status(422).send({ error: 'Invalid reference altitude.', message: 'Error in form.', type: 'error'});
                    break;
                case 'skip_frame_counter':
                    console.log("error in device form : skip_frame_counter");
                    res.status(422).send({ error: 'Invalid value for skip frame counter.', message: 'Error in form.', type: 'error'});
                    break;
                default:
                    res.status(422).send({ error: 'Invalid Information.', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    }
}