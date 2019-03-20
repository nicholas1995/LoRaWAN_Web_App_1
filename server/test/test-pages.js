var expect = require('chai').expect;
const app = require("../src/app");
const integration = require("mocha-axios");
const fs = require("fs");

//------------------------------------------------------------------------------------------------------------------------
function skip_line(var_name) {
    fs.writeFile("result.txt", `\r\n${var_name}`, { flag: 'a+' }, err => {
        if (err) throw err;
    });
}
function add_data_skip_line(data){
    fs.writeFile("result.txt", JSON.stringify(data), { flag: 'a+' }, err => {
        if (err) throw err;
    });
    fs.writeFile("result.txt", `\r\n`, { flag: "a+" }, err => {
      if (err) throw err;
    });
}

//-----------------------------------------------------USERS--------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
// describe('API AUTHORIZATION', function () {
//     it("Should return all the information about the speciifed user",integration({ //Test 1
//         //--Unauthorized test.... no token sent in request
//         app,
//         before() {
//             console.log("----------User API Integrations Tests--------")
//             skip_line("let users_1 = ");
//         },
//         req: {
//           method: "GET",
//           url: "/api/users/65",
//           headers: {//Software Admin Token
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTMwMzQxMjQsImV4cCI6MTU1MzA3NzMyNH0.3-XhEj5zg6he-ye8UPNOlJJIkos0GZeBHV5bmrwybTw"
//           }
//         },
//         res: {
//           status: 200
//         },
//         after(res) {
//           add_data_skip_line(res.res.data);
//         }
//     }));
//     it("Should return all users", integration({ //Test 2
//         //--Unauthorized test.... no token sent in request
//         app,
//         before() {
//             skip_line("let users_2 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/users",
//             headers: {//Software Admin Token
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTMwMzQxMjQsImV4cCI6MTU1MzA3NzMyNH0.3-XhEj5zg6he-ye8UPNOlJJIkos0GZeBHV5bmrwybTw"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
//     it("Should create the speciifed user account", integration({ //Test 3
//         //--Unauthorized test.... no token sent in request
//         app,
//         req: {
//             method: "POST",
//             url: "/api/users",
//             headers: {//Software Admin Token
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTMwMzQxMjQsImV4cCI6MTU1MzA3NzMyNH0.3-XhEj5zg6he-ye8UPNOlJJIkos0GZeBHV5bmrwybTw"
//             },
//             data: {
//                 user: {
//                     first_name: 'Nicholas',
//                     last_name: 'Mitchell',
//                     user_country: 'Trinidad & Tobago',
//                     user_city: 'San Fernando',
//                     user_district: 'La Romain',
//                     user_street: '#18 Sunset Ridge ',
//                     home_phone: '8686977772',
//                     mobile_phone: '8683229648',
//                     email: 'nicholas.mitchell@my.uwi.edu',
//                     user_class: 'Fisher',
//                     vessels: [2, 3]
//                 }
//             }
//         },
//         res: {
//             status: 200
//         }
//     }));
//     it("Should update the speciifed user account", integration({ //Test 4
//         //--Unauthorized test.... no token sent in request
//         app,
//         req: {
//             method: "PUT",
//             url: "/api/users/74",
//             headers: {//Software Admin Token
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTMwMzQxMjQsImV4cCI6MTU1MzA3NzMyNH0.3-XhEj5zg6he-ye8UPNOlJJIkos0GZeBHV5bmrwybTw"
//             },
//             data: {
//                 user: {
//                     first_name: 'Bobby',
//                     last_name: 'Brown',
//                     user_country: 'USA',
//                     user_city: 'Town',
//                     user_district: 'Lane',
//                     user_street: '#18 Sunset Ridge ',
//                     home_phone: '8683229648',
//                     mobile_phone: '8683229648',
//                     user_class: 'Software Admin',
//                     vessels: { added: [], deleted: [] }
//                 }
//             }
//         },
//         res: {
//             status: 200
//         }
//     }));
//     it("Should return all the information about the speciifed user", integration({ //Test 5
//         //--Unauthorized test.... no token sent in request
//         app,
//         before() {
//             skip_line("let users_3 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/users/74",
//             headers: {//Software Admin Token
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTMwMzQxMjQsImV4cCI6MTU1MzA3NzMyNH0.3-XhEj5zg6he-ye8UPNOlJJIkos0GZeBHV5bmrwybTw"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
//     it("Should delete the speciifed user", integration({ //Test 6
//         //--Unauthorized test.... no token sent in request
//         app,
//         req: {
//             method: "DELETE",
//             url: "/api/users/74",
//             headers: {//Software Admin Token
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTMwMzQxMjQsImV4cCI6MTU1MzA3NzMyNH0.3-XhEj5zg6he-ye8UPNOlJJIkos0GZeBHV5bmrwybTw"
//             }
//         },
//         res: {
//             status: 200
//         }
//     }));
//     it("Should return all users", integration({ //Test 7
//         //--Unauthorized test.... no token sent in request
//         app,
//         before() {
//             skip_line("let users_4 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/users",
//             headers: {//Software Admin Token
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsb3Jhd2FuY29uc29sZUBnbWFpbC5jb20iLCJ1c2VyX2NsYXNzIjoiU29mdHdhcmUgQWRtaW4iLCJpYXQiOjE1NTMwMzQxMjQsImV4cCI6MTU1MzA3NzMyNH0.3-XhEj5zg6he-ye8UPNOlJJIkos0GZeBHV5bmrwybTw"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
// });

