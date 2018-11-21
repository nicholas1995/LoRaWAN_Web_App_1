const db = require("../../db");

module.exports ={
    get_vessels_not_deleted: function(){ //This returns all the vessels that has deleted set to 0 
        let sql = `SELECT *
        FROM vessel
        WHERE deleted = 0`;
        return db.queryAsync(sql);
    },
    create_vessels: function (name, sub_network_id) {
        let sql = `INSERT INTO vessel
        (name, sub_network_id)
        VALUES ('${name}', '${sub_network_id}')`;
        return db.queryAsync(sql);
    },
    update_vessels: function(col, value, condition){
        let sql = `UPDATE vessel
        SET ${col} = '${value}'
        WHERE id = '${condition}'`;
        return db.queryAsync(sql);
    },
    update_vessels_all_parameters: function(data, id){
        let sql = `UPDATE vessels
        SET name = '${data.network_name}', display_name= '${data.display_name}'
        WHERE id = '${id}'`;
        return db.queryAsync(sql);
    }
}