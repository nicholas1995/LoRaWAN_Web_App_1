const passport = require('passport');

module.exports = function(req,res, next){
    try{
        passport.authenticate('jwt', function(err, user, info) {
            if(err){
                console.log("Error 1")
                throw err;
            }
            if(user){
                req.user = user;
                next();
            }
            else{
                console.log("Token Expired");
                throw err;
            }
        })(req,res,next) 
    }catch(err){
        //Error with token.... either expired or sum else.
        let err = new VError(`Unauthorized Access`);
        console.log(err.message);
        res.status(401).send({
            error: 'Do not have access!'});
    }
} 