//-----------------------------------------------------Organization-----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
// describe('Organization API', function () {
//     it( "Should return organizations", integration({ //Test 1
//         //--Unauthorized test.... no token sent in request
//         app,
//         before() {
//             console.log("----------Organization API Integrations Tests")
//             skip_line("let organizations_1 = ");
//         },
//         req: {
//           method: "GET",
//           url: "/api/networks",
//           headers: {
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//           }
//         },
//         res: {
//           status: 200
//         },
//         after(res) {
//           add_data_skip_line(res.res.data);
//         }
//       })
//     );
//     it("Should return organizations in the database", integration({//Test 2
//         //--Unauthorized test.... no token sent in request
//         app,
//         before() {
//             skip_line("let organizations_2 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/networks/database",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
//     it("Should create an organization", integration({//Test 3
//         //--Unauthorized test.... no token sent in request
//         app,
//         req: {
//             method: "POST",
//             url: "/api/networks",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             },
//             data: {
//                 network: {
//                     network_name: "Integration-Test-Organization_Create",
//                     network_display_name: "ITO Create Organization",
//                     network_can_have_gateways: true
//                 }
//             }
//         },
//         res: {
//             status: 201
//         }
//     }));
//     it("Should update the specifed organization", integration({//Test 4
//         //--Unauthorized test.... no token sent in request
//         app,
//         req: {
//             method: "PUT",
//             url: "/api/networks/397",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }, data: {
//                 network: {
//                     network_name: "Integration-Test-Organization_Update",
//                     network_display_name: "ITO Update Organization",
//                     network_can_have_gateways: true
//                 }
//             }
//         },
//         res: {
//             status: 200
//         }
//     }));
//     it("Should return organizations", integration({ //Test 5
//             //--Unauthorized test.... no token sent in request
//             app,
//             before() {
//                 skip_line("let organizations_3 = ");
//             },
//             req: {
//                 method: "GET",
//                 url: "/api/networks",
//                 headers: {
//                     Authorization:
//                         "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//                 }
//             },
//             res: {
//                 status: 200
//             },
//             after(res) {
//                 add_data_skip_line(res.res.data);
//             }
//         })
//     );
//     it("Should delete the specifed network", integration({ //Test 6
//         //--Unauthorized test.... no token sent in request
//         app,
//         req: {
//             method: "DELETE",
//             url: "/api/networks/397",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         }
//     }));
//     it("Should return organizations", integration({ //Test 7
//             //--Unauthorized test.... no token sent in request
//             app,
//             before() {
//                 skip_line("let organizations_4 = ");
//             },
//             req: {
//                 method: "GET",
//                 url: "/api/networks",
//                 headers: {
//                     Authorization:
//                         "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//                 }
//             },
//             res: {
//                 status: 200
//             },
//             after(res) {
//                 add_data_skip_line(res.res.data);
//             }
//         })
//     );
//     it("Should return organizations in the database", integration({ //Test 8
//         //--Unauthorized test.... no token sent in request
//         app,
//         before() {
//             skip_line("let organizations_5 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/networks/database",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
// });

// //-----------------------------------------------------SUB-NETWORKS-------------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------
// describe('Application API', function () {
//     it("Should return currently implemented Applications", integration({ //Test 1
//         //--Should return all the currently implemented sub-networks
//         app,
//         before() {
//             console.log("----------Application API Integrations Tests----------")
//             skip_line('let applications_1 = ');
//         },
//         req: {
//             method: "GET",
//             url: "/api/sub_networks",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res){
//             add_data_skip_line(res.res.data);
//         }
//     }));
//     it("Should return specified Application", integration({ //Test 2
//         //--should return the specified subnetwork
//         app,
//         before() {
//             skip_line("let applications_2 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/sub_networks/one/156",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
//     it("Should return Application from database under specifed Organization", integration({ //Test 3
//         //--should return the subnetworks from the database under the specifed network
//         app,
//         before() {
//             skip_line("let applications_3 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/sub_networks/database/network/342",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
//     it("Should return all Applications from database", integration({ //Test 4
//         //--should return the subnetworks from the database
//         app,
//         before() {
//             skip_line("let applications_4 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/sub_networks/database",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res){
//             add_data_skip_line(res.res.data);
//         }
//     }));
//     it("Should create a Application", integration({ //Test 5
//         //--should create a sub-network
//         app,
//         req: {
//             method: "POST",
//             url: "/api/sub_networks",
//             headers: {
//             Authorization:
//                 "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             },
//             data: {
//             sub_network: {
//                 sub_network_name: "Integration-Test-Application_Create",
//                 sub_network_description: "ITA Create Application",
//                 network_id: "342",
//                 service_profile_id: "ae2ed918-d653-4a14-b638-b52236d2d0ae",
//                 payload_codec: ""
//             }
//             }
//         },
//         res: {
//             status: 201
//         }
//     }));
//     it("Should update the specified Application ", integration({ //Test 6
//         //--should return the specified subnetwork
//         app,
//         req: {
//             method: "PUT",
//             url: "/api/sub_networks/181",
//             headers: {
//             Authorization:
//                 "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             },
//             data: {
//             sub_network: {
//                 sub_network_name: "Integration-Test-Application_Update",
//                 sub_network_description: "ITA Update Application",
//                 network_id: "342",
//                 service_profile_id: "ae2ed918-d653-4a14-b638-b52236d2d0ae",
//                 payload_codec: ""
//             }
//             }
//         },
//         res: {
//             status: 200
//         }
//     }));
//     it("Should return currently implemented Applications (view created and updated)", integration({ //Test 7
//         //--Should return all the currently implemented sub-networks
//         app,
//         before() {
//             skip_line("let applications_5 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/sub_networks",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
//     it("Should delete the specified Application ", integration({ //Test 8
//         //--should return the specified subnetwork
//         app,
//         req: {
//             method: "DELETE",
//             url: "/api/sub_networks/181",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             },
//         },
//         res: {
//             status: 200
//         }
//     }));
//     it("Should return Applications (deleted gone)", integration({ //Test 9
//         //--Should return all the currently implemented sub-networks
//         app,
//         before() {
//             skip_line("let applications_6 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/sub_networks",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
//     it("Should return all Applications from database", integration({ //Test 10
//         //--should return the subnetworks from the database
//         app,
//         before() {
//             skip_line("let applications_7 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/sub_networks/database",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
// });

