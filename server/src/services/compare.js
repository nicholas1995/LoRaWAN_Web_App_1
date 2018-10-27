const network_db = require('./database/networks_db');


module.exports = {
    compare: function(lora, db){
        let i;
        let accounted_for =[];
        let added_lora = [];
        for(i=0; i<lora.length; i++){
            let j;
            if(db.length ==0){
                added_lora.push(i);
                console.log('Network Added');
            }
            for(j =0; j<db.length; j++){
                if(lora[i].id==db[j].id){
                    if(lora[i].name==db[j].name){
                        if(lora[i].display_name==db[j].display_name){
                            accounted_for.push(j);
                            console.log('Same Information');
                            break;
                        }else if(lora[i].display_name!=db[j].display_name){
                            network_db.update_network('display_name', lora[i].display_name, lora[i].ID).then(result =>{

                            }).catch(err => {
                                console.log(err);
                            })
                            accounted_for.push(j);
                            console.log('Different display name');
                            break;
                        }
                    }else if(lora[i].name!=db[j].name){
                        network_db.update_network('name', lora[i].name, lora[i].id).then(result => {

                        }).catch(err => {
                            console.log(err);
                        })
                        accounted_for.push(j);
                        console.log('Different name');
                        break;
                    }
                }
                else if(j ==(db.length-1)){
                    added_lora.push(i);
                    console.log('Network Added');
                }else if(lora[i].id!=db[j].id){
                }
            }

            
        }
        let k;
        for(k =0; k< added_lora.length; k++){
            network_db.create_network(lora[added_lora[k]].id, lora[added_lora[k]].name, lora[added_lora[k]].display_name).then(result => {

            }).catch(err => {
                console.log('err');
            })
            console.log('Inserted Added Network');
        }
        let l;
        for(l=0; l<db.length; l++){
            let index = accounted_for.indexOf(l);
            if(index ==-1){
                network_db.update_network('deleted', 1, db[l].id).then(result => {

                }).catch(err => {
                    console.log(err);
                })
                console.log('Network Deleted');
            }
        }
    }
}