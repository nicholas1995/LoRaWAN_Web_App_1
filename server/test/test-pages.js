var expect = require('chai').expect;
const app = require("../src/app");
const integration = require("mocha-axios");
//-----------------------------------------------------USERS--------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('API AUTHORIZATION', function () {
    it("Should send Unauthorized(No token)", integration({
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
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
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
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    }));

/*      it("Should create a network", integration({
            //--Unauthorized test.... no token sent in request
            app,
            req: {
                method: "POST",
                url: "/networks",
                headers: {
                    Authorization:
                        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
                },
                data: {
                    network: {
                        network_name: "test-1",
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
                url: "/networks/335",
                headers: {
                    Authorization:
                        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
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
                url: "/networks/335",
                headers: {
                    Authorization:
                        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
                }
            },
            res: {
                status: 200
            }
        }));  */

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
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
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
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
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
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
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
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    }));
/*     it("Should create a Sub-Netowrk ", integration({
        //--should create a sub-network
        app,
        req: {
            method: "POST",
            url: "/sub_networks",
            headers: {
            Authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            },
            data: {
            sub_network: {
                sub_network_name: "Test6",
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
            url: "/sub_networks/152",
            headers: {
            Authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
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
            url: "/sub_networks/152",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            },
        },
        res: {
            status: 200
        }
    })); */
});