// //-----------------------------------------------------VESSELS------------------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------
// describe('VESSEL API', function () {
//     it("Should return all of the vessels adhereing to application, deleted and access parameters", integration({ //Test 1
//         app,
//         before() {
//             console.log("--------Vessel API Integration Tests--------")
//             skip_line("let vessels_1 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/vessels/sub_network/156/deleted/0/access/all",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all of the vessels adhereing to application and access parameters", integration({ //Test 2
//         app,
//         before() {
//             skip_line("let vessels_2 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/vessels/sub_network/156/access/all",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all of the vessels adhereing to deleted and access parameters", integration({ //Test 3
//         app,
//         before() {
//             skip_line("let vessels_3 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/vessels/deleted/a/access/self",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all of the vessels adhereing to the access parameters", integration({ //Test 4
//         app,
//         before() {
//             skip_line("let vessels_4 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/vessels/access/self",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all of the vessels adhereing to the application and deleted parameters", integration({ //Test 5
//         app,
//         before() {
//             skip_line("let vessels_5 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/vessels/sub_network/156/deleted/1",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all of the vessels adhereing to the application parameter", integration({ //Test 6
//         app,
//         before() {
//             skip_line("let vessels_6 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/vessels/sub_network/200",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all of the vessels adhereing to the deleted parameter", integration({ //Test 7
//         app,
//         before() {
//             skip_line("let vessels_7 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/vessels/deleted/1",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all of the vessels", integration({ //Test 8
//         app,
//         before() {
//             skip_line("let vessels_8 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/vessels",
//             headers: {
//                 Authorization:
//                 "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 

//     it("Should create the vessel", integration({ //Test 9
//         app,
//         req: {
//             method: "POST",
//             url: "/api/vessels",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }, data: {
//                 vessel: {
//                     vessel_name: "Integration-Test-Vessel_Create",
//                     vessel_unique_vessel_identifier: "345345431",
//                     vessel_international_radio_call_sign: "3245234",
//                     vessel_type: "Fishing",
//                     sub_network_id: "156",
//                 }
//             }
//         },
//         res: {
//             status: 201
//         }
//     })); 
//     it("Should update the specified vessel", integration({ //Test 10
//         app,
//         req: {
//             method: "PUT",
//             url: "/api/vessels/15",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }, data: {
//                 vessel: {
//                     vessel_name: "Integration-Test-Vessel_Update",
//                 }
//             }
//         },
//         res: {
//             status: 201
//         }
//     })); 
//     it("Should delete the specified vessel", integration({ //Test 11
//         app,
//         req: {
//             method: "DELETE",
//             url: "/api/vessels/15",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         }
//     })); 
//     it("Should return all of the vessels adhereing to the deleted parameter", integration({ //Test 12
//         app,
//         before() {
//             skip_line("let vessels_9 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/vessels/deleted/1",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//  });

