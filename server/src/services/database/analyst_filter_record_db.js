const db = require("../../db");

module.exports = {
  get_analyst_filter_record: function(user_id) {
    //Selects the records created by a user with id 'user_id'
    let sql = `SELECT *
        FROM analyst_filter_record
        WHERE  user_id = '${user_id}'`;
    return db.queryAsync(sql);
  },
  create_analyst_filter_record: function (analyst_filter_record_name, user_id, analyst_filter_record_header, analyst_filter_record_network, analyst_filter_record_sub_network, analyst_filter_record_vessel, 
    analyst_filter_record_device, analyst_filter_record_start_date, analyst_filter_record_end_date, analyst_filter_record_min_device_uplink_id, analyst_filter_record_max_device_uplink_id) {
      let sql = `INSERT INTO analyst_filter_record
        (analyst_filter_record_name, user_id, analyst_filter_record_header, analyst_filter_record_network, analyst_filter_record_sub_network, analyst_filter_record_vessel, analyst_filter_record_device, 
          analyst_filter_record_start_date, analyst_filter_record_end_date, analyst_filter_record_min_device_uplink_id, analyst_filter_record_max_device_uplink_id)
        VALUES ('${analyst_filter_record_name}', '${user_id}', '${analyst_filter_record_header}', '${analyst_filter_record_network}', '${analyst_filter_record_sub_network}',
        '${analyst_filter_record_vessel}', '${analyst_filter_record_device}', '${analyst_filter_record_start_date}', '${analyst_filter_record_end_date}'
        , '${analyst_filter_record_min_device_uplink_id}' ,'${analyst_filter_record_max_device_uplink_id}')`;
    return db.queryAsync(sql);
  }
};