const db = require("../../db");

module.exports ={
    get_sub_networks: function(){
        let sql = `SELECT 
        id, name, deleted, network_ID
        FROM sub_networks`;
        return db.queryAsync(sql);
    }, 
    //This returns all the subnetworks under the specified network or networks 
    get_sub_networks_specified_network: function (networks) {
        let sql = `SELECT 
        id, name, deleted, network_ID
        FROM sub_networks
        WHERE network_ID IN (${networks})`;
        return db.queryAsync(sql);
    },
    update: function(col, value, condition){
        let sql = `UPDATE sub_networks
        SET ${col} = '${value}'
        WHERE id = '${condition}'`;
        return db.queryAsync(sql);
    } ,
    create_sub_network: function(id, name, network_ID){
        let sql =`INSERT INTO sub_networks
        (id, name, network_ID)
        VALUES ('${id}', '${name}', '${network_ID}')`;
        return db.queryAsync(sql);
    } 
}