// //-----------------------------------------------------DEVICES------------------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------
// describe('DEVICE API', function () { //Test 1
//     //Device (Read one)
//     it(
//       "Should return the specified device",
//       integration({
//         app,
//         before() {
//           console.log("--------Device API Integration Tests--------");
//           skip_line("let devices_1 = ");
//         },
//         req: {
//           method: "GET",
//           url: "/api/devices/1111111111111111",
//           headers: {
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//           }
//         },
//         res: {
//           status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//       })
//     ); 
//       //Devices (Read)
//     it("Should return the devices", integration({ //Test 2
//         app,
//         before() {
//             skip_line("let devices_2 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/devices",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     let user_vessel_info = [ { vessel_id: 2,
//     date_created: '2019-03-09 22:36:33',
//     date_deleted: '2019-03-15 21:33:28' },
//   { vessel_id: 2,
//     date_created: '2019-03-15 21:34:54',
//     date_deleted: '2019-03-15 21:35:00' } ];
//     user_vessel_info = JSON.stringify(user_vessel_info);
//     //Device (Read all under specified user from db)
//     it("Should return all the devices that user owns", integration({ //Test 3
//         app,
//         before() {
//             skip_line("let devices_3 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/devices/self/${user_vessel_info}`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all the devices from the database on the specified vessel", integration({ //Test 4
//         app,
//         before() {
//             skip_line("let devices_4 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/devices/database/2`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     //Device (Read the initial device data for the map)
//     it("Should return the initial device data for the map", integration({ //Test 5
//         app,
//         before() {
//             skip_line("let devices_5 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/devices/map/initial`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     //Device (Read the refresh device data for the map)
//     it("Should return the most recent device data for the specified device", integration({ //Test 6
//         app,
//         before() {
//             skip_line("let devices_6 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/devices/map/refresh/:device_id`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should create the device", integration({ //Test 7
//         app,
//         req: {
//             method: "POST",
//             url: `/api/devices`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             },data: {
//                 device: {
//                     device_name: "Integration-Test-Device_Create",
//                     device_eui: "1234567891011121",
//                     device_description: "ITD Create Device",
//                     sub_network_id: "156",
//                     vessel_id: 2,
//                     device_profile_id_lora: "f7963621-76d3-4f9b-bd5b-858468a14b8b",
//                     reference_altitude: "5",
//                     skip_frame_counter: true,
//                 }
//             }
//         },
//         res: {
//             status: 201
//         }
//     })); 
//     it("Should update the specified device", integration({ //Test 8
//         app,
//         req: {
//             method: "PUT",
//             url: `/api/devices/1234567891011121`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }, data: {
//                 device: {
//                     device_id: 20,
//                     device_name: "Integration-Test-Device_Update",
//                     device_eui: "1234567891011121",
//                     device_description: "ITD Update Device",
//                     sub_network_id: "156",
//                     vessel_id: 2,
//                     device_profile_id_lora: "f7963621-76d3-4f9b-bd5b-858468a14b8b",
//                     reference_altitude: "5",
//                     skip_frame_counter: true,
//                 }
//             }
//         },
//         res: {
//             status: 201
//         }
//     })); 
//     //Devices (Read)
//     it("Should return the devices", integration({ //Test 9
//         app,
//         before() {
//             skip_line("let devices_7 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/devices",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should delete the specified device", integration({ //Test 10
//         app,
//         req: {
//             method: "DELETE",
//             url: `/api/devices/1234567891011121`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         } 
//     }));
//     //Devices (Read)
//     it("Should return the devices", integration({ //Test 11
//         app,
//         before() {
//             skip_line("let devices_8 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/devices",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all the devices from the database on the specified vessel", integration({ //Test 12
//         app,
//         before() {
//             skip_line("let devices_9 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/devices/database/2`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should get the specified device activation", integration({ //Test 13
//         app,
//         before() {
//             skip_line("let devices_10 = ");
//         },
//         req: {
//           method: "GET",
//             url: `/api/devices/activation/1111111111111111`,
//           headers: {
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//           }
//         },
//         res: {
//           status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//       })); 
//     it("Should activation the specified device", integration({ //Test 14
//         app,
//         req: {
//           method: "POST",
//           url: `/api/devices/activation/1000000000000000`,
//           headers: {
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//           },data: {
//               device_activation: {
//                   device_eui: "1000000000000000",
//                   dev_addr: "35467457",
//                   nwk_s_enc_key: "45764576457645674576457645764576",
//                   app_s_key: "45674567457645764567457645674567",
//                   f_cnt_up: "10",
//                   n_f_cnt_down: "20",
//               }
//           }
//         },
//         res: {
//           status: 200
//         }
//       })); 
//     it("Should get the specified device activation", integration({ //Test 15
//         app,
//         before() {
//             skip_line("let devices_11 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/devices/activation/1000000000000000`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
// });

