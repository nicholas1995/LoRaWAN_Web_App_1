const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('./configeration/config'); 

const db = require('./services/database/users_db');
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
}, function(jwt_payload, done) {
        if(jwt_payload.user_class == 'Software_Admin'){
            console.log('Granted Access to ' + jwt_payload.email);
            return done(null, true)
        }else{
            console.log('Blocked Access from ' + jwt_payload.email);
            return done(err, false, { message: 'Do not have permission ' })
        }
    }
));   