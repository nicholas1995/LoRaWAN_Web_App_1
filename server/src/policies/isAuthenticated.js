const passport = require('passport');

module.exports = function(req,res, next){
    passport.authenticate('jwt', function(err, user, info) {
        if(err){
            res.status(403).send({
                error: 'Do not have access to this resource'
            });
        }
        else if(!user){
            res.status(403).send({
                error: 'Do not have access to this resource'
            });
        }else{
            req.user = user;
            next();
        }
    })(req,res,next)
}