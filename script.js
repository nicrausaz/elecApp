function sendDatas() {
    var MongoClient = require('mongodb').MongoClient,
        test = require('assert');
    // Connection url
    var url = 'mongodb://localhost:27017/test';
    // Connect using MongoClient
    MongoClient.connect(url, function (err, db) {
        console.log("connected to DB");
        // Create a collection we want to drop later
        var col = db.collection('user');
        var userFirstname = document.getElementById("firstname").value;
        var userName = document.getElementById("name").value;
        // Insert a bunch of documents
        col.insert([{ firstname: userFirstname, name: userName }], function (err, result) {
                test.equal(null, err);
            });
    });
}