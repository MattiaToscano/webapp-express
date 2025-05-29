//importo mysql2
const mysql = require('mysql2');

// Creo la connessione al database utilizzando le variabili d'ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || '3306',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'films'
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