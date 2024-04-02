const fs = require('fs')
// Fonction pour générer des données d'utilisateurs
function generateUsers(n) {
    const users = []
    for (let i = 0; i < n; i++) {
        const name = generateName()
        users.push({
            name, // Génère un nom complet
            age: generateAge(), // Génère un âge aléatoire entre 18 et 100
            email: generateEmail(name), // Génère une adresse e-mail
            createdAt: generateDate() 
        })
    }

    return users
}

// Générez 100 utilisateurs et les stocker dans users.json
const users = generateUsers(100)
fs.writeFileSync('users.json', JSON.stringify(users, null, 2))

function generateName() {
    const firstNames = ["John", "Jane", "Sam", "Sue", "Bob", "Alice"]
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller"]

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

    return `${firstName} ${lastName}`
}

function generateAge() {
    return Math.floor(Math.random() * (99 - 18 + 1)) + 18 
}

function generateEmail(name) {
    const firstName = name.split(" ")[0].toLowerCase()
    const lastName = name.split(" ")[1].toLowerCase()
    const domain = "gmail.com"

    return `${firstName}.${lastName}@${domain}`.toLowerCase()
}

function generateDate() {
    // Random date 
    return new Date()
}


// Export de la fonction generateUsers
module.exports = generateUsers

console.log(generateUsers(20))
