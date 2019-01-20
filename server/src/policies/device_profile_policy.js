const Joi = require('joi');
const error_logger = require('../controllers/error_logs');

module.exports = {
    create (req, res, next){
        let data = req.body.device_profile;
        const schema = { 
            network_server_id: Joi.number().required(),
            network_id: Joi.number().required(),
            device_profile_name: Joi.string().required().max(80),
            mac_version: Joi.string().required(),
            reg_params_revision: Joi.string().required(),
            max_eirp: Joi.number().min(0).max(2147483647).required(),
            supports_join: Joi.boolean().insensitive(true),
            rx_delay_1: Joi.number().min(0).max(2147483647).required(),
            rx_dr_offset_1: Joi.number().min(0).max(2147483647).required(),
            rx_dr_2: Joi.number().min(0).max(2147483647).required(),
            rx_frequency_2: Joi.number().min(0).max(2147483647).required(),
            factory_preset_frequencies: Joi.required(),
            supports_class_b: Joi.boolean().insensitive(true),
            class_b_timeout: Joi.number().min(0).max(2147483647).required(),
            ping_slot_period: Joi.number().min(0).max(2147483647).required(),
            ping_slot_dr: Joi.number().min(0).max(2147483647).required(),
            ping_slot_frequency: Joi.number().min(0).max(2147483647).required(),
            supports_class_c: Joi.boolean().insensitive(true),
            class_c_timeout: Joi.number().min(0).max(2147483647).required(),
        };
        const {error, value} = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'network_server_id':
                    console.log('error in device profile form: network_server_id')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Network Server', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_id':
                    console.log('error in device profile form: network_id')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Network', message: 'Error in form.', type: 'error'});
                    break;
                case 'device_profile_name':
                    console.log('error in device profile form: device_profile_name')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Device Profile Name', message: 'Error in form.', type: 'error'});
                    break;
                case 'mac_version':
                    console.log('error in device profile form: mac_version')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid MAC Version', message: 'Error in form.', type: 'error'});
                    break;
                case 'reg_params_revision':
                    console.log('error in device profile form: reg_params_revision')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Regional Parameters', message: 'Error in form.', type: 'error'});
                    break;
                case 'max_eirp':
                    console.log('error in device profile form: max_eirp')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Max EIRP', message: 'Error in form.', type: 'error'});
                    break;
                case 'supports_join':
                    console.log('error in device profile form: supports_join')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Value for Supports Join', message: 'Error in form.', type: 'error'});
                    break;
                case 'rx_delay_1':
                    console.log('error in device profile form: rx_delay_1')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Value for RX1 Delay', message: 'Error in form.', type: 'error'});
                    break;
                case 'rx_dr_offset_1':
                    console.log('error in device profile form: rx_dr_offset_1')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid RX1 Data Rate Offset', message: 'Error in form.', type: 'error'});
                    break;
                case 'rx_dr_2':
                    console.log('error in device profile form: rx_dr_2')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Value RX2 Data Rate', message: 'Error in form.', type: 'error'});
                    break;
                case 'rx_frequency_2':
                    console.log('error in device profile form: rx_delay_1')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid RX2 Channel Frequency', message: 'Error in form.', type: 'error'});
                    break;
                case 'factory_preset_frequencies':
                    console.log('error in device profile form: factory_preset_frequencies')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Factory Preset Frequencies', message: 'Error in form.', type: 'error'});
                    break;
                case 'supports_class_b':
                    console.log('error in device profile form: supports_class_b')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid value for Supports Class B', message: 'Error in form.', type: 'error'});
                    break;
                case 'class_b_timeout':
                    console.log('error in device profile form: class_b_timeout')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Value for Class B Timeout', message: 'Error in form.', type: 'error'});
                    break;
                case 'ping_slot_period':
                    console.log('error in device profile form: ping_slot_period')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Value for Ping Slot Period', message: 'Error in form.', type: 'error'});
                    break;
                case 'ping_slot_dr':
                    console.log('error in device profile form: ping_slot_dr')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid value for Ping Slot DR', message: 'Error in form.', type: 'error'});
                    break;
                case 'ping_slot_frequency':
                    console.log('error in device profile form: ping_slot_frequency')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Value for Ping Slot Frequency', message: 'Error in form.', type: 'error'});
                    break;
                case 'supports_class_c':
                    console.log('error in device profile form: supports_class_c')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Value for Support Class C', message: 'Error in form.', type: 'error'});
                    break;
                case 'class_c_timeout':
                    console.log('error in device profile form: class_c_timeout')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid value for Class C Timeout', message: 'Error in form.', type: 'error'});
                    break;
                default: 
                console.log('error in device profile form')
                    console.log(error.message)
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    }, 
    update (req, res, next){
        let data = req.body.device_profile;
        const schema = { 
            network_server_id: Joi.number().required(),
            network_id: Joi.number().required(),
            device_profile_name: Joi.string().required().max(80),
            mac_version: Joi.string().required(),
            reg_params_revision: Joi.string().required(),
            max_eirp: Joi.number().min(0).max(2147483647).required(),
            supports_join: Joi.boolean().insensitive(true),
            rx_delay_1: Joi.number().min(0).max(2147483647).required(),
            rx_dr_offset_1: Joi.number().min(0).max(2147483647).required(),
            rx_dr_2: Joi.number().min(0).max(2147483647).required(),
            rx_frequency_2: Joi.number().min(0).max(2147483647).required(),
            factory_preset_frequencies: Joi.required(),
            supports_class_b: Joi.boolean().insensitive(true),
            class_b_timeout: Joi.number().min(0).max(2147483647).required(),
            ping_slot_period: Joi.number().min(0).max(2147483647).required(),
            ping_slot_dr: Joi.number().min(0).max(2147483647).required(),
            ping_slot_frequency: Joi.number().min(0).max(2147483647).required(),
            supports_class_c: Joi.boolean().insensitive(true),
            class_c_timeout: Joi.number().min(0).max(2147483647).required(),
        };
        const {error, value} = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'network_server_id':
                    console.log('error in device profile form: network_server_id')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Network Server', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_id':
                    console.log('error in device profile form: network_id')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Network', message: 'Error in form.', type: 'error'});
                    break;
                case 'device_profile_name':
                    console.log('error in device profile form: device_profile_name')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Device Profile Name', message: 'Error in form.', type: 'error'});
                    break;
                case 'mac_version':
                    console.log('error in device profile form: mac_version')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid MAC Version', message: 'Error in form.', type: 'error'});
                    break;
                case 'reg_params_revision':
                    console.log('error in device profile form: reg_params_revision')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Regional Parameters', message: 'Error in form.', type: 'error'});
                    break;
                case 'max_eirp':
                    console.log('error in device profile form: max_eirp')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Max EIRP', message: 'Error in form.', type: 'error'});
                    break;
                case 'supports_join':
                    console.log('error in device profile form: supports_join')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Value for Supports Join', message: 'Error in form.', type: 'error'});
                    break;
                case 'rx_delay_1':
                    console.log('error in device profile form: rx_delay_1')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Value for RX1 Delay', message: 'Error in form.', type: 'error'});
                    break;
                case 'rx_dr_offset_1':
                    console.log('error in device profile form: rx_dr_offset_1')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid RX1 Data Rate Offset', message: 'Error in form.', type: 'error'});
                    break;
                case 'rx_dr_2':
                    console.log('error in device profile form: rx_dr_2')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Value RX2 Data Rate', message: 'Error in form.', type: 'error'});
                    break;
                case 'rx_frequency_2':
                    console.log('error in device profile form: rx_delay_1')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid RX2 Channel Frequency', message: 'Error in form.', type: 'error'});
                    break;
                case 'factory_preset_frequencies':
                    console.log('error in device profile form: factory_preset_frequencies')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Factory Preset Frequencies', message: 'Error in form.', type: 'error'});
                    break;
                case 'supports_class_b':
                    console.log('error in device profile form: supports_class_b')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid value for Supports Class B', message: 'Error in form.', type: 'error'});
                    break;
                case 'class_b_timeout':
                    console.log('error in device profile form: class_b_timeout')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Value for Class B Timeout', message: 'Error in form.', type: 'error'});
                    break;
                case 'ping_slot_period':
                    console.log('error in device profile form: ping_slot_period')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Value for Ping Slot Period', message: 'Error in form.', type: 'error'});
                    break;
                case 'ping_slot_dr':
                    console.log('error in device profile form: ping_slot_dr')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid value for Ping Slot DR', message: 'Error in form.', type: 'error'});
                    break;
                case 'ping_slot_frequency':
                    console.log('error in device profile form: ping_slot_frequency')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Value for Ping Slot Frequency', message: 'Error in form.', type: 'error'});
                    break;
                case 'supports_class_c':
                    console.log('error in device profile form: supports_class_c')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Value for Support Class C', message: 'Error in form.', type: 'error'});
                    break;
                case 'class_c_timeout':
                    console.log('error in device profile form: class_c_timeout')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid value for Class C Timeout', message: 'Error in form.', type: 'error'});
                    break;
                default: 
                console.log('error in device profile form')
                    console.log(error.message)
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    }
    
}