const jwt = require('jsonwebtoken');
const config = require('../configeration/config');

function jwtUserSignin(user){
        return jwt.sign(user, config.authentication.jwtSecret, {
            expiresIn: '24h'
        });
    }

module.exports = {jwtUserSignin};
