const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('./configeration/config'); 

try{
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.authentication.jwtSecret
    }, function(jwt_payload, done)
        { 
        return done(null, jwt_payload);
        }
    ));    
}catch(err){
    console.log(err);
    return done(err, false);
}