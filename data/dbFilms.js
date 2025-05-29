//importo mysql2
const mysql = require('mysql2');

// Creo la connessione al database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'movies_db'
})

//Creo connession al db
connection.connect((err) => {
    if (err) {
        console.error('Errore di connessione al database:', err);
        return;
    }
    console.log('Connesso al database MySQL con successo!');
});


module.exports = connection;