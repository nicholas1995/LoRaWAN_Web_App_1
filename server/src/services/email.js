const nodemailer = require('nodemailer');
const config = require('../configeration/config');

module.exports = {
    transporter: nodemailer.createTransport({
        service: config.email.service,
        auth: {
            user: config.email.auth.user,
            pass: config.email.auth.pass
        }
    }),
    mailOptions: function(user, password) {
        return {
            from: 'lorawanconsole@gmail.com',
            to: user.email,
            subject: 'Login Credentials LoRaWAN Console',
            html: `<h1>Good Day ${user.first_name}</h1> 
            <p>Your credentials were added to the LoRaWAN system.</p>
            <p>Please login using your email and the following password</p>
            <h2>Password: ${password}</h2>
            <p>Link: http://localhost:8081/#/login</p>`
        }
    }
}
