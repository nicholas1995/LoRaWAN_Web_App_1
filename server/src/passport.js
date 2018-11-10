const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('./configeration/config'); 

const db = require('./services/database/users_db');
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
}, function(jwt_payload, done)
    { 
        db.get_single_user(jwt_payload.email).then( result => {
            return done(null, result);
        }).catch (err => {
            console.log('Problem occured while trying to connect.')
            console.log(err);
            return done(err, false);
        })
    }
));    