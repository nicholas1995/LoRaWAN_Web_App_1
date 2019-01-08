var expect = require('chai').expect;
const app = require("../src/app");
const integration = require("mocha-axios");
//-----------------------------------------------------USERS--------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('some-awesome-API', function () {
    it("Should send Unauthorized(No token)", integration( { 
        //--Unauthorized test.... no token sent in request
        app,
        req: {
          method: "GET",
          url: "/users",
        },
        res: {
          status: 401
        }
      }));
    it("Should send Unauthorized(Incorrect token)", integration({
         //--Unauthorized test.... incorrect token sent in request
        app,
        req: {
          method: "GET",
          url: "/users",
          headers: {
            Authorization:
              "bearer 5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
          }
        },
        res: {
          status: 401
        }
      }));
    it("Should send Unauthorized(Expired token)", integration({
        //--Unauthorized test.... expired token sent in request
        app,
        req: {
          method: "GET",
          url: "/users",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0MDAxMDg3MH0.X9DNwN2J0J--rBLBns1rLO5svswQZt24k17G_-Cjzj8"
          }
        },
        res: {
          status: 401
        }
      }));
});
//-----------------------------------------------------NETWORKS-----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('NETWORK API', function () {
    it("Should return networks", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "GET",
            url: "/networks",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 200
        }
    }));
    it("Should return networks in the database", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "GET",
            url: "/networks/database",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 200
        }
    }));
    
/*     it("Should create a network", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "POST",
            url: "/networks",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            },
            data: {
                network: {
                    network_name: "test-5",
                    network_display_name: "test",
                    network_can_have_gateways: true
                }
            }
        },
        res: {
            status: 201
        }
    }));
    it("Should update the specifed network", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "PUT",
            url: "/networks/299",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            },data: {
                network: {
                    network_name: "test-3",
                    network_display_name: "update",
                    network_can_have_gateways: true
                }
            }
        },
        res: {
            status: 200
        }
    }));
    it("Should delete the specifed network", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "DELETE",
            url: "/networks/299",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 200
        }
    })); */

});

//-----------------------------------------------------SUB-NETWORKS-------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('SUB-NETWORK API', function () {
    it("Should return Sub-Networks", integration({
        //--Should return all the currently implemented sub-networks
        app,
        req: {
          method: "GET",
          url: "/sub_networks",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
          }
        },
        res: {
          status: 200
        }
      }));
    it("Should return specified Sub-Netowrks", integration({
        //--should return the specified subnetwork
        app,
        req: {
          method: "GET",
          url: "/sub_networks/one/140",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
          }
        },
        res: {
          status: 200
        }
      }));
    it("Should return Sub-Netowrks from database under specifed network", integration({
        //--should return the subnetworks from the database under the specifed network
        app,
        req: {
            method: "GET",
            url: "/sub_networks/database/network/57",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 200
        }
    }));
    it("Should return Sub-Netowrks from database", integration({
        //--should return the subnetworks from the database
        app,
        req: {
            method: "GET",
            url: "/sub_networks/database",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 200
        }
    }));
    it("Should create a Sub-Netowrk ", integration({
        //--should create a sub-network
        app,
        req: {
          method: "POST",
          url: "/sub_networks",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
          },
          data: {
            sub_network: {
              sub_network_name: "Test3",
              sub_network_description: "to delete... testing route",
              network_id: "57",
              service_profile_id: "e4f6ebc7-bc5a-48d3-b629-1e26674448f2",
              payload_codec: ""
            }
          }
        },
        res: {
          status: 201
        }
      }));
    it("Should update the specified Sub-Netowrk ", integration({
        //--should return the specified subnetwork
        app,
        req: {
          method: "PUT",
          url: "/sub_networks/150",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
          },
          data: {
            sub_network: {
              sub_network_name: "Test12",
              sub_network_description: "to delete... testing route",
              network_id: "57",
              service_profile_id: "e4f6ebc7-bc5a-48d3-b629-1e26674448f2",
              payload_codec: ""
            }
          }
        },
        res: {
          status: 200
        }
      }));
    it("Should delete the specified Sub-Netowrk ", integration({
        //--should return the specified subnetwork
        app,
        req: {
            method: "DELETE",
            url: "/sub_networks/150",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            },
        },
        res: {
            status: 200
        }
    }));
});

//-----------------------------------------------------VESSELS------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('VESSEL API', function () {
/*     it("Should send Unauthorized(No token)", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "GET",
            url: "/users",
            headers: {
                Authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 401
        }
    })); */
});

//-----------------------------------------------------DEVICES------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('DEVICE API', function () {
/*     it("Should send Unauthorized(No token)", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "GET",
            url: "/users",
            headers: {
                Authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 401
        }
    })); */
});

//-----------------------------------------------------GATEWAYS-----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('GATEWAY API', function () {
/*     it("Should send Unauthorized(No token)", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "GET",
            url: "/users",
            headers: {
                Authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 401
        }
    })); */
});

//-----------------------------------------------------SERVICE PROFILES---------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('SERVICE PROFILE API', function () {
/*     it("Should send Unauthorized(No token)", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "GET",
            url: "/users",
            headers: {
                Authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 401
        }
    })); */
});

//-----------------------------------------------------DEVICE UPLINK------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('DEVICE UPLINK API', function () {
/*     it("Should send Unauthorized(No token)", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "GET",
            url: "/users",
            headers: {
                Authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 401
        }
    })); */
});

//-----------------------------------------------------GATEWAY STATS------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('GATEWAY STATS API', function () {
/*     it("Should send Unauthorized(No token)", integration({
        //--Unauthorized test.... no token sent in request
        app,
        req: {
            method: "GET",
            url: "/users",
            headers: {
                Authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 401
        }
    })); */
});

/*     it("should login correctly", integration({
        app,
        req: {
            method: "GET",
            url: "/users",
            data: {
                method: "email",
                email: "james@jdrydn.com",
                password: "correct-horse-battery-staple"
            },
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU0NzAxNDg3MH0.QveJexEQq7PV4gt90Ymh-g3O3bdUh3P7Y4WcBMvqjmw"
            }
        },
        res: {
            status: 200
                         headers: {
                  'X-Auth-Token': 'e409413fd5b4bad63f0ee4093b0b0e9b',
              },
              data: {
                  user: {
                      id: '1',
                      username: 'jdrydn',
                  },
              },
        }
    })); */