const DB_ERROR_LOG = require('../services/database/error_log_db');
const VError = require("verror");

function create_action(req){
    let error_path = req.route.path;
    if (error_path.lastIndexOf("/") != 0) {
        //so that it will only happen when there is a second /
        let x = error_path.indexOf("/", 1); //extract the string between then first and second /
        error_path = error_path.slice(1, x);
    } else {
        error_path = error_path.slice(1);
    }
    return (req.route.stack[0].method + " " + error_path);
}

module.exports = {
    error_message: function(current_error_message, previous_error){
        let error = '';
        if(previous_error == null){
            error = new VError("%s", current_error_message);
        }else{
            error = new VError("%s : %s", current_error_message, previous_error);
        }
        return error;
    },
    error_logger: async function (req, err) {
        try {
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
