const express = require("express");
const router = express.Router();

const filmsController = require("../controller/filmsController");

router.get("/", filmsController.index);
router.get("/:id", filmsController.show);

module.exports = router;