//-----------------------------------------------------VESSELS------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('VESSEL API', function () {
    it("Should return all of the vessels", integration({
        app,
        req: {
            method: "GET",
            url: "/users",
            headers: {
                Authorization:
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
    it("Should return all of the currently implemented vessels", integration({
        app,
        req: {
            method: "GET",
            url: "/vessels/deleted/0",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
    it("Should return all of the vessels under the specified sub-network", integration({
        app,
        req: {
            method: "GET",
            url: "/vessels/sub_network/121",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
    it("Should return all of the currently implemented vessels under the specified sub-network", integration({
        app,
        req: {
            method: "GET",
            url: "/vessels/sub_network/121/deleted/0",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
/*     it("Should create the vessel", integration({
        app,
        req: {
            method: "POST",
            url: "/vessels",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }, data: {
                vessel: {
                    vessel_name: "Test",
                    vessel_unique_vessel_identifier: "345345",
                    vessel_international_radio_call_sign: "3245234",
                    vessel_type: "Fishing",
                    sub_network_id: "121",
                }
            }
        },
        res: {
            status: 201
        }
    })); 
    it("Should update the specified vessel", integration({
        app,
        req: {
            method: "PUT",
            url: "/vessels/44",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }, data: {
                vessel: {
                    vessel_name: "Test",
                }
            }
        },
        res: {
            status: 201
        }
    })); 
    it("Should delete the specified vessel", integration({
        app,
        req: {
            method: "DELETE",
            url: "/vessels/47",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    }));  */
});

//-----------------------------------------------------DEVICES------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('DEVICE API', function () {
    it("Should return the specified device", integration({
        app,
        req: {
          method: "GET",
          url: "/devices/0000000000000002",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
          }
        },
        res: {
          status: 200
        }
      })); 
    it("Should return the devices", integration({
        app,
        req: {
            method: "GET",
            url: "/devices",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
    let user_vessel_info = [{ vessel_id: 30, date_deleted: '2019-01-06 13:32:41' },
        { vessel_id: 30, date_deleted: '2019-01-06 13:35:12' }];
    user_vessel_info = JSON.stringify(user_vessel_info);
    it("Should return all the devices that user owns", integration({
        app,
        req: {
            method: "GET",
            url: `/devices/self/${user_vessel_info}`,
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
    let vessels = "20,23"
    it("Should return all the devices from the database on the specified vessel", integration({
        app,
        req: {
            method: "GET",
            url: `/devices/database/${vessels}`,
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
/*     it("Should create the device", integration({
        app,
        req: {
            method: "POST",
            url: `/devices`,
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            },data: {
                device: {
                    device_name: "Test",
                    device_eui: "0000000000000000",
                    device_description: "Test device",
                    sub_network_id: "121",
                    vessel_id: 2,
                    device_profile_id_lora: "8b14b99e-5a7b-46a9-856d-987958ad4d62",
                    reference_altitude: "5",
                    skip_frame_counter: true,
                }
            }
        },
        res: {
            status: 201
        }
    })); 
    it("Should update the specified device", integration({
        app,
        req: {
            method: "PUT",
            url: `/devices/0000000000000000`,
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }, data: {
                device: {
                    device_id: 29,
                    device_name: "Test",
                    device_eui: "0000000000000000",
                    device_description: "Test device",
                    sub_network_id: "121",
                    vessel_id: 2,
                    device_profile_id_lora: "8b14b99e-5a7b-46a9-856d-987958ad4d62",
                    reference_altitude: "5",
                    skip_frame_counter: true,
                }
            }
        },
        res: {
            status: 201
        }
    })); 
    it("Should delete the specified device", integration({
        app,
        req: {
            method: "DELETE",
            url: `/devices/0000000000000000`,
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        } 
    })); */
    it("Should get the specified device activation", integration({
        app,
        req: {
          method: "GET",
            url: `/devices/activation/0000000000000002`,
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
          }
        },
        res: {
          status: 200
        }
      })); 
    it("Should activation the specified device", integration({
        app,
        req: {
          method: "POST",
          url: `/devices/activation/2222222222222222`,
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
          },data: {
              device_activation: {
                  device_eui: "2222222222222222",
                  dev_addr: "35467457",
                  nwk_s_enc_key: "45764576457645674576457645764576",
                  app_s_key: "45674567457645764567457645674567",
                  f_cnt_up: "10",
                  n_f_cnt_down: "20",
              }
          }
        },
        res: {
          status: 200
        }
      })); 

});

//-----------------------------------------------------GATEWAYS-----------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('GATEWAY API', function () {
    it("Should return the specified gateways", integration({
        app,
        req: {
          method: "GET",
          url: "/gateways/2222222222222222",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
          }
        },
        res: {
          status: 200
        }
      })); 
    it("Should return the gateways", integration({
        app,
        req: {
          method: "GET",
          url: "/gateways",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
          }
        },
        res: {
          status: 200
        }
      })); 
    it("Should return the gateways from the database", integration({
        app,
        req: {
            method: "GET",
            url: "/gateways/database",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
    it("Should return the gateways with the data for the map", integration({
        app,
        req: {
            method: "GET",
            url: "/gateways/map",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
/*     it("Should create the gateway", integration({
        app,
        req: {
            method: "POST",
            url: "/gateways",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }, data: {
                gateway: {
                    gateway_name: "Test",
                    gateway_id_lora: "7777777777777777",
                    gateway_description: "Test gateway",
                    network_id: 286,
                    network_server_id: 8,
                    gateway_profile_id: "55849de0-eb07-43cf-bbdf-fc8aa579365c",
                    gateway_accuracy: '2',
                    gateway_altitude: "0",
                    gateway_latitude: "5",
                    gateway_longitude: "4",
                    gateway_location_source: "UNKNOWN",
                    discovery_enabled: false,
                    fine_time_stamp_key: "45364364356345634563456454444444",
                    fpga_id: "4363564564564564"
                }
            }
        },
        res: {
            status: 201
        }
    })); 
    it("Should update the specified gateway", integration({
        app,
        req: {
            method: "PUT",
            url: "/gateways/27",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }, data: {
                gateway: {
                    gateway_name: "Test",
                    gateway_id: 27,
                    gateway_id_lora: "7777777777777777",
                    gateway_description: "Test gateway",
                    network_id: 286,
                    network_server_id: 8,
                    gateway_profile_id: "55849de0-eb07-43cf-bbdf-fc8aa579365c",
                    gateway_accuracy: '2',
                    gateway_altitude: "0",
                    gateway_latitude: "5",
                    gateway_longitude: "4",
                    gateway_location_source: "UNKNOWN",
                    discovery_enabled: false,
                    fine_time_stamp_key: "45364364356345634563456454444444",
                    fpga_id: "4363564564564564"
                }
            }
        },
        res: {
            status: 201
        }
    })); 
    it("Should delete the specified gateway", integration({
        app,
        req: {
          method: "DELETE",
          url: "/gateways/7777777777777777",
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
          }
        },
        res: {
          status: 200
        }
      }));   */
});
//-----------------------------------------------------NETWORK SERVERS----------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('NETWORK SERVER API', function () {
    it("Should return the network servers", integration({
        //--Return network servers
        app,
        req: {
            method: "GET",
            url: "/network_servers",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    }));
});

//-----------------------------------------------------SERVICE PROFILES---------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('SERVICE PROFILE API', function () {
            it("Should return the specified service profile", integration({
            app,
            req: {
                method: "GET",
                url: "/service_profiles/e8cff53d-e82f-4861-8c91-da44fe30b6a2",
                headers: {
                    Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
                }
            },
            res: {
                status: 200
            }
        })); 
    it("Should return the service profiles", integration({
        app,
        req: {
            method: "GET",
            url: "/service_profiles",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
/*     it("Should create the service profiles", integration({
        app,
        req: {
            method: "POST",
            url: "/service_profiles",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            },
            data: {
                service_profile: {
                    service_profile_name: "test2",
                    network_id: "57",
                    network_server_id: "8",
                    add_gw_metadata: true,
                    report_device_status_battery: false,
                    report_device_status_margin: false,
                    network_geo_location: false,
                    device_status_req_frequency: "0",
                    dr_min: "5",
                    dr_max: "4",
                }
            }
        },
        res: {
            status: 201
        }
    })); 
    it("Should return error (invalid service profile id lora)", integration({
        app,
        req: {
            method: "PUT",
            url: "/service_profiles/23",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            },
            data: {
                service_profile: {
                    service_profile_name: 'test_1',
                    add_gw_metadata: true,
                    report_device_status_battery: false,
                    report_device_status_margin: false,
                    network_geo_location: false,
                    device_status_req_frequency: 0,
                    dr_min: 5,
                    dr_max: 4
                }
            }
        },
        res: {
            status: 500
        }
    }));
    it("Should update the specified service profiles", integration({
        app,
        req: {
            method: "PUT",
            url: "/service_profiles/d29c52f3-4b94-426b-a41c-887bfdc7f0a1",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            },
            data: {
                service_profile: {
                    service_profile_name: 'test_1',
                    add_gw_metadata: true,
                    report_device_status_battery: false,
                    report_device_status_margin: false,
                    network_geo_location: false,
                    device_status_req_frequency: 0,
                    dr_min: 5,
                    dr_max: 4
                }
            }
        },
        res: {
            status: 200
        }
    })); 
    it("Should delete the specified service profiles", integration({
        app,
        req: {
            method: "DELETE",
            url: "/service_profiles/d29c52f3-4b94-426b-a41c-887bfdc7f0a1",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    }));  */
});

//-----------------------------------------------------DEVICE PROFILES----------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('DEVICE PROFILE API', function () {
    it("Should return the device profiles under the specified sub network", integration({
        //--Device profile get test
        app,
        req: {
            method: "GET",
            url: "/device_profiles/57",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 

    it("Should return the device profiles", integration({
        //--Device profile get test
        app,
        req: {
        method: "GET",
        url: "/device_profiles",
        headers: {
            Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
        }
        },
        res: {
        status: 200
        }
    })); 
});

//-----------------------------------------------------GATEWAY PROFILES---------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('SERVICE PROFILE API', function () {
    it("Should return the gateway profiles", integration({
        app,
        req: {
        method: "GET",
        url: "/gateway_profiles",
        headers: {
            Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
        }
        },
        res: {
        status: 200
        }
    })); 
});

//-----------------------------------------------------DEVICE UPLINK------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('DEVICE UPLINK API', function () {
            it("Should return the initial set of deivce uplink data", integration({
            app,
            req: {
                method: "GET",
                url: "/devices/uplink/initial",
                headers: {
                    Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
                }
            },
            res: {
                status: 200
            }
        })); 
    it("Should return the initial set of deivce uplink for the user", integration({
        app,
        req: {
            method: "GET",
            url: "/devices/uplink/initial/self",
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJuaWNob2xhc2Jvc3MxQGhvdG1haWwuY29tIiwidXNlcl9jbGFzcyI6IkZpc2hlciIsImlhdCI6MTU0Njk5MjQzOSwiZXhwIjoxNTk3MDM1NjM5fQ.Bp96asucx_iVPqkLho7SOR9qHVv8IzHGR44DFcGqIe0"
            }
        },
        res: {
            status: 200
        }
    })); 
    //----------------------
    let parameters = {
        device: [23],
        end_date: "2019-01-09 00:00:00",
        start_date: "2019-01-01 00:00:00",
        vessel: [30,30]
    }
    parameters = JSON.stringify(parameters); 
    let columns = ["Device Uplink ID", "Device ID", "Vessel ID", "Time Stamp", "Device EUI",
                "Device Name", "GPS Latitude", "GPS Longitude", "GPS Altitude"]
    it("Should return the filtered data for the fishers view", integration({
        app,
        req: {
            method: "GET",
            url: `/devices/uplink/parameters/${parameters}/columns/${columns}`,
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJuaWNob2xhc2Jvc3MxQGhvdG1haWwuY29tIiwidXNlcl9jbGFzcyI6IkZpc2hlciIsImlhdCI6MTU0Njk5MjQzOSwiZXhwIjoxNTk3MDM1NjM5fQ.Bp96asucx_iVPqkLho7SOR9qHVv8IzHGR44DFcGqIe0"
            }
        },
        res: {
            status: 200
        }
    })); 
    //----------------------
    parameters = {
        end_date: "2019-01-09 00:00:00",
        start_date: "2019-01-01 00:00:00",
        vessel: [30],
        sub_network: [140],
        vessel: [30],
        device: [23],

    }
    parameters = JSON.stringify(parameters); 
    columns = ["Device Uplink ID", "Device ID", "Sub-Network ID", "Vessel ID", "Time Stamp", "Sub Network Name", "Device EUI", "Device Name", "Gateway ID LoRa", "Gateway Name", "Rx Time", "Rx RSSI", "Tx LoRa SNR", "Gateway Latitude", "Gateway Longitude", "Gateway Altitude", "Tx Frequency", "Tx Data Rate", "ADR", "Frame Counter", "FPort", "Encoded Data", "GPS Latitude", "GPS Longitude", "GPS Altitude"]
    it("Should return the filtered data for the data users", integration({
        app,
        req: {
            method: "GET",
            url: `/devices/uplink/parameters/${parameters}/columns/${columns}`,
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
});


//-----------------------------------------------------GATEWAY STATS------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
describe('GATEWAY STATS API', function () {
    it("Should return the initial gateway statistics", integration({
        app,
        req: {
        method: "GET",
        url: "gateway_statistics/initial",
        headers: {
            Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
        status: 200
        }
    })); 
    let parameters = {
        gateway_id: [11],
        end_date: "2019-01-09 00:00:00",
        start_date: "2019-01-01 00:00:00",
    }
    parameters = JSON.stringify(parameters);
    let columns = ["Gateway Statistics ID", "Gateway ID", "Gateway ID LoRa", "Gateway IP Address", "Time Stamp", "Gateway Latitude", "Gateway Longitude",
        "Gateway Altitude", "Location Source", "Configeration Version", "Rx Packets Received", "Rx Packets Received Ok", "Tx Packets Received", "Tx Packets Emitted"]
    it("Should return the filtered gateway statistics", integration({
        app,
        req: {
            method: "GET",
            url: `gateway_statistics/parameters/${parameters}/columns/${columns}`,
            headers: {
                Authorization:
                    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
            }
        },
        res: {
            status: 200
        }
    })); 
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
                "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuaWNob2xhcy5qbWl0Y2hlbGxAb3V0bG9vay5jb20iLCJ1c2VyX2NsYXNzIjoiSW9UIE5ldHdvcmsgQWRtaW4iLCJpYXQiOjE1NDY5NzE2NzAsImV4cCI6MTU5OTkxMDg3MH0.PsNvL_RTlFwcnYL-CH-sW7xt7rv9-mjiGtobLWgAS_Q"
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