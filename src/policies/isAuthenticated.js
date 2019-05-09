const passport = require('passport');
const VError = require("verror");
const db_user_reset_password_token = require("../services/database/user_reset_password_token_db")
const db_activate_user_account_token = require("../services/database/activate_user_account_token_db")
const user_controller = require("../controllers/user")
const error_logger = require("../controllers/error_logs");

module.exports = {
    authenticate: function(req,res, next){
        try{
            passport.authenticate('jwt', function(err, user, info) {
                if(err){ //Error validating Token.. log error 
                    throw err;
                }
                if(user){ //Valid JWT.. Continue Processing request
                    req.user = user;
                    next();
                }
                else{ //Either invalid token or expired token... throw to log
                    throw info;
                }
            })(req,res,next) 
        }catch(err){
            error_logger.error_logger(req, err)
            res.status(401).send({error: 'Do not have access.'});
        }
    },
    authenticate_reset_password_token: async function(req, res, next){
        try{
            passport.authenticate('jwt', async function(err, user, info) {
                if(err){
                    throw err;
                }
                if(user){ //Valid token (ie not expired).. need to check to see if it was used already.. if used send message to ui... if not proceed
                    req.user = user;
                    let token = req.headers.authorization
                    token = token.slice(7)
                    let result = await db_user_reset_password_token.get_user_reset_password_token(token)
                        .catch(err => {
                            //Error checking to see if token exists
                            throw err;
                        });
                    if(result.length > 0 ){
                        next();
                    }else{
                        res.status(401).send({
                            error: 'This link was already used to reset the account password!'
                        });
                    }
                }
                else{
                    let token = req.headers.authorization
                    token = token.slice(7)
                    let result = await db_user_reset_password_token.get_user_reset_password_token(token)
                        .catch(err => {
                            //Error checking to see if token exists
                            throw err;
                        });
                    if(result.length > 0 ){
                        user_controller.resend_reset_password_request(req, res, token, result[0])
                            .catch(err => { 
                                //error resending the request to update password after it expired
                                throw err;
                            })
                    }else{
                        res.status(401).send({
                            error: 'This link was already used to reset the account password!'
                        });
                    }
                    //throw err;
                }
            })(req,res,next) 
        }catch(err){

            //Error with token.... either expired or sum else.c
            console.log(err)
            res.status(401).send({
                error: 'Link expired! Please check for another email.'
            });
        }
    },
    authenticate_activate_account_token: async function(req, res, next){
        try{
            passport.authenticate('jwt', async function(err, user, info) {
                if(err){
                    throw err;
                }
                if(user){ //Valid token (ie not expired).. need to check to see if it was used already.. if used send message to ui... if not proceed
                    req.user = user;
                    let token = req.headers.authorization
                    token = token.slice(7)
                    let result = await db_activate_user_account_token.get_activate_user_account_token(token)
                        .catch(err => {
                            //Error checking to see if token exists
                            throw err;
                        });
                    if(result.length > 0 ){
                        next();
                    }else{
                        res.status(401).send({
                            error: 'This link was already used to activate the account.'
                        });
                    }
                }
                else{
                    let token = req.headers.authorization
                    token = token.slice(7)
                    let result = await db_activate_user_account_token.get_activate_user_account_token(token)
                        .catch(err => {
                            //Error checking to see if token exists
                            throw err;
                        });
                    if(result.length > 0 ){
                        user_controller.resend_activate_account_request(req, res, token, result[0])
                            .catch(err => { 
                                //error resending the request to activate account email after inital email expired
                                throw err;
                            })
                    }else{
                        res.status(401).send({
                            error: 'This link was already used to activate the account.'
                        });
                    }
                    //throw err;
                }
            })(req,res,next) 
        }catch(err){

            //Error with token.... either expired or sum else.c
            console.log(err)
            res.status(401).send({
                error: 'Link expired! Please check for another email.'
            });
        }
    }
} 