//-----------------------------------------------------GATEWAYS-----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
// describe('GATEWAY API', function () {
//     it("Should return the initial gateway information for the Map", integration({ //Test 1
//         app,
//         before() {
//             console.log("--------Gateway API Integration Tests--------")
//             skip_line("let gateways_1 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/gateways/map",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return the most recent gateway information for specified gateway", integration({ //Test 2
//         app,
//         before() {
//             skip_line("let gateways_2 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/gateways/map/refresh/1/2222222222222222",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all the gateways in the database", integration({ //Test 3
//         app,
//         before() {
//             skip_line("let gateways_3 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/gateways/database",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return the specified gateways", integration({ //Test 4
//         app,
//         before() {
//             skip_line("let gateways_4 = ");
//         },
//         req: {
//           method: "GET",
//           url: "/api/gateways/2222222222222222",
//           headers: {
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//           }
//         },
//         res: {
//           status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//       })); 
//     it("Should return all the gateways", integration({ //Test 5
//         app,
//         before() {
//             skip_line("let gateways_5 = ");
//         },
//         req: {
//           method: "GET",
//           url: "/api/gateways",
//           headers: {
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//           }
//         },
//         res: {
//           status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//       })); 
//     it("Should create the gateway", integration({ //Test 6
//         app,
//         req: {
//             method: "POST",
//             url: "/api/gateways",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }, data: {
//                 gateway: {
//                     gateway_name: "Integration-Test-Gateway_Create",
//                     gateway_id_lora: "7777777777777777",
//                     gateway_description: "ITG Create Gateway",
//                     network_id: 342,
//                     network_server_id: 8,
//                     gateway_profile_id: "0c2a8804-406e-4e30-b4d9-6313ac0147db",
//                     gateway_accuracy: '2',
//                     gateway_altitude: "0",
//                     gateway_latitude: "5",
//                     gateway_longitude: "4",
//                     gateway_location_source: "UNKNOWN",
//                     discovery_enabled: false,
//                     fine_time_stamp_key: "45364364356345634563456454444444",
//                     fpga_id: "4363564564564564"
//                 }
//             }
//         },
//         res: {
//             status: 201
//         }
//     })); 
//     it("Should update the specified gateway", integration({ //Test 7
//         app,
//         req: {
//             method: "PUT",
//             url: "/api/gateways/17",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }, data: {
//                 gateway: {
//                     gateway_name: "Integration-Test-Gateway_Update",
//                     gateway_id: 17,
//                     gateway_id_lora: "7777777777777777",
//                     gateway_description: "ITG Update Gateway",
//                     network_id: 342,
//                     network_server_id: 8,
//                     gateway_profile_id: "0c2a8804-406e-4e30-b4d9-6313ac0147db",
//                     gateway_accuracy: '2',
//                     gateway_altitude: "0",
//                     gateway_latitude: "5",
//                     gateway_longitude: "4",
//                     gateway_location_source: "UNKNOWN",
//                     discovery_enabled: false,
//                     fine_time_stamp_key: "45364364356345634563456454444444",
//                     fpga_id: "4363564564564564"
//                 }
//             }
//         },
//         res: {
//             status: 201
//         }
//     })); 
//     it("Should return the specified gateways", integration({ //Test 8
//         app,
//         before() {
//             skip_line("let gateways_6 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/gateways/7777777777777777",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should delete the specified gateway", integration({ //Test 9
//         app, 
//         req: {
//           method: "DELETE",
//           url: "/api/gateways/7777777777777777",
//           headers: {
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//           }
//         },
//         res: {
//           status: 200
//         }
//       }));  
//     it("Should return all the gateways", integration({ //Test 10
//         app,
//         before() {
//             skip_line("let gateways_7 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/gateways",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all the gateways in the database", integration({ //Test 11
//         app,
//         before() {
//             skip_line("let gateways_8 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/gateways/database",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
// });
// //-----------------------------------------------------NETWORK SERVERS----------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------
// describe('NETWORK SERVER API', function () {
//     it("Should return the network servers", integration({
//         //--Return network servers
//         app,
//         req: {
//             method: "GET",
//             url: "/network_servers",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         }
//     }));
// });

// //-----------------------------------------------------SERVICE PROFILES---------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------
// describe('SERVICE PROFILE API', function () { //Test 1
//     it("Should return the specified service profile", integration({
//         app,
//         before() {
//             skip_line("let service_profile_1 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/service_profiles/ae2ed918-d653-4a14-b638-b52236d2d0ae",
//             headers: {
//                 Authorization:
//                 "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all the service profiles", integration({ //Test 2
//         app,
//         before() {
//             skip_line("let service_profile_2 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/service_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should create the service profiles", ntegration({ //Test 3
//         app,
//         req: {
//           method: "POST",
//           url: "/api/service_profiles",
//           headers: {
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//           },
//           data: {
//             service_profile: {
//               service_profile_name: "Integration-Test-Service_Profile_Create",
//               network_id: "342",
//               network_server_id: "8",
//               add_gw_metadata: true,
//               report_device_status_battery: false,
//               report_device_status_margin: false,
//               network_geo_location: false,
//               device_status_req_frequency: "0",
//               dr_min: "5",
//               dr_max: "4"
//             }
//           }
//         },
//         res: {
//           status: 201
//         }
//       })
//     ); 
//     it("Should update the specified service profiles", integration({ //Test 4
//         app,
//         req: {
//           method: "PUT",
//             url: `/api/service_profiles/7ce6f8c6-d3c2-4ed7-be76-273b02a472a8`,
//           headers: {
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//           },
//           data: {
//             service_profile: {
//               service_profile_name:"Integration-Test-Service_Profile_Update",
//               add_gw_metadata: true,
//               report_device_status_battery: false,
//               report_device_status_margin: false,
//               network_geo_location: false,
//               device_status_req_frequency: 0,
//               dr_min: 5,
//               dr_max: 4
//             }
//           }
//         },
//         res: {
//           status: 200
//         }
//       })
//     ); 
//     it("Should return all the service profiles", integration({ //Test 5
//         app,
//         before() {
//             skip_line("let service_profile_3 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/service_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should delete the specified service profiles", integration({ //Test 6
//         app,
//         req: {
//             method: "DELETE",
//             url: `/api/service_profiles/7ce6f8c6-d3c2-4ed7-be76-273b02a472a8`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         }
//     })); 
//     it("Should return all the service profiles", integration({ //Test 7
//         app,
//         before() {
//             skip_line("let service_profile_4 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/service_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
// });

