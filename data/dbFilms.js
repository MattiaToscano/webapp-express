//importo mysql2 e dotenv
const mysql = require('mysql2');
require('dotenv').config();

// Creo la connessione al database
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: process.env.DB_PORT || '3306',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'films'
});

// Test connessione
connection.connect((err) => {
    if (err) {
        console.error('❌ Errore connessione database:', err.message);
        console.log('Verifica:');
        console.log('- XAMPP MySQL è avviato?');
        console.log('- Password corretta nel file .env?');
        console.log('- Database "films" esiste?');
        return;
    }
    console.log('✅ Connesso al database MySQL con successo!');
});

module.exports = connection.promise();