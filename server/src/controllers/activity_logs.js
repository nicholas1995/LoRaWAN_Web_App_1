const DB_ACTIVITY_LOG = require("../services/database/activity_log_db");
function get_user_id(req) {
    try{
        if (req != null) {
            return req.user.id;
        }
    }catch(err){

    }
}
function get_user_class(req){
    try{
        if(req != null){
            return req.user.user_class;
        }
    }catch(err){

    }
}
function get_route(req){
    try{
        return req.route.path;
    }catch(err){

    }
}
function get_method(req){
    try{
        return req.route.stack[0].method;
    }catch(err){

    }
}
function get_user_device(req){
    try{
        return req.headers["user-agent"];
    }catch(err){

    }
}

module.exports = {
    activity_log: async function (req, res, next) {
        try{
            let route = get_route(req);
            let user_class = get_user_class(req);
            let user_id = get_user_id(req);
            let method = get_method(req);
            let user_device = get_user_device(req);
            DB_ACTIVITY_LOG.create_log(user_id, user_class, method, user_device, route, 'null')
            next();
        }catch(err){

        }
    }
}
