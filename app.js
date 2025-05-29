const express = require('express');
const app = express();
const port = 3000;

//importo il router e i middleware
const filmRoutes = require('./routers/films');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


app.use(express.json());

//Definisco gli asset statici
app.use(express.static('public'));

//Inserisco la rotta base
app.get('/', (req, res) => {
    console.log('Richiesta ricevuta');
    res.send('Ciao, se mi leggi va tutto bene!');
})


app.use('/films', filmRoutes);

// Middleware per le rotte inesistenti
app.use(notFound);

// Middleware per la gestione errori
app.use(errorHandler);

//Metto il server in ascolto sulla porta 3000
app.listen(port, () => {
    console.log(`Il server è in ascolto sulla porta http://localhost:${port}`);
})