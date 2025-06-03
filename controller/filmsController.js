// Connessione al database
const connection = require('../data/dbFilms');

// Lista di tutti i film
const index = async (req, res) => {
    try {
        console.log('📋 Recupero lista film...');
        const [films] = await connection.query('SELECT * FROM film');

        res.json({
            success: true,
            count: films.length,
            data: films
        });
    } catch (error) {
        console.error('❌ Errore recupero film:', error);
        res.status(500).json({
            success: false,
            error: 'Errore nel recupero dei film',
            details: error.message
        });
    }
};

// Mostra un singolo film con recensioni e media
const show = async (req, res) => {
    const id = req.params.id;

    try {
        console.log(`🎬 Recupero film ID: ${id}`);

        // Ottieni il film
        const [films] = await connection.query('SELECT * FROM film WHERE id = ?', [id]);

        if (films.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Film non trovato'
            });
        }

        const film = films[0];

        // Ottieni le recensioni
        const [recensioni] = await connection.query(
            'SELECT * FROM recensioni WHERE film_id = ?',
            [id]
        );

        film.recensioni = recensioni;

        // Calcola la media dei voti
        let mediaVoti = 0;
        if (recensioni.length > 0) {
            const sommaVoti = recensioni.reduce((acc, rec) => acc + rec.voto, 0);
            mediaVoti = parseFloat((sommaVoti / recensioni.length).toFixed(1));
        }

        film.mediaVoti = mediaVoti;
        film.numeroRecensioni = recensioni.length;

        console.log(`✅ Film trovato: ${film.titolo} (Media: ${mediaVoti})`);

        res.json({
            success: true,
            data: film
        });

    } catch (error) {
        console.error('❌ Errore recupero film:', error);
        res.status(500).json({
            success: false,
            error: 'Errore nel recupero del film',
            details: error.message
        });
    }
};

module.exports = {
    index,
    show
};