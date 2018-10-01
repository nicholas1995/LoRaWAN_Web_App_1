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
    }
}