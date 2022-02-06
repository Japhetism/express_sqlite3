var express = require("express")
var cors = require('cors');
var bodyParser = require("body-parser");
var db = require("./database.js")

var app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8080 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// Root endpoint
app.get("/", (req, res, next) => {
   res.json({"message":"Ok"})
});



// list all patients
app.get("/patients", (req, res, next) => {
  console.log("SELECT Patients.");
  let sql = `SELECT name, email, phone, caseNo FROM patients`;
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message":"success",
      "data":rows
    })
  });
});

// Create a new patient
app.post("/patients", (req, res, next) => {
    console.log(req.body)
    var errors=[]
    if (!req.body.name){
        errors.push("Name for patient not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        name: req.body.name,
        caseNo: req.body.caseNo,
        phone: req.body.phone,
        email: req.body.email
    }
    var sql ='INSERT INTO patients (name, caseNo, phone, email) VALUES (?,?,?,?)'
    var params =[data.name, data.caseNo, data.phone, data.email]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});

// list all treatments
app.get("/treatments/:caseNo", (req, res, next) => {
    console.log("SELECT Treatments.");
    let caseNo = req.params.caseNo;
    let sql = `SELECT * FROM treatments WHERE caseNo=${caseNo}`;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Create a new patient
app.post("/treatments", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("Name for treatment not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var data = {
        name: req.body.name,
        caseNo: req.body.caseNo,
        treatId: req.body.treatId,
        type: req.body.type,
        category: req.body.category,
        prescription: req.body.prescription,
        allergy: req.body.allergy,
        startDate: req.body.startDate
    }
    var sql ='INSERT INTO treatments (name, caseNo, treatId, type, category, prescription, allergy,startDate) VALUES (?,?,?,?,?,?,?,?)'
    var params =[data.name, data.caseNo, data.treatId, data.type, data.category, data.prescription, data.allergy, data.startDate]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});