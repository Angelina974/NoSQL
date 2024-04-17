const generateUsers = require('./generateData')
const {
    ObjectId
} = require('mongodb')
const express = require('express')
const app = express()

// Connexion à la base de données
const connectToDatabase = require('./database')

// API CRUD 
// GET /users
// Récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
    const db = await connectToDatabase()
    const collection = db.collection('users')

    // Récupérer tous les utilisateurs
    const users = await collection.find({}).toArray()
    res.json(users)
})

// GET /oldUsers
// Récupérer les utilisateurs de plus de 30 ans
app.get('/oldUsers', async (req, res) => {
    // Connexion à la base de données
    const db = await connectToDatabase()
    const collection = db.collection('users')

    // Récupérer les utilisateurs de plus de 30 ans
    const users = await collection.find({
        age: {
            $gte: 30
        }
    }).toArray()
    // Renvoyer les utilisateurs en json
    res.json(users)
})

// PUT /agingUsers
// Fait vieillir tous les utilisateurs de cinq ans
app.put('/agingUsers', async (req, res) => {
    const db = await connectToDatabase()
    const collection = db.collection('users')

    // Fait vieillir tous les utilisateurs de cinq ans
    await collection.updateMany({}, {
        $inc: {
            age: 5
        }
    })
    // Renvoie une réponse
    res.send('Les utilisateurs ont vieilli de cinq ans.')
})

// DELETE /users/:id
// Supprimer un utilisateur par son ID
app.delete('/users/:id', async (req, res) => {
    // Récupérer l'ID de l'utilisateur
    const id = req.params.id
    const idObject = new ObjectId(id)
    // Connexion à la base de données
    const db = await connectToDatabase()
    const collection = db.collection('users')

    // Supprimer l'utilisateur par son ID
    await collection.deleteOne({
        _id: idObject
    })
    // Renvoie une réponse
    res.send('Utilisateur supprimé.')
})


// Démarre le serveur sur le port 3000
const port = 3000
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`)
})