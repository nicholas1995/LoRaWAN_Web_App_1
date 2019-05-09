const DB_ANALYST_FILTER_RECORD = require ("../services/database/analyst_filter_record_db")

module.exports = {
    get_analyst_filter_records: async function(req, res) {
        try{ 
            let user_id = req.user.id;
            let analyst_filter_records = await DB_ANALYST_FILTER_RECORD.get_analyst_filter_record(user_id)
                .catch(err => {
                    //Error fetching analyst filter records
                    throw err;
                })
            res.status(200).send({analyst_filter_records: analyst_filter_records, message: 'Analyst Filter Records fetched', type: 'success'});
        }catch(err){
            console.log(err)
        }
    }, 
    create_analyst_filter_records: async function(req, res){
        try{
            let analyst_filter_parameters = req.body.analyst_filter_parameters;
            let headers = null, device_uplink_id_min = null, device_uplink_id_max = null, network = null, sub_network = null,
             vessel = null, device = null, start_date = null, end_data = null, analyst_filter_record_name = null;
            if(analyst_filter_parameters.headers) headers = analyst_filter_parameters.headers;
            if(analyst_filter_parameters.device_uplink_id_min) device_uplink_id_min = analyst_filter_parameters.device_uplink_id_min;
            if(analyst_filter_parameters.device_uplink_id_max) device_uplink_id_max = analyst_filter_parameters.device_uplink_id_max;
            if(analyst_filter_parameters.network) network = analyst_filter_parameters.network;            
            if(analyst_filter_parameters.sub_network) sub_network = analyst_filter_parameters.sub_network;
            if(analyst_filter_parameters.vessel) vessel = analyst_filter_parameters.vessel;
            if(analyst_filter_parameters.device) device = analyst_filter_parameters.device;
            if(analyst_filter_parameters.start_date) start_date = analyst_filter_parameters.start_date;
            if(analyst_filter_parameters.end_data) end_data = analyst_filter_parameters.end_data;
            if(analyst_filter_parameters.analyst_filter_record_name) analyst_filter_record_name = analyst_filter_parameters.analyst_filter_record_name;
            let user_id = req.user.id;
            await DB_ANALYST_FILTER_RECORD.create_analyst_filter_record(analyst_filter_record_name, user_id, headers, network, sub_network, vessel, device, start_date, end_data, 
                device_uplink_id_min, device_uplink_id_max).catch(err => {
                    //Error creating analyst filter record
                    throw err;
                })
            let analyst_filter_records = await DB_ANALYST_FILTER_RECORD.get_analyst_filter_record(user_id)
                .catch(err => {
                    //Error fetching analyst filter records
                    throw err;
                })
            res.status(201).send({ analyst_filter_records: analyst_filter_records, message: 'Filter Record created', type: 'success' });
        }catch(err){
            console.log(err)
        }
    },
}
