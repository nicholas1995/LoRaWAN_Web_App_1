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
    check_permission: function(user_class, ability, method){
        let user = convert_user_class(user_class);
        let access = convert_method(method);
        if(ACL[user].hasOwnProperty(ability)){ //See if the user class of the user has permission to use the ability( eg networks, users)
            if(ACL[user][ability].hasOwnProperty(access)){ //See if the user class of the user has the ability to perform that specified action on the resource (eg read users)
                if(ACL[user][ability][access] == 'All'){ //See if the user class of the user has the ability to perform the action on all or a specific item
                    //console.log('Has Access to All');
                    return 'all';
                }else{
                    //console.log('Has Access to Self');
                    return 'self';
                }
            }else{
                //console.log('Do not have Access!');
                return 'NA'; 
            }
        }else{
            //console.log('Do not have Access!');
            return 'NA';
        }  
    }
} 
 