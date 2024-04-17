const { MongoClient } = require('mongodb')

// URL de connexion à la base de données
const url = "mongodb://127.0.0.1:27017"
const dbName = 'users'
let dbInstance

// Fonction pour initialiser la connexion
async function connectToDatabase() {
    if (dbInstance) {
        console.log('Réutilisation de la connexion existante à la base de données.')
        return dbInstance
    }

    try {
        // Connexion à la base de données
        const client = new MongoClient(url)

        await client.connect()
        console.log('Connecté à MongoDB.')

        const db = client.db(dbName)
        dbInstance = db
        return db
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de la connexion à MongoDB:', error)
        throw error
    }
}

module.exports = connectToDatabase
