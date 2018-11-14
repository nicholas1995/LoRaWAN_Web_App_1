const verify_access = require('./access_control_function');
const VError = require("verror");

module.exports = function(req, res, next){
    let path = req.params.route;
    let user_class = req.user.user_class;
    let method = req.params.method;
    let access = verify_access.check_permission(user_class, path, method);
    if(access == 'all'){
        res.status(200).send({message: "Valid Access"});
    }else if(access == 'self'){
        res.status(200).send({ message: "Valid Access" });
    }else{
        //Do not have permission to the resource
        let err = new VError(`Forbidden Access : user-${req.user.email} : path-${path} : method-${method}`);
        console.log(err.message);
        res.status(403).send({error:"Forbidden"});
    }
}