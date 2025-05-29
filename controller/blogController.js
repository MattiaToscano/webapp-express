// Connessione al database
const connection = require('../data/dbBlog');

// List all blogs
const index = (req, res) => {
    const id = req.params.id;
    // Query per ottenere tutti i blog dal database
    connection.query('SELECT * FROM blogs', (err, results) => {
        if (err) {
            console.error('Errore nel recupero dei blog:', err);
            return res.status(500).json({ error: 'Errore nel recupero dei blog' });
        }
        res.json(results); // Invia i dati come JSON
    });
}


const show = (req, res) => {
    const id = req.params.id;
    // Query per ottenere un blog specifico dal database
    connection.query('SELECT * FROM blogs WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(`Errore nel recupero del blog con id ${id}:`, err);
            return res.status(500).json({ error: 'Errore nel recupero del blog' });
        }
        res.json(results[0]); // Invia il primo risultato come JSON
    });
}

const destroy = (req, res) => {
    const id = req.params.id;
    // Query per eliminare un blog specifico dal database
    connection.query('DELETE FROM blogs WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(`Errore nell'eliminazione del blog con id ${id}:`, err);
            return res.status(500).json({ error: 'Errore nell\'eliminazione del blog' });
        }
        res.json({ message: `Blog con id ${id} eliminato con successo` });
    });
}

module.exports = {
    index,
    show,
    destroy
};