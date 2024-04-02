// Fonction pour générer des données d'utilisateurs
function generateUsers(n) {
    const users = []
    for (let i = 0; i < n; i++) {
        users.push({
            name: faker.name.findName(), // Génère un nom complet
            age: faker.datatype.number({ min: 18, max: 100 }), // Génère un âge aléatoire entre 18 et 100
            email: faker.internet.email(), // Génère une adresse e-mail
            createdAt: faker.date.past(2).toISOString() // Génère une date dans les 2 dernières années
        });
    }

    return users
}

// Export de la fonction generateUsers
module.exports = generateUsers

// Affichage des utilisateurs dans la console
console.log(users)
