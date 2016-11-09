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
        // Insert a bunch of documents
        col.insert([{ a: 1, b: 1 }
            , { a: 2, b: 2 }, { a: 3, b: 3 }
            , { a: 4, b: 4 }], { w: 1 }, function (err, result) {
                test.equal(null, err);
            });
    });
}