//Holds all the confgeration data for the server
module.exports = {
    port: '3000',
    db:{    
        host     : 'localhost',
        user     : 'root',
        password : '',
        database: 'application'
    },
    authentication:{
        jwebtSecret: 'project'
    },
    email:{
        service: 'gmail',
        auth: {
            user: 'lorawanconsole@gmail.com',
            pass: 'LoRaWAN1234'
        }

    }
}