const passport = require('passport');

module.exports = function(req,res, next){
    passport.authenticate('jwt', function(err, user) {
        if(err){
            console.log('IS error')
            res.status(403).send({
                error: 'Do not have access to this resource'
            });
        }else{
            console.log('IS no error')
            req.user = user;
            next();
        }
    })(req,res,next)
}