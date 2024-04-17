const fs = require('fs')

// Fonction pour générer des données d'utilisateurs
function generateUsers(n) {
    const users = []
    for (let i = 0; i < n; i++) {
        const name = generateName()
        users.push({
            name, 
            age: generateAge(), 
            email: generateEmail(name), 
            createdAt: generateDate()
        })
    }

    return users
}

// Générez 100 utilisateurs et les stocker dans users.json
const users = generateUsers(100)
fs.writeFileSync('users.json', JSON.stringify(users, null, 2))

// fonction pour générer un nom complet
function generateName() {
    const firstNames = ["John", "Jane", "Sam", "Sue", "Bob", "Alice"]
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller"]

    // Prendre un prénom et un nom aléatoirement dans les tableaux
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

    // Retourner le nom complet
    return `${firstName} ${lastName}`
}

// Fonction pour générer un âge aléatoire entre 18 et 99 ans
function generateAge() {
    return Math.floor(Math.random() * (99 - 18 + 1)) + 18
}

// Fonction pour générer une adresse e-mail à partie du nom et prénom de l'utilisateur
function generateEmail(name) {
    // Prendre le prénom et le nom de l'utilisateur
    const firstName = name.split(" ")[0].toLowerCase()
    const lastName = name.split(" ")[1].toLowerCase()
    const domain = "gmail.com"

    // Retourner l'adresse e-mail complète
    return `${firstName}.${lastName}@${domain}`.toLowerCase()
}

// Fonction pour générer une date aléatoire
function generateDate() { 
    return new Date()
}


// Export de la fonction generateUsers
module.exports = generateUsers