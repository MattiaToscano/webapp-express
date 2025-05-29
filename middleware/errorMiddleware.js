
//Middleware per gestire le rotte non trovate (404)
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "La risorsa richiesta non è stata trovata"
    });
};
//Middleware per gestione errori generici (500)
const errorHandler = (err, req, res, next) => {
    console.error('Errore:', err);

    // Imposta status code a 500 se non è già stato impostato
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Si è verificato un errore interno al server",
    });
};

module.exports = {
    notFound,
    errorHandler
};