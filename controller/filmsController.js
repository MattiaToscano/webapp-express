// Connessione al database
const connection = require('../data/dbFilms');

// Lista di tutti i film
const index = (req, res) => {
    try {
        const [films] = connection.query('SELECT * FROM film');
        res.json(films);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'Errore nel recupero dei film' });
    }
};

// Mostra un singolo film con recensioni e media
const show = (req, res) => {
    const id = req.params.id;
    try {
        const [films] = connection.query('SELECT * FROM film WHERE id = ?', [id]);

        // Film non trovato
        if (films.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }

        const film = films[0];

        // Recensioni
        const [recensioni] = connection.query('SELECT * FROM recensioni WHERE film_id = ?', [id]);
        film.recensioni = recensioni;

        // Media recensioni
        let media = 0;
        if (recensioni.length > 0) {
            const somma = recensioni.reduce((acc, rec) => acc + rec.voto, 0);
            media = somma / recensioni.length;
        }
        film.mediaVoti = parseFloat(media.toFixed(1));

        res.json(film);
    } catch (error) {
        console.error('Errore:', error);
        res.status(500).json({ error: 'Errore nel recupero del film' });
    }
};

module.exports = {
    index,
    show
};