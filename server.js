var express = require("express");
var fileuploader = require("express-fileupload");
var mysql = require("mysql2");


var app = express();
app.use(express.urlencoded(true));
app.listen(2003, function () {
    console.log("Server Live");
});

app.use(express.static("js/public"));
app.use(fileuploader());

app.get("/", function (req, resp) {
    resp.sendFile(process.cwd() + "/js/public/main.html");
})
//-----------------Eth Link -----------------
// const Web3 = require('web3');

// const infuraUrl = 'https://mainnet.infura.io/v3/08fbbf1f46d24602b703301b084b2c3d'; // Replace with your Infura API key
// const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

// const contractABI = [0xd9145CCE52D386f254917e481eB44e9943F39138]; // Replace with your contract's ABI
// const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'; // Replace with your contract's address

// const contract = new web3.eth.Contract(contractABI, contractAddress);

// // Example of calling a contract function
// const result = contract.methods.someFunction().send({
//   from: '0xe68738600ACb8B821Edf83D9a3AD3eD87C211D34', // Replace with your wallet address
//   gas: 3000000,
// });

//console.log('Transaction result:', result);


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

app.get("/check-emailid", function (req, resp) {
    var em = req.query.emaili;
    dbCon.query("select * from users_cus where uname=?", [em], function (err, resultTable) {
        if (err == null) {
            if (resultTable.length == 1)
                resp.send("Already Taken");
            else
                resp.send("Available");
        }
        else
            resp.send(err);
    })
});


app.post("/profile_page_process", function (req, resp) {
    var picname = "nopic.jpg"
    if (req.files != null) {
        picname = req.files.ppic.name;
        var path = process.cwd() + "/public/uploads/" + picname;
        req.files.ppic.mv(path);
    }
    console.log(req.body);

    var emailid = req.body.ntxtei;
    var pname = req.body.ntxtn;
    var phno = req.body.ntxtcn;
    var address = req.body.ntxtad;
    var city = req.body.city;
    var dob = req.body.ntxtdob;
    var gender = req.body.ntxtg;
    var idname = "noid.jpg";
    if (req.files != null) {
        idname = req.files.ntxtid.name;
        var path = process.cwd() + "/public/uploads/" + idname;
        req.files.ntxtid.mv(path);
    }


    dbCon.query("insert into user_dat (eid,pname,phno,address,city,dob,gender,idname,picname) values (?,?,?,?,?,?,?,?,?)", [emailid, pname, phno, address, city, dob, gender, idname, picname], function (err) {
        if (err == null)
            resp.send("-----------------Recorded---------------");
        else
            resp.send(err);
    })

});

app.get("/record", function (req, resp) {
    var em = req.query.emaili;
    var pwd = req.query.pw;
    console.log(em);
    dbCon.query("insert into users_cus(uname,pass) values(?,?)", [em, pwd], function (err) {
        if (err == null) {
            resp.send("Account Created");
        }
        else
            resp.send(err);
    })
});



app.get("/login", function (req, resp) {
    var em = req.query.lemaili;
    var pwd = req.query.lpw;
    dbCon.query("select uid from users_cus where uname=? AND pass=?", [em, pwd], function (err, rsTable) {
        console.log(rsTable);
        if (err == null) {
            if (rsTable.length == 1) {
                    resp.send("1");
            }
            else
                resp.send("Invalid User Id/Password");
        }
        else
            resp.send(err.toString());
    })
});

app.get("/change-password", function (req, resp) {
    var em = req.query.emaili;
    var pwd = req.query.nwpw;
    dbCon.query("update users set pwd=? where email=?", [pwd, em], function (err) {
        if (err == null) {
            resp.send("Password Updated");
        }
        else
            resp.send(err);
    })
});


app.get("/check-password", function (req, resp) {
    var em = req.query.emaili;
    var pwd = req.query.owpw;
    dbCon.query("select * from users where email=? and pwd=?", [em, pwd], function (err, resTb) {
        if (err == null) {
            if (resTb.length == 1)
                resp.send("");
            else
                resp.send("Please Enter Correct Password");
        }
        else
            resp.send(err);
    })
});

app.get("/admin", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/db_admin.html");
})


app.get("/get-all-users",function(req,resp){
    dbCon.query("select * from users",function(err,resTb)
    {
        if(err==null)
        {
            resp.send(resTb);
        }
        else
        resp.send(err);
    })
});

app.get("/get-json", function (req, resp) {
    var em = req.query.emaili;
    dbCon.query("select coin from users_cus where uname=?", [em], function (err, resTableJSON) {
        if (err = null)
            resp.send(resTableJSON);
        else
            resp.send(err);
    })
});