const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('./configeration/config'); 

const db = require('./services/database/users_db');
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
}, function(jwt_payload, done) {
    console.log(jwt_payload);
    db.get_single_user(jwt_payload.email).then(result => {
        if(result == ""){
            console.log('Not User');
            //this means that user is not in the database
            return done(err, false, {message: 'No user'})
        }
        else{
            console.log('User');
            return done(null, result)
        }
    }).catch(err => { 
        return done(err, false)
    }) 
}));