var MongoClient = require('mongodb').MongoClient;

var connect = function() {
    MongoClient.connect("mongodb://admin:password@proximus.modulusmongo.net:27017/hu6Zaxit",
                    function (err,db) {
                        if(!err) {
                            console.log("We Are Connected");
                        }
                    });
}