// // -----------------------------------------------------DEVICE PROFILES----------------------------------------------------
// // ------------------------------------------------------------------------------------------------------------------------
// describe('DEVICE PROFILE API', function () {
//     it("Should return the device profiles under the specified sub network", integration({ //Test 1
//         //--Device profile get test
//         app,
//         before() {
//             skip_line("let device_profile_1 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/device_profiles/sub_network/156",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return the specified device profile", integration({ //Test 2
//         //--Device profile get test
//         app,
//         before() {
//             skip_line("let device_profile_2 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/device_profiles/f7963621-76d3-4f9b-bd5b-858468a14b8b",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all the device profiles", integration({ //Test 3
//         //--Device profile get test
//         app,
//         before() {
//             skip_line("let device_profile_3 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/device_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should create a device profile", integration({ //Test 4
//         //--Device profile get test
//         app,
//         req: {
//             method: "POST",
//             url: "/api/device_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             },
//             data:{
//                 device_profile:{
//                     device_profile_name: 'Integration-Test-Device_Profile_Create',
//                     mac_version: '1.0.0',
//                     reg_params_revision: 'B',
//                     network_id: 342,
//                     network_server_id: 8,
//                     max_eirp: 0,
//                     supports_join: false,
//                     rx_delay_1: 0,
//                     rx_dr_offset_1: 0,
//                     rx_dr_2: 0,
//                     rx_frequency_2: 0,
//                     factory_preset_frequencies: ['0'],
//                     supports_class_b: false,
//                     class_b_timeout: 0,
//                     ping_slot_period: 1,
//                     ping_slot_dr: 0,
//                     ping_slot_frequency: 0,
//                     supports_class_c: false,
//                     class_c_timeout: 0
//                 }
//             }
//         },
//         res: {
//             status: 201
//         },
//     })); 
//     it("Should update the specified device profile", integration({ //Test 5
//         //--Device profile get test
//         app,
//         req: {
//             method: "PUT",
//             url: "/api/device_profiles/31e0b5e4-9c12-4739-84a0-0cbc3a79d090",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             },
//             data:{
//                 device_profile:{
//                     device_profile_name: 'Integration-Test-Device_Profile_Update',
//                     mac_version: '1.0.0',
//                     reg_params_revision: 'B',
//                     network_id: 342,
//                     network_server_id: 8,
//                     max_eirp: 0,
//                     supports_join: false,
//                     rx_delay_1: 0,
//                     rx_dr_offset_1: 0,
//                     rx_dr_2: 0,
//                     rx_frequency_2: 0,
//                     factory_preset_frequencies: ['0'],
//                     supports_class_b: false,
//                     class_b_timeout: 0,
//                     ping_slot_period: 1,
//                     ping_slot_dr: 0,
//                     ping_slot_frequency: 0,
//                     supports_class_c: false,
//                     class_c_timeout: 0
//                 }
//             }
//         },
//         res: {
//             status: 200
//         },
//     })); 
//     it("Should return all the device profiles", integration({ //Test 6
//         //--Device profile get test
//         app,
//         before() {
//             skip_line("let device_profile_4 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/device_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should delete the device profile", integration({ //Test 7
//         //--Device profile get test
//         app,
//         req: {
//             method: "DELETE",
//             url: "/api/device_profiles/31e0b5e4-9c12-4739-84a0-0cbc3a79d090",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         }
//     })); 
//     it("Should return all the device profiles", integration({ //Test 8
//         //--Device profile get test
//         app,
//         before() {
//             skip_line("let device_profile_5 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/device_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
// });

// //-----------------------------------------------------GATEWAY PROFILES---------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------
// describe('Gateway Profiles API', function () {
//     it("Should return the specified gateway profile", integration({ //Test 1
//         app,
//         before() {
//             console.log("--------Gateway Profile API Integration Tests--------")
//             skip_line("let gateway_profile_1 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/gateway_profiles/0c2a8804-406e-4e30-b4d9-6313ac0147db",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return all the gateway profiles", integration({ //Test 2
//         app,
//         before() {
//             skip_line("let gateway_profile_2 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/gateway_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should create the gateway profiles", integration({ //Test 3
//         app,
//         req: {
//             method: "POST",
//             url: "/api/gateway_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             },
//             data: {
//                 gateway_profile:
//                     {
//                         gateway_profile_name: 'Integration-Test-Gateway_Profile_Create',
//                         gateway_profile_channels: ['3456', '456', '45'],
//                         network_server_id_lora: 8,
//                         gateway_profile_modulation: 'LORA',
//                         gateway_profile_bandwidth: 125,
//                         gateway_profile_frequency: '567',
//                         gateway_profile_spreading_factors: [0],
//                         gateway_profile_bit_rate: 0
//                     }
//                 }
//         },
//         res: {
//             status: 201
//         }
//     })); 
//     it("Should update the gateway profiles", integration({ //Test 4
//         app,
//         req: {
//             method: "PUT",
//             url: "/api/gateway_profiles/9fd4700f-923a-400e-ae4d-47136469894e",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             },
//             data: {
//                 gateway_profile:
//                     {
//                         gateway_profile_name: 'Integration-Test-Gateway_Profile_Update',
//                         gateway_profile_channels: ['3456', '456', '45'],
//                         network_server_id_lora: 8,
//                         gateway_profile_modulation: 'LORA',
//                         gateway_profile_bandwidth: 125,
//                         gateway_profile_frequency: '567',
//                         gateway_profile_spreading_factors: [0],
//                         gateway_profile_bit_rate: 0
//                     }
//                 }
//         },
//         res: {
//             status: 200
//         }
//     })); 
//     it("Should return all the gateway profiles", integration({ //Test 5
//         app,
//         before() {
//             skip_line("let gateway_profile_3 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/gateway_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should DELETE the gateway profile", integration({ //Test 6
//         app,
//         req: {
//             method: "DELETE",
//             url: "/api/gateway_profiles/9fd4700f-923a-400e-ae4d-47136469894e",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//     })); 
//     it("Should return all the gateway profiles", integration({ //Test 7
//         app,
//         before() {
//             skip_line("let gateway_profile_4 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/gateway_profiles",
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
// });

