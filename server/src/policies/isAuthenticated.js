const passport = require('passport');
const VError = require("verror");
const db_user_reset_password_token = require("../services/database/user_reset_password_token_db")
const user_controller = require("../controllers/user")

module.exports = {
    authenticate: function(req,res, next){
        try{
            passport.authenticate('jwt', function(err, user, info) {
                if(err){
                    throw err;
                }
                if(user){
                    req.user = user;
                    next();
                }
                else{
                    throw err;
                }
            })(req,res,next) 
        }catch(err){
            //Error with token.... either expired or sum else.
            let error = new VError(`Unauthorized Access`);
            //console.log(error.message);
            res.status(401).send({
                error: 'Do not have access!'});
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
    }
} 