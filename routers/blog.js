const express = require('express')
const blogController = require('../controller/blogController');
const router = express.Router();

// Index route - list all blogs
router.get('/', blogController.index);

// Show route - display a single blog
router.get('/:id', blogController.show);

// Delete route - remove a blog
router.delete('/:id', blogController.destroy);

module.exports = router;
