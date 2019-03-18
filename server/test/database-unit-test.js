/* 
var assert = require('assert');

const db_network = require('../src/services/database/networks_db')

let organization_data = {
    network_id: 2,
    network_name : 'Test', 
    network_display_name : 'Test', 
    network_can_have_gateways : true
}
let organization_update_data = {
    network_id: 2,
    network_name : 'Test update', 
    network_display_name : 'Test update', 
    network_can_have_gateways : false
}
describe('Organization',  function(){
    console.log('----------------------API TEST START----------------------')
    describe('Organization', function(){
        it('should create a record', async function () {
             await db_network.create_network(organization_data.network_id, organization_data.network_name, organization_data.network_display_name, organization_data.network_can_have_gateways)
            assert.equal(1, 1);
        });   
        it('should return 1 current records', async function () {
            let x = await db_network.get_networks()
            assert.equal(x.length, 1);
        });   
        it('should return 1 deleted records', async function () {
            let x = await db_network.get_networks_not_deleted()
            assert.equal(x.length, 1);
        });  
        it('should update all the attributes of the organization', async function () {
            await db_network.update_networks_all_parameters(organization_update_data, organization_update_data.network_id)
            assert.equal(0, 0);
        });
        it('should update the organization deleted flag to high', async function () {
            await db_network.update_network('network_deleted', 1, 2)
            assert.equal(0, 0);
        });  
        it('should return 0 deleted records', async function () {
            let x = await db_network.get_networks_not_deleted()
            assert.equal(x.length, 0);
        });  
    });   


}); */