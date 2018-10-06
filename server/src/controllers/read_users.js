const db = require('../services/database/databasetest');

module.exports = {
    read_user: async function(req,res){
        db.get_users().then((result)=>{
            res.status(200).send(result);
        }).catch((error) => {
            res.status(500).send({error:"Problem occured while trying to connect."});
        })
    }
}