const Joi = require('joi');
const error_logger = require("../controllers/error_logs");

module.exports = {
    create (req, res, next){
        let data = req.body.vessel;
        const schema = { 
            vessel_name: Joi.string().required().max(80),
            vessel_unique_vessel_identifier: Joi.string().required().max(80),
            vessel_international_radio_call_sign: Joi.string().required().max(80),
            vessel_type: Joi.string().required().max(20),
            sub_network_id: Joi.string().required()
        };
        const {error, value} = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'vessel_name':
                    console.log('error in vessel form : name')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Vessel Name', message: 'Error in form.', type: 'error'});
                    break;
                case 'vessel_unique_vessel_identifier':
                    console.log("error in vessel form : Unique Vessel Identifier");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Unique Vessel Identifier', message: 'Error in form.', type: 'error'});
                    break;
                case 'vessel_international_radio_call_sign':
                    console.log("error in vessel form : International Radio Call Sign");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid International Radio Call Sign', message: 'Error in form.', type: 'error'});
                    break;
                case 'vessel_type':
                    console.log("error in vessel form : Vessel Type");
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Vessel Type', message: 'Error in form.', type: 'error'});
                    break;
                case 'sub_network_id':
                    console.log('error in vessel form : sub-network id')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Sub-Network ID', message: 'Error in form.', type: 'error'});
                    break; 

                default: 
                console.log('error in vessel form')
                    error_logger.error_logger(req, error)
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    }, 
    update (req, res, next){
        let data = req.body.vessel;
        const schema = {
            vessel_name: Joi.string().required().max(80),
        };
        const { error, value } = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'vessel_name':
                    console.log('error in vessel form : name')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Vessel Name', message: 'Error in form.', type: 'error'});
                    break;
                default:
                    console.log('error in vessel form')
                    error_logger.error_logger(req, error);
                    res.status(422).send({ error: 'Invalid Information', message: 'Error in form.', type: 'error'});
            }
        } else {
            next();
        }
    }
    
}