const db = require("../../db");

module.exports ={
    get_networks: function(){
        let sql = `SELECT 
        id, name, display_name, deleted
        FROM networks`;
        return db.queryAsync(sql);
    },
    update_network: function(col, value, condition){
        let sql = `UPDATE networks
        SET ${col} = '${value}'
        WHERE id = '${condition}'`;
        return db.queryAsync(sql);
    },
    create_network: function(id, name, display_name){
        let sql =`INSERT INTO networks
        (id, name, display_name)
        VALUES ('${id}', '${name}', '${display_name}')`;
        return db.queryAsync(sql);
    },
    update_networks_all_parameters: function(data, id){
        let sql = `UPDATE networks
        SET name = '${data.network_name}', display_name= '${data.display_name}'
        WHERE id = '${id}'`;
        return db.queryAsync(sql);
    }
}