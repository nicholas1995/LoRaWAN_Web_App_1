const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('./configeration/config'); 

const db = require('./services/database/users_db');
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
}, function(jwt_payload, done) {
    db.get_single_user(jwt_payload.email).then(result => {
        if(result == ""){
            console.log('Not User');
            //this means that user is not in the database
            return done(err, false, { message: 'Incorrect username.' })
        }
        else{
            if(result[0].class == 'IoT_Network_Admin'){
                console.log('Granted Access');
                return done(null, result)
            }else{
                console.log('here')
                return done(err, false, { message: 'Do not have permission ' })
            }
        }
    }).catch(err => { 
        return done(err, false)
    }) 
}));