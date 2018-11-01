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

const unique = function(sub_network_names, input){
    let i;
    let value = 1; //0 fail, 1 pass
    for(i=0; i< sub_network_names.length; i++){
      if(input ==sub_network_names[i]){
        return 0;
      }
    }
    return value;
  }
  console.log(unique(['SP 1', 'SP 2'], 'SP'));