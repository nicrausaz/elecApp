


function sendDatas() {
    var MongoClient = require('mongodb').MongoClient,
        test = require('assert');

    // Connection url
    var url = 'mongodb://localhost:27017/test';

    // Connect using MongoClient
    MongoClient.connect(url, function(err, db) {
        console.log("connected to DB");

        // Create a collection
        var col = db.collection('user');

        //create vars
        var userFirstname = document.getElementById("firstname").value;
        var userName = document.getElementById("name").value;

        // Insert data as documents
        col.insert([{ firstname: userFirstname, name: userName }], function(err, result) {
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
    var MongoClient = require('mongodb').MongoClient,
        test = require('assert');

    // Connection url
    var url = 'mongodb://localhost:27017/test';

    // Connect using MongoClient
    MongoClient.connect(url, function(err, db) {
        console.log("connected to DB");

        // Create a collection
        var col = db.collection('user');

        // print all documents in a div (TODO: print document in table row, then add buttons for editing)
        console.log(col.find());
        document.getElementById("displayCollectionDiv").innerHTML = col.find(["firstname", "name"]);
    });

}