// //-----------------------------------------------------DEVICE UPLINK------------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------
// describe('DEVICE UPLINK API', function () {
//     // //Performance Test
//     // let start_date, end_date, milli_seconds = 0;
//     // let n = 4000
//     // //console.log('Performance API test with ', n, 'records, (NO PAGEINATION)')
//     // console.log('Performance API test with ', n, 'records, (PAGEINATION - 1000)')

//     // for(let i = 0; i< 10; i++){
//     //     it("Should return the initial set of deivce uplink data", integration({
//     //         app,
//     //         before(){
//     //             start_date = new Date()
//     //         },
//     //         req: {
//     //             method: "GET",
//     //             url: "/api/devices/uplink/initial/page/1/rows_per_page/100",
//     //             headers: {
//     //                 Authorization:
//     //                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//     //             }
//     //         },
//     //         res: {
//     //             status: 200
//     //         },
//     //         after(res) {
//     //             end_date = new Date();
//     //             milli_seconds = milli_seconds + end_date.getTime() - start_date.getTime();
//     //             if (i == 9) console.log("Average: ", milli_seconds / 10, "ms");
//     //         }
//     //     })); 
//     // }
//     it("Should return the initial set of deivce uplink data",integration({ //Test 1
//         app,
//         before() {
//             console.log('--------Device Uplink Data API Integration Tests--------')
//             skip_line("let device_uplink_data_1 = ");
//         },
//         req: {
//           method: "GET",
//           url: "/api/devices/uplink/initial/page/1/rows_per_page/25",
//           headers: {
//             Authorization:
//               "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//           }
//         },
//         res: {
//           status: 200
//         },
//         after(res) {
//           add_data_skip_line(res.res.data);
//         }
//       })
//     ); 
//     it("Should return the initial set of deivce uplink data for self", integration({ //Test 2
//         app,
//         before() {
//             skip_line("let device_uplink_data_2 = ");
//         },
//         req: {
//             method: "GET",
//             url: "/api/devices/uplink/initial/page/1/rows_per_page/25/self",
//             headers: {
//                 Authorization: //This is a tempory JWT.... will expire soon
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsImVtYWlsIjoibmljaG9sYXMuam1pdGNoZWxsQG91dGxvb2suY29tIiwidXNlcl9jbGFzcyI6IkZpc2hlciIsImlhdCI6MTU1Mjc3MjA2OSwiZXhwIjoxNTUyODE1MjY5fQ.9TGQeadyVo4u4TG6yLYSP_fV-vIVIwX7CawCGxqxEi0"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     }));
//     let parameters_1 = {
//         network: null,
//         page: 1,
//         rows_per_page: 25,
//         start_date: "2019-03-01 11:55:00",
//         sub_network: null,
//         device: [1],
//         vessel: [2]
//     }
//     parameters_1 = JSON.stringify(parameters_1); 
//     let columns_1 = ["Device Uplink ID", "Device ID", "Vessel ID", "Time Stamp", "GPS Longitude", "GPS Altitude", "Temperature", "Humidity", "Accelerometer", "SOS"];
//     it("Should return the filtered set of deivce uplink data for self", integration({ //Test 3
//         app,
//         before() {
//             skip_line("let device_uplink_data_3 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/devices/uplink/parameters/${parameters_1}/columns/${columns_1}/return_all_records/0/access/false`,
//             headers: {
//                 Authorization: //This is a tempory JWT.... will expire soon
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsImVtYWlsIjoibmljaG9sYXMuam1pdGNoZWxsQG91dGxvb2suY29tIiwidXNlcl9jbGFzcyI6IkZpc2hlciIsImlhdCI6MTU1Mjc3MjA2OSwiZXhwIjoxNTUyODE1MjY5fQ.9TGQeadyVo4u4TG6yLYSP_fV-vIVIwX7CawCGxqxEi0"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return the filtered set of deivce uplink data", integration({ //Test 4
//         app,
//         before() {
//             skip_line("let device_uplink_data_4 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/devices/uplink/parameters/${parameters_1}/columns/${columns_1}/return_all_records/0`,
//             headers: {
//                 Authorization: //This is a tempory JWT.... will expire soon
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsImVtYWlsIjoibmljaG9sYXMuam1pdGNoZWxsQG91dGxvb2suY29tIiwidXNlcl9jbGFzcyI6IkZpc2hlciIsImlhdCI6MTU1Mjc3MjA2OSwiZXhwIjoxNTUyODE1MjY5fQ.9TGQeadyVo4u4TG6yLYSP_fV-vIVIwX7CawCGxqxEi0"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     // it("Should return the filtered set of deivce uplink data", integration({
//     //     app,
//     //     req: {
//     //         method: "GET",
//     //         url: `/api/devices/uplink/filter_record/columns/${columns_1}`,
//     //         headers: {
//     //             Authorization: //This is a tempory JWT.... will expire soon
//     //                 "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsImVtYWlsIjoibmljaG9sYXMuam1pdGNoZWxsQG91dGxvb2suY29tIiwidXNlcl9jbGFzcyI6IkZpc2hlciIsImlhdCI6MTU1Mjc3MjA2OSwiZXhwIjoxNTUyODE1MjY5fQ.9TGQeadyVo4u4TG6yLYSP_fV-vIVIwX7CawCGxqxEi0"
//     //         }
//     //     },
//     //     res: {
//     //         status: 200
//     //     },
//     // after(res) {
//     //     add_data_skip_line(res.res.data);
//     // }
//     // })); 
//     let parameters_2 = {
//         device: 1,
//         end_date: "2019-03-22 00:00:00",
//         max_record_amt: 50,
//         start_date: "2019-03-07 00:00:00"
//     }
//     parameters_2 = JSON.stringify(parameters_2); 
//     it("Should return the historic data for the map adhereing to the parameters set", integration({ //Test 5
//         app,
//         before() {
//             skip_line("let device_uplink_data_5 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/devices/uplink/historical/parameters/${parameters_2}`,
//             headers: {
//                 Authorization: //This is a tempory JWT.... will expire soon
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsImVtYWlsIjoibmljaG9sYXMuam1pdGNoZWxsQG91dGxvb2suY29tIiwidXNlcl9jbGFzcyI6IkZpc2hlciIsImlhdCI6MTU1Mjc3MjA2OSwiZXhwIjoxNTUyODE1MjY5fQ.9TGQeadyVo4u4TG6yLYSP_fV-vIVIwX7CawCGxqxEi0"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     it("Should return the coordinates to create the heat map", integration({ //Test 6
//         app,
//         before() {
//             skip_line("let device_uplink_data_6 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/device_coordinates`,
//             headers: {
//                 Authorization: //This is a tempory JWT.... will expire soon
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsImVtYWlsIjoibmljaG9sYXMuam1pdGNoZWxsQG91dGxvb2suY29tIiwidXNlcl9jbGFzcyI6IkZpc2hlciIsImlhdCI6MTU1Mjc3MjA2OSwiZXhwIjoxNTUyODE1MjY5fQ.9TGQeadyVo4u4TG6yLYSP_fV-vIVIwX7CawCGxqxEi0"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
//     let coordinate_1 = {
//         lat: 10.70259522788738,
//         lng: -61.69463578300781,
//         zoom_level: 11
//     }
//     coordinate_1 = JSON.stringify(coordinate_1); 
//     it("Should return the sensor data around the coordinate", integration({ //Test 7
//         app,
//         before() {
//             skip_line("let device_uplink_data_7 = ");
//         },
//         req: {
//             method: "GET",
//             url: `/api/sensor_data/coordinate/${coordinate_1}`,
//             headers: {
//                 Authorization: //This is a tempory JWT.... will expire soon
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsImVtYWlsIjoibmljaG9sYXMuam1pdGNoZWxsQG91dGxvb2suY29tIiwidXNlcl9jbGFzcyI6IkZpc2hlciIsImlhdCI6MTU1Mjc3MjA2OSwiZXhwIjoxNTUyODE1MjY5fQ.9TGQeadyVo4u4TG6yLYSP_fV-vIVIwX7CawCGxqxEi0"
//             }
//         },
//         res: {
//             status: 200
//         },
//         after(res) {
//             add_data_skip_line(res.res.data);
//         }
//     })); 
// });


// //-----------------------------------------------------GATEWAY STATS------------------------------------------------------
// //------------------------------------------------------------------------------------------------------------------------
// describe('GATEWAY STATS API', function () {
//     it("Should return the initial gateway statistics", integration({
//         app,
//         req: {
//         method: "GET",
//         url: "gateway_statistics/initial",
//         headers: {
//             Authorization:
//             "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//         status: 200
//         }
//     })); 
//     let parameters = {
//         gateway_id: [11],
//         end_date: "2019-01-09 00:00:00",
//         start_date: "2019-01-01 00:00:00",
//     }
//     parameters = JSON.stringify(parameters);
//     let columns = ["Gateway Statistics ID", "Gateway ID", "Gateway ID LoRa", "Gateway IP Address", "Time Stamp", "Gateway Latitude", "Gateway Longitude",
//         "Gateway Altitude", "Location Source", "Configeration Version", "Rx Packets Received", "Rx Packets Received Ok", "Tx Packets Received", "Tx Packets Emitted"]
//     it("Should return the filtered gateway statistics", integration({
//         app,
//         req: {
//             method: "GET",
//             url: `gateway_statistics/parameters/${parameters}/columns/${columns}`,
//             headers: {
//                 Authorization:
//                     "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//             }
//         },
//         res: {
//             status: 200
//         }
//     })); 
// });

// /*     it("should login correctly", integration({
//     app,
//     req: {
//         method: "GET",
//         url: "/users",
//         data: {
//             method: "email",
//             email: "james@jdrydn.com",
//             password: "correct-horse-battery-staple"
//         },
//         headers: {
//             Authorization:
//                 "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
//         }
//     },
//     res: {
//         status: 200
//                         headers: {
//                 'X-Auth-Token': 'e409413fd5b4bad63f0ee4093b0b0e9b',
//             },
//             data: {
//                 user: {
//                     id: '1',
//                     username: 'jdrydn',
//                 },
//             },
//     }
// })); */