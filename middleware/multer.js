//importare multer

const multer = require('multer');

//dichiarare una variabile di configurazione del file storege
const storage = multer.diskStorage({
    destination: './img', //cartella di destinazione di file che sono le copertine dei film
    filename: (req, file, cb) => {
        //cb è una funzione di callback che prende due argomenti: errore e nome del file

        //definizione del nome del file che andremo ad uploadare
        const unique
    }