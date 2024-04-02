# TP NoSQL  

## Étape 1: Configuration de MongoDB en Mode Replica Set

**Démarrage du Replica Set avec Docker**

Suivez ces instructions pour configurer un environnement MongoDB Replica Set avec Docker. Vous pouvez utiliser docker-compose pour simplifier le processus.

1. Création d'un fichier `docker-compose.yml` pour définir les services MongoDB Replica Set.
2. J'identifie le nom ou l'ID de mon conteneur MongoDB 
3. Je me connecte à mon instance MongoDB : Utiliser la commande `docker exec -it 4be1fdb4388b /bin/bash` pour démarrer une session shell MongoDB interactive dans le conteneur choisi. 
4. Initiez le Replica Set : dans le shell MongoDB, j'utilise la commande `rs.initiate()` pour configurer et initier le Replica Set
5. Vérification : je m'assure que mon Replica Set fonctionne correctement en vous connectant via la CLI MongoDB `mongosh` et en exécutant une commande de base comme `rs.status()`.

## Étape 2: Génération de Fausses Données

1. Installation de Faker.js avec la commande `npm install faker`
2. Génération des fausses données : j'ai créé un fichier **generateData.js** où le code générer 100 documents d'utilisateurs avec des données aléatoires
3. Exécution du script : j'exécute mon script avec Node.js pour voir les données générées `node generateData.js`