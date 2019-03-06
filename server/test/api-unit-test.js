var expect = require('chai').expect;
const integration = require("mocha-axios");
const api = require("../src/services/API/lora_app_server")
var assert = require('assert');

let organization, application, device, gateway, service_profile, device_profile, gateway_profile;
describe('LoRa App Server API Tests', function () { //LoRa app server test
    console.log('----------------------API TEST START----------------------')
    describe('Create Tests', function (){
        describe('Organization', function(){
            it('should return a 200 status code', async function () {
                let x = await api.create_organizations({
                    "organization":{
                        "canHaveGateways": true,
                        "displayName": `Test`,
                        "name": `Test` 
                    }
                })
                organization = x.data.id;
                assert.equal(x.status, 200);
            });   
        });   
        describe('Service Profile', function(){
            it('should return a 200 status code', async function () {
                let x = await api.create_service_profiles(    {"serviceProfile":
                { 'name': 'dfg',
                  'organizationID': `${organization}`,
                  'networkServerID': '8',
                  'addGWMetaData': true,
                  'reportDevStatusBattery': true,
                  'reportDevStatusMargin': true,
                  'nwkGeoLoc': true,
                  'devStatusReqFreq': 0,
                  'drMin': 0,
                  'drMax': 0 
            }} )
                service_profile = x.data.id;
                assert.equal(x.status, 200);
            });   
            describe('Application', function(){
                it('should return a 200 status code', async function () {
                    let x = await api.create_applications({
                        "application":{
                            "description": `Test`,
                            "name": `Test`,
                            "organizationID": `${organization}`,
                            "payloadCodec": `None`,
                            "serviceProfileID": `${service_profile}`
                        }
                    })
                    application = x.data.id;
                    assert.equal(x.status, 200);
                });   
            });
            describe('Device Profile', function(){
                it('should return a 200 status code', async function () {
                    let x = await api.create_device_profiles({ deviceProfile:
                        { 'networkServerID': '8',
                          'organizationID': `${organization}`,
                          'name': 'Test',
                          'macVersion': '1.0.0',
                          'regParamsRevision': 'A',
                          'maxEIRP': 0,
                          'supportsJoin': false,
                          'rxDelay1': 0,
                          'rxDROffset1': 0,
                          'rxDataRate2': 0,
                          'rxFreq2': 0,
                          'factoryPresetFreqs': [ '0' ],
                          'supportsClassB': false,
                          'classBTimeout': 0,
                          'pingSlotPeriod': 1,
                          'pingSlotDR': 0,
                          'pingSlotFreq': 0,
                          'supportsClassC': false,
                          'classCTimeout': 0 } })
                    device_profile = x.data.id;
                    assert.equal(x.status, 200);
                });   
            });  
            describe('Device', function(){
                it('should return a 200 status code', async function () {
                    let x = await api.create_devices({ device:
                        { name: 'Test',
                          devEUI: '4356345634563456',
                          description: 'dgfhfgh',
                          applicationID: `${application}`,
                          deviceProfileID: `${device_profile}`,
                          referenceAltitude: '5',
                          skipFCntCheck: true } })
                    device = x.data.id;                          
                    assert.equal(x.status, 200);
                });   
            }); 
            describe('Gateway Profile', function(){
                it('should return a 200 status code', async function () {
                    let x = await api.create_gateway_profiles({ gatewayProfile:
                        { channels: [ '345', '34' ],
                          name: 'Test',
                          networkServerID: '8' } })
                    gateway_profile = x.data.id;                          
                    assert.equal(x.status, 200);
                }); 
                describe('Gateway', function(){
                    it('should return a 200 status code', async function () {
                        let x = await api.create_gateways({ gateway:
                            { description: 'Test',
                              discoveryEnabled: false,
                              gatewayProfileID: `${gateway_profile}`,
                              id: '1111111111111111',
                              location:
                               { accuracy: '45',
                                 altitude: '456',
                                 latitude: '4356',
                                 longitude: '4356',
                                 source: 'GPS' },
                              name: 'Test',
                              networkServerID: '8',
                              organizationID: `${organization}` } })
                        assert.equal(x.status, 200);
                    });   
                }); 
            }); 
        }); 
    })
    describe('Get Tests', function (){ //Get Tests
        describe('Organization', function(){ //Organization
            it('should return a 200 status code', async function () {
                let x = await api.get_organizations({limit: 100})
                assert.equal(x.status, 200);
            });   
            it('should return 2 record', async function(){
                let x = await api.get_organizations({limit: 100})
                assert.equal(x.data.totalCount, 2)
            });
        })
        describe('Application', function(){ //Application
            it('should return a 200 status code', async function () {
                let x = await api.get_applications({limit: 100})
                assert.equal(x.status, 200);
            });   
            it('should return  record', async function(){
                let x = await api.get_applications({limit: 100})
                assert.equal(x.data.totalCount, 2)
            });
        })
        describe('Device', function(){//Device
            it('should return a 200 status code', async function () {
                let x = await api.get_devices({limit: 100})
                assert.equal(x.status, 200);
            });   
            it('should return 3 record', async function(){
                let x = await api.get_devices({limit: 100})
                assert.equal(x.data.totalCount, 4)
            });
        })
        describe('Gateway', function(){//Gateway
            it('should return a 200 status code', async function () {
                let x = await api.get_gateways({limit: 100})
                assert.equal(x.status, 200);
            });   
            it('should return 2 record', async function(){
                let x = await api.get_gateways({limit: 100})
                assert.equal(x.data.totalCount, 2)
            });
        })
        describe('Service Profile', function(){//Service Profile
            it('should return a 200 status code', async function () {
                let x = await api.get_service_profiles({limit: 100})
                assert.equal(x.status, 200);
            });   
            it('should return 2 record', async function(){
                let x = await api.get_service_profiles({limit: 100})
                assert.equal(x.data.totalCount, 2)
            });
        })
        describe('Device Profile', function(){//Device Profile
            it('should return a 200 status code', async function () {
                let x = await api.get_device_profiles({limit: 100})
                assert.equal(x.status, 200);
            });   
            it('should return 2 record', async function(){
                let x = await api.get_device_profiles({limit: 100})
                assert.equal(x.data.totalCount, 2)
            });
        })
        describe('Gateway Profile', function(){//Device Profile
            it('should return a 200 status code', async function () {
                let x = await api.get_gateway_profiles({limit: 100})
                assert.equal(x.status, 200);
            });   
            it('should return 2 record', async function(){
                let x = await api.get_gateway_profiles({limit: 100})
                assert.equal(x.data.totalCount, 2)
            });
        })
        describe('Network Server', function(){//Device Profile
            it('should return a 200 status code', async function () {
                let x = await api.get_network_servers({limit: 100})
                assert.equal(x.status, 200);
            });   
            it('should return 1 record', async function(){
                let x = await api.get_network_servers({limit: 100})
                assert.equal(x.data.totalCount, 1)
            });
        })
    });
});
