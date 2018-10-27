const Math = require("mathjs");

function randomPasswordGenerator() {
    return Math.random(0, 2)
      .toString(36)
      .substring(2, 10);
  }
  
module.exports = {
    read_networks: function(req, res){
        let data = {
        result: [
            {
            'id': '222',
            name: 'Republic Bank',
            display_name: 'Bank',
            can_have_gateways: 'false',
            created_at: '2016-09-24T07:08:15+00:00',
            updated_at: '2016-09-24T07:08:15+00:00'
            },{
            'id': '123',
            name: 'First Citizens',
            display_name: 'Bank',
            can_have_gateways: 'true',
            created_at: '2018-10-24T07:08:15+00:00',
            updated_at: '2018-10-24T07:08:15+00:00'

            },{
            'id': '111',
            name: 'Republic Bank',
            display_name: 'Bank',
            can_have_gateways: 'false',
            created_at: '2018-09-24T07:08:15+00:00',
            updated_at: '2018-09-24T07:08:15+00:00'
            }
        ],
        "totalCount": 3
        };
        res.send(data);
    },
    create_networks: function(req, res){
        let data = {
            id: randomPasswordGenerator()
        } 
        res.send(data);
    },
    update_networks: function(req, res){
        res.send({})
    },
    delete_networks: function(req, res){
        res.send({})
    }
}