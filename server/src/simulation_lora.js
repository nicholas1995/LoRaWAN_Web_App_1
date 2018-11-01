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
        data =JSON.stringify(data); //converts to JSON to be transmitted
        res.send(data);
        //res.status(500).send({error: 'Not Working'}); Testing out error handling
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
    },

    get_applications: function(req, res){
        let applications = {
            result: [
                {
                    "description": "Application 1",
                    "id": "123434",
                    "name": "App 1",
                    "organizationID": "111",
                    "serviceProfileID": "SP 1",
                    "serviceProfileName": "Service Profile 1"
                  },    {
                    "description": "Application 2",
                    "id": "234123",
                    "name": "App 2",
                    "organizationID": "123",
                    "serviceProfileID": "SP 3", 
                    "serviceProfileName": "Service Profile 3"
                  },    {
                    "description": "Application 3",
                    "id": "2134123",
                    "name": "App 3",
                    "organizationID": "111",
                    "serviceProfileID": "SP 1",
                    "serviceProfileName": "Service Profile 1"
                  },    {
                    "description": "Application 4",
                    "id": "2314123",
                    "name": "App 4",
                    "organizationID": "123",
                    "serviceProfileID": "SP 5",
                    "serviceProfileName": "Service Profile 5"  
                  },     {
                    "description": "Application 5",
                    "id": "12342134",
                    "name": "App 5",
                    "organizationID": "222",
                    "serviceProfileID": "SP 2",
                    "serviceProfileName": "Service Profile 2"
                  },    {
                    "description": "Application 6",
                    "id": "12341234", 
                    "name": "App 6", 
                    "organizationID": "123",
                    "serviceProfileID": "SP 5",
                    "serviceProfileName": "Service Profile 5"
                  },    {
                    "description": "Application 7", 
                    "id": "2134213",
                    "name": "App 7",
                    "organizationID": "123",
                    "serviceProfileID": "SP 3",
                    "serviceProfileName": "Service Profile 3"
                  },    {
                    "description": "Application 8",
                    "id": "21341234",
                    "name": "App 8",
                    "organizationID": "111",
                    "serviceProfileID": "SP 4",
                    "serviceProfileName": "Service Profile 4"
                  }
            ],
            "totalCount": "8"
            };
            let i;
            let result = [];
            for(i = 0; i< applications.result.length; i++){
                if(applications.result[i].organizationID == req.query.organizationID){
                    result.push(applications.result[i])
                }
            }
        res.status(200).send(result);
    },
    get_service_profiles: function(req, res){
        let service_profiles = {
            "result": [
              {
                "createdAt": "2016-09-24T07:08:15+00:00",
                "name": "Service Profile 1",
                "networkServerID": "23423",
                "organizationID": "111",
                "serviceProfileID": "Sp 1",
                "updatedAt": "2016-09-24T07:08:15+00:00"
              },
              {
                "createdAt": "2016-09-24T07:08:15+00:00",
                "name": "Service Profile 2",
                "networkServerID": "23423",
                "organizationID": "222",
                "serviceProfileID": "Sp 2",
                "updatedAt": "2016-09-24T07:08:15+00:00"
              },
              {
                "createdAt": "2016-09-24T07:08:15+00:00",
                "name": "Service Profile 3",
                "networkServerID": "23423",
                "organizationID": "123",
                "serviceProfileID": "Sp 3",
                "updatedAt": "2016-09-24T07:08:15+00:00"
              },
              {
                "createdAt": "2016-09-24T07:08:15+00:00",
                "name": "Service Profile 4",
                "networkServerID": "23423",
                "organizationID": "111",
                "serviceProfileID": "Sp 4",
                "updatedAt": "2016-09-24T07:08:15+00:00"
              },
              {
                "createdAt": "2016-09-24T07:08:15+00:00",
                "name": "Service Profile 5",
                "networkServerID": "23423",
                "organizationID": "123",
                "serviceProfileID": "Sp 5",
                "updatedAt": "2016-09-24T07:08:15+00:00"
              }
            ],
            "totalCount": "5"
          }
          let i;
          let result = [];
          console.log(req.query.organizationID)
          for(i = 0; i< service_profiles.result.length; i++){
              if(service_profiles.result[i].organizationID == req.query.organizationID){
                result.push(service_profiles.result[i])
              }
          }
          res.status(200).send({result});

    },
    create_applications: function(req,res){
      res.status(200).send({
        "id": randomPasswordGenerator()
      })
    },
    update_applications: function(req, res){
      res.status(200).send({})
    },
    delete_applications: function(req, res){
      res.status(200).send({})
    }
}