var mongo = require('mongodb');

var connection = function(){
    var db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost', // address
            27017, // port
            {} //server config
        ),
        {} // aditional config
    )

    return db;
}

module.exports = function(){
    return connection;
}