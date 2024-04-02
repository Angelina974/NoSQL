const express = require('express')
const app = express()
// Import de Faker
const faker = require('faker');
const generateUsers = require('./generateData');

// Définir les routes et les middleware ici

generateUsers(20)


// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`)
})