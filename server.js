var express = require("express");
var fileuploader = require("express-fileupload");
var mysql = require("mysql2");

var app = express();
app.use(express.urlencoded(true));
app.listen(2003, function () {
    console.log("Server Live");
});

app.use(express.static("public"));
app.use(fileuploader());

app.get("/", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/index.html");
})

//-----------------DB Config-----------------
var dbConfig = {
    host: "127.0.0.1",
    user: "root",
    password: "@Kas21mas",
    database: "flipkart",
    dateStrings:true
}

var dbCon = mysql.createConnection(dbConfig);
dbCon.connect(function (jasoos) {
    if (jasoos == null)
        console.log("Connected to Database...");
    else
        console.log("Connection Failed :(");
});