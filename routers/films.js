const express = require("express");
const router = express.Router();

const filmsController = require("../controller/filmsController");

router.get("/", filmsController.index);
router.get("/:id", filmsController.show);

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching movie with ID:', id); // Debug

        const query = "SELECT * FROM movies WHERE id = ?";
        const [result] = await connection.execute(query, [id]);

        console.log('Database result:', result); // Debug

        if (result.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' }); // Aggiungi RETURN
        }

        res.json(result[0]);

    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

module.exports = router;