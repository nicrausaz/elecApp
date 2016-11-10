// SCRIPTS FOR ADDENTRY.HTML
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


// SCRIPTS FOR SHOWENTRY

function getSelectedAttribute() {
    return document.getElementById("requestedAttribute").value;
}

function getSelectedExpression() {
    return document.getElementById("requestedExpression").value;
}

function showData() {
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    var dbErrorDiv = document.getElementById("dbErrors");
    var dbErrorMsg = "An error occured while trying to connecting to db";

    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {

        if (err) { dbErrorDiv.innerHTML = dbErrorMsg }

        var col = db.collection('user');

        //show all data
        col.find().toArray(function (err, results) {
            if (results != "") {
                document.getElementById("displayCollectionDiv").innerHTML = JSON.stringify(results);
            } else {
                document.getElementById("dbErrors").innerHTML = "No data were found";
            }
        });
    });
}

function showDataAccordingToSelection() {
    console.log("Looking for your request");
    var MongoClient = require('mongodb').MongoClient;

    var dbErrorDiv = document.getElementById("dbErrors");
    var dbErrorMsg = "An error occured while trying to connecting to db";

    var attribute = getSelectedAttribute();
    var expression = getSelectedExpression();

    console.log(attribute + " " + expression);

    MongoClient.connect("mongodb://localhost:27017/test", function (err, db) {

        if (err) { dbErrorDiv.innerHTML = dbErrorMsg }
        var col = db.collection('user');

        //show all data
        col.find({ "firstname": expression }).toArray(function (err, results) {
            if (results != "") {
                document.getElementById("displayCollectionDiv").innerHTML = JSON.stringify(results);
            } else {
                document.getElementById("dbErrors").innerHTML = "No data were found";
            }
        });
    });
}