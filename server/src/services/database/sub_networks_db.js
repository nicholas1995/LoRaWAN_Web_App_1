const db = require("../../db");

module.exports = {
    get_sub_networks: function () {
        let sql = `SELECT *
        FROM sub_network`;
        return db.queryAsync(sql);
    },
    //This returns all the subnetworks under the specified network or networks 
    get_sub_networks_specified_network: function (networks) {
        let sql = `SELECT *
        FROM sub_network
        WHERE network_id IN (${networks})`;
        return db.queryAsync(sql);
    },
    update: function (col, value, condition) {
        let sql = `UPDATE sub_network
        SET ${col} = '${value}'
        WHERE sub_network_id = '${condition}'`;
        return db.queryAsync(sql);
    },
    update_sub_networks_all_parameters: function (data, id) {
        let sql = `UPDATE sub_network
        SET sub_network_name = '${data.sub_network_name}', sub_network_description= '${data.sub_network_description}'
        WHERE sub_network_id = '${id}'`;
        return db.queryAsync(sql);
    },
    create_sub_network: function (sub_network_id, network_id, service_profile_id, sub_network_name, sub_network_description) {
        let sql = `INSERT INTO sub_network
        (sub_network_id, network_id, service_profile_id, sub_network_name, sub_network_description)
        VALUES ('${sub_network_id}', '${network_id}', '${service_profile_id}', '${sub_network_name}', '${sub_network_description}')`;
        return db.queryAsync(sql);
    }
}