//importo mysql2 e dotenv
const mysql = require('mysql2');


// Creo la connessione al database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || '3306',
    password: process.env.DB_PASSWORD || 'ciao',
    database: process.env.DB_NAME || 'db_movie'
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database!");
});



module.exports = connection;