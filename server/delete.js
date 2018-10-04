const bcrypt = require('bcrypt-nodejs');

 function encrypt(password){
try {bcrypt.genSalt(8, (error, result)=> {
    bcrypt.hash(password, result,null, (error, result)=> {
      console.log('1');
      return result;
    });
  });
}catch(error){
  console.log('we fucked up');
}
}

function compare(data, encrypted){
  try {bcrypt.compare(data,encrypted, (error, result) => {
    if(result ==true){
      console.log('Same DATA');
    }else{
      console.log('Different');
    }
  });
}catch(err){
  console.log('we fucked up');
}
}
const data = 'hello';


function a(data, en, callback){
  x = en(data);
  return callback(data, x);
}
console.log(a(data,encrypt, compare));