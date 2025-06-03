
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Configurazione CORS
app.use(cors({
    origin: process.env.FE_APP
}));

// Importa i middleware e router
const filmRoutes = require('./routers/films');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Rotta base
app.get('/', (req, res) => {
    res.json({
        message: 'API Films funzionante!',
        endpoints: {
            films: '/films',
            film_detail: '/films/:id'
        }
    });
});

// Router dei film
app.use('/films', filmRoutes);

// Endpoint per la lista dei film
app.get('/api/movies', (req, res) => {

    const movies = [
        { id: 1, title: "Inception", author: "Christopher Nolan", abstract: "Un thriller sci-fi", image: "https://via.placeholder.com/300x450" },
        { id: 2, title: "The Matrix", author: "Wachowski Sisters", abstract: "Realtà virtuale", image: "https://via.placeholder.com/300x450" },
        { id: 3, title: "Interstellar", author: "Christopher Nolan", abstract: "Viaggio spaziale", image: "https://via.placeholder.com/300x450" }
    ];
    res.json(movies);
});


// Middleware per errori
app.use(notFound);
app.use(errorHandler);

// Avvia il server
app.listen(port, () => {
    console.log(`🚀 Server avviato su http://localhost:${port}`);
    console.log(`📊 Database: ${process.env.DB_NAME}`);
});