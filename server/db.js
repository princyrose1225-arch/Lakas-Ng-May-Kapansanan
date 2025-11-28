const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",      // your XAMPP/Laragon username
    password: "",       // your MySQL password (if any)
    database: "userdb",
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

module.exports = db;
