const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000; // Usa la variabile d'ambiente

// Import dei router e middleware
const filmsRouter = require('./routers/films');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Middleware
app.use(cors({ origins: process.env.FE_APP })); // Configura CORS
app.use(express.json());

// Rotta di test
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Usa il router per i film invece della rotta hardcoded
app.use('/films', filmsRouter);

// Middleware per errori
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});