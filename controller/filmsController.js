// Connessione al database
const connection = require('../data/dbFilms');

// Lista di tutti i film
const index = (req, res) => {
    try {
        // Query per ottenere tutti i film dal database
        const [results] = connection.query('SELECT * FROM film');
        res.json(results); // Invia i dati come JSON
    } catch (error) {
        console.error('Errore nel recupero dei film:', error);
        res.status(500).json({ error: 'Errore nel recupero dei film' });
    }
};

// Mostra un singolo film con recensioni
const show = (req, res) => {
    const id = req.params.id;
    try {
        // Query per ottenere un film specifico dal database
        const [filmResults] = connection.query('SELECT * FROM film WHERE id = ?', [id]);

        if (filmResults.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }

        const film = filmResults[0];

        // Ottieni le recensioni associate al film
        const [recensioni] = connection.query('SELECT * FROM recensioni WHERE film_id = ?', [id]);

        // Aggiungi le recensioni al risultato
        film.recensioni = recensioni;

        res.json(film);
    } catch (error) {
        console.error(`Errore nel recupero del film con id ${id}:`, error);
        res.status(500).json({ error: 'Errore nel recupero del film' });
    }
};

module.exports = {
    index,
    show,
};