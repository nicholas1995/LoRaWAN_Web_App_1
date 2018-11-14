const jwt = require('jsonwebtoken');
const config = require('../configeration/config');

function jwtUserSignin(user){
        return jwt.sign(user, config.authentication.jwtSecret, {
            expiresIn: '12h'
        });
    }

module.exports = {jwtUserSignin};
