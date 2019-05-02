# Create Graze App

Create Graze sites and apps in one command.

```
npx create-graze-app my-proj my-heroku-app https://api-euwest.graphcms.com/v1/cju9qelzv02z401ghexxj2llz/master
cd my-proj
npm start
```

or.... with the `yarn create` command:

```
yarn create graze-app my-proj my-heroku-app https://api-euwest.graphcms.com/v1/cju9qelzv02z401ghexxj2llz/master
cd my-proj
yarn start
```

## GraphCMS Model

To run the preset that comes with the default setup your GraphCMS will need at least one model type called "Site".

Create a new model called "Site", and add two fields to it, "name" and "description" (both strings).