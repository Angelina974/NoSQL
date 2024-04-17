- [TP NoSQL  s](#tp-nosql--s)
  - [Étape 1: Configuration de MongoDB en Mode Replica Set](#étape-1-configuration-de-mongodb-en-mode-replica-set)
  - [Étape 2: Génération de Fausses Données](#étape-2-génération-de-fausses-données)
  - [Étape 3: Manipulations via la CLI MongoDB](#étape-3-manipulations-via-la-cli-mongodb)
  - [Étape 4: Automatisation avec Javascript](#étape-4-automatisation-avec-javascript)
  - [La différence entre la CLI MongoDB et le script](#la-différence-entre-la-cli-mongodb-et-le-script)
    - [CLI MongoDB :](#cli-mongodb-)
    - [Script avec routes (NodeJs et Express)](#script-avec-routes-nodejs-et-express)
    - [Conclusion](#conclusion)
  - [Problème rencontré](#problème-rencontré)

# TP NoSQL  s

## Étape 1: Configuration de MongoDB en Mode Replica Set

**Démarrage du Replica Set avec Docker**

Suivre ces instructions pour configurer un environnement MongoDB Replica Set avec Docker. On peut utiliser docker-compose pour simplifier le processus.

1. **Création d'un fichier :** `docker-compose.yml` pour définir les services MongoDB Replica Set.
2. **Identifier le nom ou l'ID du conteneur MongoDB :** une fois que l'ID du conteneur est trouvé avec la commande `docker ps -a` par exemple, je le lance : `docker start <ID du conteneur>`
3. **Connexion à l'instance MongoDB :** Utiliser la commande `docker exec -it <ID du conteneur> /bin/bash` pour démarrer une session shell MongoDB interactive dans le conteneur choisi. 
4. **Initiez le Replica Set :** dans le shell MongoDB, j'utilise la commande `rs.initiate()` pour configurer et initier le Replica Set
5. **Vérification :** je m'assure que mon Replica Set fonctionne correctement en me connectant via la CLI MongoDB `mongosh` et en exécutant une commande de base comme `rs.status()` qui me renvoie :
```
Current Mongosh Log ID: 660d1238679b2f7d32db83af
Connecting to:          mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.0
Using MongoDB:          7.0.7
Using Mongosh:          2.2.0
```

## Étape 2: Génération de Fausses Données

1. **Installation des packages** : Pour ce TP j'ai utilisé NodeJS et Express alors il faudra également installer leur packages avec ces commandes : `npm install node` et `npm install express` afin de pouvoir lancer le projet.
2. **Installation de Faker.js** avec la commande `npm install faker`, faker devrait être installé

> PS : pour cette partie je n'ai pas pu le faire avec faker car j'avais des problèmes de fichier manquant lors de son instalation (le fichier index.js ne s'installer pas donc impossible d'utiliser faker). J'ai donc fait un script pour génerer aléatoirement de fausses données --> fichier `generateData.js`.

1. **Génération des fausses données :** le fichier `generateData.js` où se trouve le code qui permet de générer 100 utilisateurs avec des données aléatoires. Ensuite pour pouvoir écrire les données dans un JSON j'ai installé le package **fs** avec la commande suivante : `npm install fs`.
2. **Exécution du script :** j'exécute mon script avec Node.js pour voir les données générées `node generateData.js`

## Étape 3: Manipulations via la CLI MongoDB

1. **Insertion des Données :** j'insére les données générées dans ma collection `users` en utilisant la CLI MongoDB avec cette commande :
`mongoimport --db dataBase --collection users --file data/users.json --jsonArray`
2. **Requêtes de base :** opérations CRUD à travers la CLI MongoDB

  - Commande pour récupérer tous les utilisateurs : 
`db.users.find()`
Réponse : il me renvoie tous les utilisateurs 

  - Commande pour récuperer les utilisateurs de plus de 30 ans :
`db.users.find({age: {$gt: 30}})`
Réponse : il me renvoie tous les utilisateurs qui ont plus de 30 ans

  - Commande pour vieilir tous les utilisateurs de 5 ans : 
`db.users.updateMany({}, {$inc: {age: 5}})`
Réponse : 
```
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 100,
  modifiedCount: 100,
  upsertedCount: 0
}
```

  - Commande pour supprimer un user dans la CLI Mongo :
`db.users.deleteOne({_id: ObjectId('660c1e48219dd8de18845b34')})`
Réponse : 
`{ acknowledged: true, deletedCount: 1 }`


## Étape 4: Automatisation avec Javascript

1. J'installe le package mongodb : `npm install mongodb` et l'importe dans mon fichier avec la ligne de commande `const { ObjectId } = require('mongodb')`
2. Je créé un script qui éxécute les mêmes opérations CRUD, le script se trouve dans **index.js**.
3. Et maintenant je peux lancer les requêtes directement dans mon navigateur. Par exemple je vais à la route `localhost:3000/users`, qui va me renvoyer une liste de tous les utilisateurs de la base de données.

## La différence entre la CLI MongoDB et le script  

### CLI MongoDB : 
- **Direct et immédiat :** permet d'interagir directement avec la base de données MongoDB. Les opérations sont exécutées de manière immédiate, ce qui est utile pour les tests, la maintenance, ou l'exécution de requêtes. 
- **Idéal pour l'Administration :** très pratique pour la gestion de la base de données.
- **Moins Sécurisé pour les Applications Utilisateur :** Exécuter des opérations CRUD directement depuis la CLI dans un contexte utilisateur (par exemple, à partir d'une application client) n'est pas pratique ni sécurisé.

### Script avec routes (NodeJs et Express)
- **Abstraction et contrôle :** L'exécution des opérations CRUD via des routes dans une application serveur offre une couche d'abstraction qui permet de gérer la logique métier.
- **Sécurité :** Cette méthode permet de sécuriser les accès à la base de données en contrôlant les requêtes entrantes, en authentifiant les utilisateurs, et en validant les données avant de les traiter.
- **Accessibilité :** Permet à des applications clientes (web, mobiles, autres services) d'interagir avec la base de données via HTTP ou d'autres protocoles sans avoir besoin d'accéder directement à la base de données. 

### Conclusion
- **Utilisez la CLI MongoDB** pour les tâches d'administration directe, le débogage, et les manipulations occasionnelles de données.
- **Optez pour les scripts** avec routes pour construire des applications interactives et sécurisées qui exposent des opérations CRUD à des clients ou des services consommateurs, en encapsulant la logique métier et en contrôlant l'accès aux ressources de données.

## Problème rencontré 

Lorsque MongoDB est exécuté dans Docker sur un système Linux (ou dans le sous-système Linux sur Windows) et que que l'on souhaite se connecter à MongoDB depuis notre hôte Windows, utiliser localhost ou l'adresse IP interne du conteneur (172.20.0.2 dans mon cas) ne fonctionne pas en raison de l'isolation réseau entre Docker et l'hôte Windows. 