[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/LRm4bhIP)
# CYTech 2023 Cloud Front feast - Gestionnaire d'événements

## Consignes pour la création de l'application notée

### Synthèse

- date de rendu : 06 décembre 2023 à 23h59. Attention, après cette date, les accès au dépôt sera bloqué et la soumission de votre travail impossible !!!
- format exclusif du rendu : **soumission sur Github dans le dépôt consacré sur Classroom**, celui qui contient ce README (aucune autre forme ne sera acceptée, merci par avance pour votre compréhension et le respect de cette demande si pénible lorsqu'elle n'est pas respectée (des points seront enlevés !!!!!!)) ;
- **indiquez votre nom dans le readme** du projet que je sache que c'est vous qui l'avez soumis ;
- **indiquez des paramètres de connexion fonctionnels me permettant de voir le fonctionnement des différents statuts**.
- utilisez les pull requests sur vos dépôts pour poser des questions, je recevrai une notification par email. Discord marchera certainement aussi mais est moins sûr. Passez par des messages privés.
Tous ces paramètres sont nécessaires. Leur non respect engendrera des problèmes dommageables (retard, perte de points).

## Attendus

Nous avons découvert les pricinpes de fonctionnement de Angular et Firebase en développant une application de gestion des événements. Vous aurez à finaliser le projet et à le soumettre sur le dépôt dédié en suivant les indications ci-dessous.

### Interfaces et gestion des données

Finalisez les affichages des pages et formulaires de l'application avec des données dynamiques sur Firebase pour le profil utilisateur, les événements, les utilisateurs, les stocks. Essayez d'avoir quelque chose d'un minimum présentable et structuré graphiquement pour que nous comprenions l'expérience proposée.

### Gestion des droits

Créez un système de droits permettant à une personne authentifiée de réaliser les tâches qui lui sont autorisées ou allouées et protégez les accès aux parties du logiciel avec ce système comme suit :
- un utilisateur devra pouvoir s'identifier, indiquer qu'il souhaite participer à un événement et pouvoir mettre à jour et supprimer son profil ;
- les organisateurs et les admins peuvent accéder à l'espace 'Organisation', gérer les stocks et les événements (créer, mettre à jour, suppression) ;
- seuls les admins peuvent accéder à l'espace admin pour gérer les utilisateurs.
A chaque fois, il faudra afficher les données et mettre les fonctions qui permettent à un utilisateur de modifier, supprimer ces données.

### Options

Si vous voulez aller plus loin et améliorer votre évaluation, ajoutez un chat basé sur la base de données en temps réel de Firebase et les Observables.

## Critères d'évaluation

Le travail personnel est sollicité dans le graphisme/interaces, l'ajout de composants externes, les algorithmes, notamment pour la sécurité, etc. Il est important que les différentes parties du logiciel soient coordonnées et fonctionnelles. Le projet doit être pensé comme un livrable opérationnel. Par exemple un utilisateur peut se connecter, déconnecter. Ses droits lui permettent des accès à des parties protégées de l'application. Une erreur de réseau le déconnecte automatiquement.
