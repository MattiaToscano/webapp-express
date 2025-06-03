//importo mysql2
const mysql = require('mysql2');

// Creo la connessione al database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'ciao',
    database: 'db_movie'
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database!");
});

module.exports = connection;