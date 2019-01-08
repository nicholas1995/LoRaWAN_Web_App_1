const Joi = require('joi');
const error_logger = require('../controllers/error_logs');

module.exports = {
    create (req, res, next){
        let data = req.body.network;
        const schema = { 
            network_name: Joi.string().required().max(80).regex(
                new RegExp(/^[a-zA-Z0-9\-\_]*$/)),
            network_display_name: Joi.string().required().max(80), 
            network_can_have_gateways: Joi.boolean().insensitive(true) };
        const {error, value} = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'network_name':
                    console.log('error in network form: network_name')
                    error_logger.error_logger(req, error)
                    res.status(422).send({error:'Invalid Network Name', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_display_name':
                    console.log('error in network form: display name')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Network Display Name', message: 'Error in form.', type: 'error'});
                    break;
                case 'network_can_have_gateways':
                    console.log('error in network form: can_have_gateways')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Value for Can Have Gateways', message: 'Error in form.', type: 'error'});
                    break;
                default: 
                console.log('error in network form')
                    console.log(error.message)
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    }, 
    update_user (req, res, next){
        
    }
    
}