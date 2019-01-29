const passport = require('passport');
const VError = require("verror");

module.exports = {
    authenticate: function(req,res, next){
        try{
            passport.authenticate('jwt', function(err, user, info) {
                if(err){
                    throw err;
                }
                if(user){
                    req.user = user;
                    next();
                }
                else{
                    throw err;
                }
            })(req,res,next) 
        }catch(err){
            //Error with token.... either expired or sum else.
            let error = new VError(`Unauthorized Access`);
            //console.log(error.message);
            res.status(401).send({
                error: 'Do not have access!'});
        }
    },
    authenticate_reset_password_token: function(req, res, next){
        try{
            passport.authenticate('jwt', function(err, user, info) {
                if(err){
                    throw err;
                }
                if(user){
                    req.user = user;
                    next();
                }
                else{
                    throw err;
                }
            })(req,res,next) 
        }catch(err){
            //Error with token.... either expired or sum else.
            res.status(401).send({
                error: 'Link expired! Please check for another email.'
            });
        }
    }
} 