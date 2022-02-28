
# Bienvenue sur Groupomania !

  

Groupomania est le réseau social interne de l'entreprise du même nom. Ce projet a été réalisé dans le cadre de la formation développeur web d'OpenClassRooms.

  

## A propos

Ce projet a été créé avec le stack suivante:

-  <a  href="https://nextjs.org/"  title="Next.js"><img  src="https://github.com/get-icon/geticon/raw/master/icons/nextjs-icon.svg"  alt="Next.js"  width="21px"  height="21px"> Next.js</a>
-  <a  href="https://reactjs.org/"  title="React"><img  src="https://github.com/get-icon/geticon/raw/master/icons/react.svg"  alt="React"  width="21px"  height="21px"> React.js</a>
-  <a  href="https://sass-lang.com/"  title="Sass"><img  src="https://github.com/get-icon/geticon/raw/master/icons/sass.svg"  alt="Sass"  width="21px"  height="21px"> Sass</a>
-  <a  href="https://www.typescriptlang.org/"  title="Typescript"><img  src="https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg" alt="Typescript"  width="21px"  height="21px"> Typescript</a>
-  <a  href="https://reactjs.org/"  title="Material UI"><img  src="https://github.com/get-icon/geticon/raw/master/icons/material-ui.svg"  alt="Material UI"  width="21px"  height="21px"> Material UI</a>
-  <a  href="https://vercel.com/"  title="Vercel"><img  src="https://github.com/get-icon/geticon/raw/master/icons/vercel.svg"  alt="Vercel"  width="21px"  height="21px"> Vercel</a>
  

## Démarrer

Pour démarrer ce projet en local, vous pouvez cloner le repository et exécuter les commandes suivantes

	npm install
	npm run dev

Vous devez également ajouter à la racine du projet le fichier `.env.local` contenant les variables suivantes :

URL de l'API backend en local :

    NEXT_PUBLIC_AXIOS_BASE_URL=http://localhost:4200/api/

Domaines d'origine des images :

    IMAGES_DOMAIN=localhost
    S3_IMAGES_DOMAIN_EU_WEST=************.s3.eu-west-3.amazonaws.com
    S3_IMAGES_DOMAIN=************.s3.amazonaws.com

(remplacer les * par le nom du projet)

Vous pouvez aussi directement vous rendre sur :

[groupomania-two.vercel.app](https://groupomania-two.vercel.app/)

  

## Features

Une fois que l'utilisateur aura créé un compte, il aura la possibilité de :

- Publier des posts (avec ou sans images)
- Réagir à des posts
- Commenter des posts
- Modifier ses posts/commentaires
- Supprimer ses posts/commentaire
- Modifier ses informations personnelles
- Supprimer son compte