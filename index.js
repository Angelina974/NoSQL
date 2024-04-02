const generateUsers = require('./generateData')
console.log("----------")
const express = require('express')
const app = express()
const connectToDatabase = require('./mongoConnection')

// API CRUD 
// GET /users
app.get('/users', async (req, res) => {
    const db = await connectToDatabase()
    const collection = db.collection('users')

    const users = await collection.find({}).toArray()
    res.json(users)
})

// GET /oldUsers
app.get('/oldUsers', (req, res) => {

})

// PUT /agingUsers
app.put('/agingUsers', (req, res) => {

})

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {

})



// Démarrer le serveur
const port = 3000
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`)
})