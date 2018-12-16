const db = require("../../db");

module.exports ={
    get_networks: function(){
        let sql = `SELECT *
        FROM network`;
        return db.queryAsync(sql);
    },
    get_networks_not_deleted: function () {
        let sql = `SELECT *
        FROM network
        WHERE network_deleted ='0'`;
        return db.queryAsync(sql);
    },
    update_network: function(col, value, condition){
        let sql = `UPDATE network
        SET ${col} = '${value}'
        WHERE network_id = '${condition}'`;
        return db.queryAsync(sql);
    },
    create_network: function (id, name, display_name, can_have_gateways){
        let sql = `INSERT INTO network
        (network_id, network_name, display_name, can_have_gateways)
        VALUES ('${id}', '${name}', '${display_name}', ${can_have_gateways})`;
        return db.queryAsync(sql);
    },
    update_networks_all_parameters: function(data, id){
        let sql = `UPDATE network
        SET network_name = '${data.network_name}', display_name= '${data.display_name}', can_have_gateways= ${data.can_have_gateways}
        WHERE network_id = '${id}'`;
        return db.queryAsync(sql);
    }
}