const { MongoClient } = require('mongodb')

// Remplacez l'URL par votre propre chaîne de connexion MongoDB
const url = 'mongodb://172.20.0.2:27017'
const dbName = 'dataBase'

// Fonction pour initialiser la connexion
async function connectToDatabase() {
    if (dbInstance) {
        console.log('Réutilisation de la connexion existante à la base de données.')
        return dbInstance
    }

    try {
        const client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        await client.connect()
        console.log('Connecté à MongoDB.')

        const db = client.db(dbName)
        dbInstance = db
        return db
    } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB:', error)
        throw error
    }
}

module.exports = connectToDatabase
