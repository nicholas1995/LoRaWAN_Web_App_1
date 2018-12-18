const DB_ERROR_LOG = require('../services/database/error_log_db');


module.exports = {
    error_logger: async function (req, err) {
        try {
            let user_id = req.user.id;
            let user_class = req.user.user_class;
            let time_stamp = Date();
            let path = req.route.path;
            let method = req.route.stack[0].method;
            let err_name= err.name;
            let err_message = err.message;
            let user_device = req.headers["user-agent"];
            let stack = err.stack;
            DB_ERROR_LOG.create_log(user_id, user_class, time_stamp, path,
                method, err_name, err_message, user_device, stack)
                .catch(err => {
                    throw err;
                })

            console.log(user_id);
            console.log(user_class);
            console.log(time_stamp);
            console.log(path);
            console.log(method);
            console.log(err_name);
            console.log(err_message);
            console.log(user_device);
            console.log(stack);
        } catch (err) {
            console.log(err);
        }
    }
}
