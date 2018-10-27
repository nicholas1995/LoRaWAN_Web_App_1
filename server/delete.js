/* //Testing The Databasse Network Compare 

const compare = require('./src/services/compare');
const network_db = require('./src/services/database/networks_db');


let lora = [{
    ID:'Bks',
    name: 'Replic',
    display_name: 'R'
},{
    ID:'Moy',
    name: 'First ',
    display_name: 'F'
},{
    ID:'M',
    name: 'Fast',
    display_name: 'r'
}];

network_db.get_networks().then( result => {
    console.log(result);
    compare.compare(lora, result);
}).catch(err => {
    console.log(err);
}) */

let x = '/gatewaysfg'
let y = x.lastIndexOf('/');
console.log(y);