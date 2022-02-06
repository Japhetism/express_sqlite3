var sqlite3 = require('sqlite3').verbose()

// open the database
let db = new sqlite3.Database('patients.db', (err) => {
  if (err) {
    console.error(err.message);
    throw err
  }
  console.log('Connected to the patient database.');
});


// create table 'patient'
const sql2='CREATE TABLE patients(caseNo text, name text, email text, phone text)';
db.run(sql2, (err) => {
  if (err) {
    // Table already created 
    console.log('Table already created.');
  }else{
    console.log('Table created.');
  }
});


// create table 'treatment'
const sql='CREATE TABLE treatments(caseNo text, name text, treatId text, type text, category text, startDate text, prescription text, allergy text)';
db.run(sql, (err) => {
  if (err) {
    // Table already created 
    console.log('Table already created.');
  }else{
    console.log('Table created.');
  }
});

// export as module, called db
module.exports = db
