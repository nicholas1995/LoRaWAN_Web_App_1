const jwebt = require('jsonwebtoken');
const config = require('../configeration/config');

function jwebtUserSignin(user){
        return jwebt.sign(user, config.authentication.jwebtSecret, {
            expiresIn: '24h'
        });
    }

module.exports = {jwebtUserSignin};
