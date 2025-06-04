const { status } = require("init");
const connection = require("../data/dbFilms");

const index = (req, res) => {
    // Specifica esplicitamente i campi da selezionare
    const sql = 'SELECT id, title, director, genre, release_year, abstract, image, created_at, updated_at FROM movies';

    connection.query(sql, (err, moviesResult) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: "Database Query Failed: " + err.message });
        }

        console.log('=== DATABASE RESULTS ===');
        console.log('Number of movies:', moviesResult.length);
        console.log('First movie raw data:', moviesResult[0]);
        console.log('First movie image field:', moviesResult[0]?.image);

        const movies = moviesResult.map((movie) => {
            console.log(`Processing movie ID ${movie.id}: image = "${movie.image}"`);

            return {
                ...movie,
                image: movie.image ? `/images/${movie.image}` : null,
                image_url: movie.image ? `/images/${movie.image}` : null
            }
        })

        res.json(movies);
    })
}

const show = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT id, title, director, genre, release_year, abstract, image, created_at, updated_at FROM movies WHERE id = ?";

    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const movie = results[0];

        console.log('=== SINGLE MOVIE DEBUG ===');
        console.log('Raw movie data:', movie);
        console.log('Movie image field:', `"${movie.image}"`);
        console.log('Image field type:', typeof movie.image);

        movie.image_url = movie.image ? `/images/${movie.image}` : null;
        movie.image_full_path = movie.image ? `${req.protocol}://${req.get('host')}/images/${movie.image}` : null;

        res.json({ data: movie });
    });
};

//Metodo store

const store = (req, res, next) => {
    //Recupero i dati dal body della richiesta
    const { title, director, genre, release_year, abstract } = req.body;

    //Creo la query di inserimento
    const sql = "INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)";

    const imageName = req.file.filename; //Recupero il nome del file caricato

    //Eseguo la query - aggiungi imageName come sesto parametro
    connection.query(sql, [title, director, genre, release_year, abstract, imageName], (err, results) => {
        if (err) return next('Errore caricamento nuovo film');

        res.status(201).json({
            status: "success",
            message: "Film inserito correttamente",
        });
    });
};



module.exports = {
    index,
    show,
    store
}