const Joi = require('joi');
const error_logger = require("../controllers/error_logs");

module.exports = {
    create (req, res, next){
        let data = req.body.service_profile;
        const schema = {
            service_profile_name: Joi.string().required().max(80),
            network_id: Joi.number().required(),
            network_server_id: Joi.number().required(),
            add_gw_metadata: Joi.boolean().insensitive(true),
            report_device_status_battery: Joi.boolean().insensitive(true),
            report_device_status_margin: Joi.boolean().insensitive(true),
            network_geo_location: Joi.boolean().insensitive(true),
            device_status_req_frequency: Joi.number().required(),
            dr_min: Joi.number().required(),
            dr_max: Joi.number().required(),
        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'service_profile_name':
                    console.log("service_profile_name");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Service Profile Name', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_id':
                    console.log('network_id')
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Network ID', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_server_id':
                    console.log("network_server_id");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Network Server ID Description', message: 'Error in form.', type: 'error' });
                    break;
                case 'add_gw_metadata':
                    console.log("add_gw_metadata");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Add GW Metadata value', message: 'Error in form.', type: 'error'});
                    break;
                case 'report_device_status_battery':
                    console.log("report_device_status_battery");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Report device status battery value', message: 'Error in form.', type: 'error' });
                    break; 
                case 'report_device_status_margin':
                    console.log("report_device_status_margin");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Report device status margin value', message: 'Error in form.', type: 'error' });
                    break;
                case 'network_geo_location':
                    console.log("network_geo_location");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Network Geolocation value', message: 'Error in form.', type: 'error' });
                    break;
                case 'device_status_req_frequency':
                    console.log("device_status_req_frequency");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Device Status Req Frequency', message: 'Error in form.', type: 'error'});
                    break;
                case 'dr_min':
                    console.log("dr_min");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Minimum DR value', message: 'Error in form.', type: 'error' });
                    break;
                case 'dr_max':
                    console.log("dr_max");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Max DR Frequency', message: 'Error in form.', type: 'error' });
                    break;
                default:
                    console.log('Error in service profile form')
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    },
    update(req, res, next) {
        let data = req.body.service_profile;
        const schema = {
            service_profile_name: Joi.string().required().max(80),
            add_gw_metadata: Joi.boolean().insensitive(true),
            report_device_status_battery: Joi.boolean().insensitive(true),
            report_device_status_margin: Joi.boolean().insensitive(true),
            network_geo_location: Joi.boolean().insensitive(true),
            device_status_req_frequency: Joi.number().required(),
            dr_min: Joi.number().required(),
            dr_max: Joi.number().required(),
        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'service_profile_name':
                    console.log("service_profile_name");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Service Profile Name', message: 'Error in form.', type: 'error' });
                    break;
                case 'add_gw_metadata':
                    console.log("add_gw_metadata");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Add GW Metadata value', message: 'Error in form.', type: 'error' });
                    break;
                case 'report_device_status_battery':
                    console.log("report_device_status_battery");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Report device status battery value', message: 'Error in form.', type: 'error' });
                    break;
                case 'report_device_status_margin':
                    console.log("report_device_status_margin");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Report device status margin value', message: 'Error in form.', type: 'error' });
                    break;
                case 'network_geo_location':
                    console.log("network_geo_location");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Network Geolocation value', message: 'Error in form.', type: 'error' });
                    break;
                case 'device_status_req_frequency':
                    console.log("device_status_req_frequency");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Device Status Req Frequency', message: 'Error in form.', type: 'error' });
                    break;
                case 'dr_min':
                    console.log("dr_min");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Minimum DR value', message: 'Error in form.', type: 'error' });
                    break;
                case 'dr_max':
                    console.log("dr_max");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Max DR Frequency', message: 'Error in form.', type: 'error' });
                    break;
                default:
                    console.log('Error in service profile form')
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error' });
            }
        } else {
            next();
        }
    }      
}