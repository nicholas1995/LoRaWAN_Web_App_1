const Joi = require('joi');
const error_logger = require("../controllers/error_logs");

module.exports = {
    create (req, res, next){
        let data = req.body.gateway_profile;
        const schema = {
            gateway_profile_name: Joi.string().required().max(80),
            gateway_profile_channels: Joi.required(),
            network_server_id_lora: Joi.number().required(),
            gateway_profile_modulation: Joi.string().required(),
            gateway_profile_bandwidth: Joi.number().required(),
            gateway_profile_frequency: Joi.number().max(2147483647).required(),
            gateway_profile_spreading_factors: Joi.required(),
            gateway_profile_bit_rate: Joi.number().max(2147483647).required(),

        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'gateway_profile_name':
                    console.log("gateway_profile_name");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Gateway Profile Name', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_profile_channels':
                    console.log('gateway_profile_channels')
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Gateway Profile Channels', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_server_id_lora':
                    console.log("network_server_id_lora");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Network Server ID', message: 'Error in form.', type: 'error' });
                    break;
                case 'gateway_profile_modulation':
                    console.log("gateway_profile_modulation");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Gateway Profile Modulation Scheme', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_profile_bandwidth':
                    console.log("gateway_profile_bandwidth");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Report Channel Bandwidth', message: 'Error in form.', type: 'error' });
                    break; 
                case 'gateway_profile_frequency':
                    console.log("gateway_profile_frequency");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Report Channel Frequency', message: 'Error in form.', type: 'error' });
                    break;
                case 'gateway_profile_spreading_factors':
                    console.log("gateway_profile_spreading_factors");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Channel Spreading Factor', message: 'Error in form.', type: 'error' });
                    break;
                case 'gateway_profile_bit_rate':
                    console.log("gateway_profile_bit_rate");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Gateway Profile Bit Rate', message: 'Error in form.', type: 'error' });
                    break;
                default:
                    console.log('Error in gateway profile form')
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    },
    update(req, res, next) {
        let data = req.body.gateway_profile;
        const schema = {
            gateway_profile_name: Joi.string().required().max(80),
            gateway_profile_channels: Joi.required(),
            network_server_id_lora: Joi.number().required(),
            gateway_profile_modulation: Joi.string().required(),
            gateway_profile_bandwidth: Joi.number().required(),
            gateway_profile_frequency: Joi.number().max(2147483647).required(),
            gateway_profile_spreading_factors: Joi.required(),
            gateway_profile_bit_rate: Joi.number().max(2147483647).required(),
        }
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'gateway_profile_name':
                    console.log("gateway_profile_name");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Gateway Profile Name', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_profile_channels':
                    console.log('gateway_profile_channels')
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Gateway Profile Channels', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_server_id_lora':
                    console.log("network_server_id_lora");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Network Server ID', message: 'Error in form.', type: 'error' });
                    break;
                case 'gateway_profile_modulation':
                    console.log("gateway_profile_modulation");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Gateway Profile Modulation Scheme', message: 'Error in form.', type: 'error'});
                    break;
                case 'gateway_profile_bandwidth':
                    console.log("gateway_profile_bandwidth");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Report Channel Bandwidth', message: 'Error in form.', type: 'error' });
                    break; 
                case 'gateway_profile_frequency':
                    console.log("gateway_profile_frequency");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Report Channel Frequency', message: 'Error in form.', type: 'error' });
                    break;
                case 'gateway_profile_spreading_factors':
                    console.log("gateway_profile_spreading_factors");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Channel Spreading Factor', message: 'Error in form.', type: 'error' });
                    break;
                case 'gateway_profile_bit_rate':
                    console.log("gateway_profile_bit_rate");
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Gateway Profile Bit Rate', message: 'Error in form.', type: 'error' });
                    break;
                default:
                    console.log('Error in gateway profile form')
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    }      
}