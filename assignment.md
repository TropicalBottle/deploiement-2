# Mise en Pratique :

En react, faites un petit projet permettant à un utilisateur de s’enregistrer sur un formulaire avec nom, prénom, mail, date de naissance, ville, code postal et un bouton de sauvegarde, et de voir la liste des inscrits.


Le bouton est non clickable tant que les champs précédents ne sont pas remplis.

Sous chaque champ on affiche un message d’erreur si celui-ci n’est pas valide.

Si les champs sont valides, on affiche un toaster de succès, puis on vide les champs.


## Les règles de validation :

La date de naissance bloque les -18 ans,
Le code postal doit être au format français (5 chiffres),
Les champs nom, prénom et ville doivent être valides (sans caractère spéciaux et chiffres mais accepter les accents, tréma, tiret, etc),
L’email doit être valide

Les fonctions de vérification sont dans un fichier js à part qui sera totalement testé. Les composants React également. La couverture attendue est de 100% (index.js et reportWebVitals exclus) avec tous les tests unitaires et d’intégrations passant avec succès. Une documentation complète à fournir. La fiabilité des tests sera prise en compte.


## Les tests à avoir au minimum :

Le calcul de l'âge
L'âge > 18 ans
Le format du code postal
Le format du nom, prénom et ville (avec différents cas particulier)
Le format de l’email
La désactivation du bouton si les champs ne sont pas remplis
Le toaster de succès, avec champs vidés
Les erreurs correspondantes en rouge