const Joi = require('joi');

module.exports = {
    create (req, res, next){
        let data = JSON.parse(req.body.data);
        const schema = { 
            name: Joi.string().required().max(80),
            sub_network_id: Joi.string().required()
        };
        const {error, value} = Joi.validate(data, schema)
        if (error) {
            switch (error.details[0].context.key) {
                case 'name':
                    console.log('error in vessel form : name')
                    res.status(422).send({error:'Invalid Vessel Name'});
                    break;
                case 'sub_network_id':
                    console.log('error in vessel form : sub-network id')
                    res.status(422).send({error:'Invalid Sub-Network ID'});
                    break;
                default: 
                console.log('error in vessel form')
                    res.status(422).send({error:'Invalid Information'});
            }
        } else {
            next();
        }
    }, 
    update (req, res, next){
        
    }
    
}