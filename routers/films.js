const express = require('express')
const filmsController = require('../controller/filmsController');
const router = express.Router();

// Index route - list all blogs
router.get('/', filmsController.index);

// Show route - display a single blog
router.get('/:id', filmsController.show);

// Delete route - remove a blog
router.delete('/:id', filmsController.destroy);

module.exports = router;
