const ACL = require('./ACL');

function convert_user_class(user_class){
    let user = '';
    switch(user_class){
        case 'IoT Network Admin':
            user = 'Iot_Network_Admin';
            break;
        case 'Software Admin':
            user = 'Software_Admin';
            break;
        default:
            user = user_class;
            break;
    }
    return user;
}
function convert_method(method){
    let access = '';
    switch(method){
        case 'get':
            access = 'read';
            break;
        case 'post':
            access = 'create';
            break;
        case 'put':
            access = 'update';
            break;
        case 'delete':
            access = 'delete';
            break;
        default:
            access = 'none';
        break;
    }
    return access;
}

module.exports = {
    grant_access: function(user_class, ability, method){
        let user = convert_user_class(user_class);
        let access = convert_method(method);
        if(ACL[user].hasOwnProperty(ability)){
            if(ACL[user][ability].hasOwnProperty(access)){
                if(ACL[user][ability][access] == 'All'){
                    console.log('Has Access to All');
                }else{
                    console.log('Has Access to Self');
                }
            }else{
                console.log('Do not have Access!');
            }
        }else{
            console.log('Do not have Access!');
        }  
    }
} 
