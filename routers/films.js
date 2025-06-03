const express = require('express')
const filmsController = require('../controller/filmsController');
const router = express.Router();

// Rotta index - elenca tutti i films
router.get('/', filmsController.index);

// Rotta show - mostra un singolo film
router.get('/:id', filmsController.show);

// Rotta di cancellazione - rimuove un film
// router.delete('/:id', filmsController.destroy);

module.exports = router;
