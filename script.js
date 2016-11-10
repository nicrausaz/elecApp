// GLOBAL SCRIPTS

var MongoClient = require('mongodb').MongoClient,
    test = require('assert');
// Connection url
var url = 'mongodb://localhost:27017/test';
// Connect using MongoClient
MongoClient.connect(url, function (err, db) {
    if (err) {
        var dbErrorDiv = document.getElementById("dbErrors");
        var dbErrorMsg = "An error occured while trying to connecting to db";
        dbErrorDiv.innerHTML = dbErrorMsg;
    } else {
        console.log("connected to DB");
        return col = db.collection('user');
    }
});



// SCRIPTS FOR ADDENTRY.HTML
function sendDatas() {
    // Insert data as documents
    col.insert([{ firstname: getUserFirstname(), name: getUserName() }], function (err, result) {
        test.equal(null, err);
    });
}

function printErrorMsg() {
    document.getElementById("errorSection").innerHTML = "Please enter values in both fields";
}

function checkData() {

    //TODO rewrite this function
    var userFirstname = document.getElementById("firstname").value;
    var userName = document.getElementById("name").value;

    (getUserFirstname() == "" || getUserFirstname() === null) ? error1 = 0 : error1 = 1;
    (getUserName() == "" || getUserName() === null) ? error2 = 0 : error2 = 1;
    return ((error1 && error2) ? sendDatas() : printErrorMsg());
}


// SCRIPTS FOR SHOWENTRY

function checkIfInputsEmpty() {

    console.log(getSelectedAttribute());
    console.log(getSelectedExpression());


    if ((getSelectedAttribute() == "notSelected") && (getSelectedExpression() == "")) {
        console.log("all data");
        showData();
        
    } else {
        console.log("not all data");
        showDataAccordingToSelection();
    }
    //TODO: Check if 2 input are filled
}

function getSelectedAttribute() {
    return document.getElementById("requestedAttribute").value;
}

function getSelectedExpression() {
    return document.getElementById("requestedExpression").value;
}

function getUserFirstname() {
    return userFirstname = document.getElementById("firstname").value;
}

function getUserName() {
    return userName = document.getElementById("name").value;
}

function getCollection(db) {
    return col = db.collection('user');
}

function checkResults(results) {
    if (results != "") {
        document.getElementById("displayCollectionDiv").innerHTML = JSON.stringify(results);
    } else {
        document.getElementById("dbErrors").innerHTML = "No data were found";
    }
}

function showData() {
    col.find().toArray(function (err, results) {
        checkResults(results);
    });
}

function showDataAccordingToSelection() {

    var attribute = getSelectedAttribute();
    var expression = getSelectedExpression();

    console.log("Looking for " + expression + " as " + attribute);

    //Show asked data
    col.find({ firstname: expression }).toArray(function (err, results) {
        checkResults(results);
    });
}

