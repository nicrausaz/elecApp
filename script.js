
function sendDatas() {

    var MongoClient = require('mongodb').MongoClient,
        test = require('assert');

    // Connection url
    var url = 'mongodb://localhost:27017/test';

    // Connect using MongoClient
    MongoClient.connect(url, function (err, db) {
        console.log("connected to DB");

        // Create a collection
        var col = db.collection('user');

        //create vars
        var userFirstname = document.getElementById("firstname").value;
        var userName = document.getElementById("name").value;

        // Insert data as documents
        col.insert([{ firstname: userFirstname, name: userName }], function (err, result) {
            test.equal(null, err);
        });
    });
}

function printErrorMsg() {
    document.getElementById("errorSection").innerHTML = "Please enter values in both fields";
}

function checkData() {
    var userFirstname = document.getElementById("firstname").value;
    var userName = document.getElementById("name").value;

    (userFirstname == "" || userFirstname === null) ? error1 = 0 : error1 = 1;
    (userName == "" || userName === null) ? error2 = 0 : error2 = 1;
    return ((error1 && error2) ? sendDatas() : printErrorMsg());
}

function showData() {
    var MongoClient = require('mongodb').MongoClient;



    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {
        if (err) { return console.dir(err); } //add error msg here

        var collection = db.collection('user');
        var docs = [{ firstname: "Nicolas", name: "Crausaz" }];

        collection.insert(docs, function (err, result) {

            collection.find().toArray(function (err, items) { });

            var stream = collection.find({ firstname: { $ne: 2 } }).stream();
            console.dir(stream.on("data", function (item) { }));
            console.dir(stream.on("end", function () { }));

            //collection.findOne({ firstname: "Nicolas" }, function (err, item) { });

        });
    });

}