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
    col.insert([{ firstname: getUserFirstname(), lastname: getUserName() }], function (err, result) {
        test.equal(null, err);
    });
}

function checkFormData() {

    //TODO rewrite this function
    var userFirstname = document.getElementById("firstname").value;
    var userName = document.getElementById("lastname").value;

    (getUserFirstname() == "" || getUserFirstname() === null) ? error1 = 0 : error1 = 1;
    (getUserName() == "" || getUserName() === null) ? error2 = 0 : error2 = 1;
    return ((error1 && error2) ? sendDatas() : showErrorMsg("errorSection", "Please enter values in both fields"));
}


// SCRIPTS FOR SHOWENTRY

function checkIfInputsEmpty() {

    if ((getSelectedAttribute() == "notSelected") && (getSelectedExpression() == "")) {
        clearErrorMsg("dbErrors");
        // will show all collection
        showAllData();

    } else if ((getSelectedAttribute() == "notSelected") || (getSelectedExpression() == "")) {
        //will show error msg because 1 field is empty
        clearCollectionDiv();
        showErrorMsg("dbErrors", "Please enter values in both fields");
    } else {
        clearErrorMsg("dbErrors");
        // will show requested data from collection
        getSelectedAttribute() == "firstname" ? showDataAccordingToFirstname() : showDataAccordingToLastname();
        console.log("not all data");
    }
}

function getSelectedAttribute() {
    // TODO: implement it back next refactor
    return document.getElementById("requestedAttribute").value;
}

function getSelectedExpression() {
    return document.getElementById("requestedExpression").value;
}

function getUserFirstname() {
    return userFirstname = document.getElementById("firstname").value;
}

function getUserName() {
    return userName = document.getElementById("lastname").value;
}

function getCollection(db) {
    return col = db.collection('user');
}

function showErrorMsg(errorZone, errorMsg) {
    document.getElementById(errorZone).innerHTML = errorMsg;
}

function clearErrorMsg(errorZone) {
    document.getElementById(errorZone).innerHTML = "";
}

function clearCollectionDiv() {
    document.getElementById("displayCollectionDiv").innerHTML = "";
    console.log("cleared");
}

function checkResults(results) {
    if (results != "") {
        document.getElementById("displayCollectionDiv").innerHTML = JSON.stringify(results);
    } else {
        showErrorMsg("displayCollectionDiv", "No data were found");
    }
}

function showAllData() {

    clearCollectionDiv();
    col.find().toArray(function (err, results) {
        checkResults(results);
    });
}

function showDataAccordingToFirstname() {

    var expression = getSelectedExpression();
    console.log("Looking for " + expression + " as firstname");

    clearCollectionDiv();

    col.find({ "firstname": expression }).toArray(function (err, results) {
        checkResults(results);
    });
}

function showDataAccordingToLastname() {

    var expression = getSelectedExpression();
    console.log("Looking for " + expression + " as lastname");

    clearCollectionDiv();

    col.find({ "lastname": expression }).toArray(function (err, results) {
        checkResults(results);
    });
}

function createTable() { }