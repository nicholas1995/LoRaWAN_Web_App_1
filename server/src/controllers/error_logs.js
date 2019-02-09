const DB_ERROR_LOG = require('../services/database/error_log_db');
const VError = require("verror");

function create_action(req){
    let error_path = req.route.path; //remove the /api from the route to get the entity part of the route eg vessel 
    error_path = error_path.slice(4); //remove the api from infront of the route '/api
    if (error_path.lastIndexOf("/") != 0) {
        //so that it will only happen when there is a second /
        let x = error_path.indexOf("/", 1); //extract the string between then first and second /
        error_path = error_path.slice(1, x);
    } else {
        error_path = error_path.slice(1);
    }
    return (req.route.stack[0].method + " " + error_path);
}

/*     error_message: function(current_error_message, previous_error, error_name){
        let error = '';
        if(previous_error == null){
            if(error_name != null){
                error = new VError({'name': error_name},"%s", current_error_message);
            }
            else  error = new VError("%s", current_error_message);
        }else{
            if(error_name != null){
                error = new VError({'name': error_name},"%s", current_error_message);
            }
            else error = new VError("%s : %s", current_error_message, previous_error);
        }
/*         if(error_name != null){
            error.name = error_name
        //console.log(error_name)

        } 
        return error;
    }, */
module.exports = {
    lora_app_server_api_error_creater: function(err){
        let error = new VError({
            name: '',
            info: {
                status: err.response.status,
                status_text: err.response.statusText,
                path : err.response.request.path,
                method: err.response.request.method
            }
        }, "%s", err.response.data.error)
        return error;
    },
    error_message: function(current_error, previous_error){
        let error = '';
        if(typeof current_error.response !== 'undefined'){//an error returned from the lora app server
            if(previous_error == null){//this is the lowest level error
                error = new VError({
                    'name': current_error.errno,
                    'info': {
                        'status': current_error.response.status,
                        'status_text': current_error.response.statusText,
                        'path' : current_error.response.request.path,
                        'method': current_error.response.request.method
                    }
                }, '"%s" {Path: "%s", Method: "%s", Status: "%s"}', current_error.response.data.error, current_error.response.request.path, current_error.response.request.method, current_error.response.status)
            }else{//Not the lowest error
                error = new VError({
                    'name': current_error.response.statusText,
                    'cause': previous_error,
                    'info': {
                        'status': current_error.response.status,
                        'status_text': current_error.response.statusText,
                        'path' : current_error.response.request.path,
                        'method': current_error.response.request.method
                    }
                }, "%s", current_error)
            }
        }else{//Not an error returned from the lora app server
            if(previous_error == null){
                //current error will be an object in this case
                error = new VError({
                    'name' : current_error.errno,
                },"%s", current_error.message);
            }else{
                //Current error will be a string in this case
                error = new VError({
                    'cause' : previous_error
                },"%s", current_error);
            }
        }
        return error;
    },
    error_logger: async function (req, err) {
        try { 
            if(err.message.search("character")){//THis is done because the lora app server somethimes returns error messages with invalid charactes hence we need to remove them
                //Example --- character '\b'... we need to remove '\b'
                let string_positon_message = err.message.search("character") + 9;
                err.message = err.message.substr(0, string_positon_message) + err.message.substr(string_positon_message+5)
                let string_positon_stack = err.stack.search("character") + 9;

                err.stack = err.stack.substr(0, string_positon_stack) + err.stack.substr(string_positon_stack+5)

            }
            let user_id = req.user.id;
            let error_user_class = req.user.user_class;
            let error_path = req.route.path;
            let error_user_action = create_action(req);
            let error_method = req.route.stack[0].method;
            let error_name= err.name;
            let error_message = err.message;
            let error_user_ip_address = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                (req.connection.socket ? req.connection.socket.remoteAddress : null);
            let error_user_device = req.headers["user-agent"];
            let error_stack = err.stack;
            DB_ERROR_LOG.create_log(user_id, error_user_class, error_user_action, error_user_device, error_user_ip_address, error_name, error_message, error_stack).catch(
              err => {
                throw err;
              }
            );
        } catch (err) {
            console.log(err);
        }
    },
    get: async function(req, res){
        try{
            let error_logs = await DB_ERROR_LOG.get_logs()
                .catch(err => {
                    //Error getting error logs
                    throw err; 
                })
            error_logs = JSON.stringify(error_logs);
            res.status(200).send({ error_logs: error_logs, message: 'Error Logs Fetched.', type: 'success' });
        }catch(err){
            console.log(err)
        }
    }
}
