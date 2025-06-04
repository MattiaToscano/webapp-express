const express = require("express");
const router = express.Router();
const connection = require("../data/dbFilms");
const filmsController = require("../controller/filmsController");

// Route per tutti i film
router.get("/", filmsController.index);

//Recupero il middleware per l'upload delle immagini
const upload = require("../middleware/multer");

// Route per le recensioni di un film specifico 
router.get('/:id/reviews', (req, res) => {
    const { id } = req.params;
    console.log('Fetching reviews for movie ID:', id);

    const query = 'SELECT * FROM reviews WHERE movie_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        console.log('Reviews found:', results.length);
        res.json(results);
    });
});

// Route per un film specifico 
router.get("/:id", filmsController.show);

//Rotta Store
router.post("/", upload.single("image"), filmsController.store);

module.exports = router;