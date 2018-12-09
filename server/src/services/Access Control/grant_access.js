const verify_access = require('./access_control_function');
const VError = require("verror");

module.exports = function(req, res, next){
    let path = req.route.path;
    if(path.lastIndexOf('/') != 0){ //so that it will only happen when there is a second /
        let x = path.indexOf('/',1); //extract the string between then first and second /
        path = path.slice(1,x);
    }else{
        path = path.slice(1); 
    }
    let user_class = req.user.user_class;
    let method = req.route.stack[0].method;
    let access = verify_access.check_permission(user_class, path, method);
    if(access == 'all'){
        req.access = 'all';
        next()
    }else if(access == 'self'){
        req.access = 'self';
        next();
        //res.status(403).send({error:"Do not have access!"}); //HAVE BUG HERE... NEED TO HAVE A SPECIAL next() FOR IF USER HAS ACCESS TO SELF ALONE
    }else{
        let err = new VError(`Forbidden Access : user-${req.user.email} : path-${path} : method-${method}`);
        console.log(err.message);
        res.status(403).send({ error: "Forbidden" });
    }
}