const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('patients.db');

db.close();