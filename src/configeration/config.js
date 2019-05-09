//Holds all the confgeration data for the server
module.exports = {
    port: process.env.PORT || 3000,
    db:{    
        host     : 'remotemysql.com',
        user     : 'HrcXEFIUVL',
        password : '6kYWrvihEb',
        database: 'HrcXEFIUVL'
    },
    authentication:{
        jwtSecret: 'project'
    },
    email:{
        service: 'gmail', 
        auth: {
            user: 'lorawanconsole@gmail.com',
            pass: 'LoRaWAN1234'
        }

    }
}