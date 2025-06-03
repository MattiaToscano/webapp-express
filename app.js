const express = require("express"); //import express
const app = express(); //create app
const PORT = process.env.PORT || 3000; //port
const cors = require("cors"); //import cors

//router
const movieRouter = require("./routers/films");

//custom middleware
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const imagePathMiddleware = require("./middleware/imagePath");

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(imagePathMiddleware);

// Aggiungi questa riga per servire le immagini
const path = require('path');
app.use('/img', express.static(path.join(__dirname, 'img')));

//cors
app.use(cors({ origin: process.env.FE_APP }));



//entry point
app.get("/", (req, res) => {
    res.send("API MOVIES");
});

//use router
app.use("/api/movies", movieRouter);

//use custom middleware
app.use(notFound)
app.use(errorHandler)

//listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});