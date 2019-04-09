Graze is a modern content management and deployment solution for snappy sites and web apps.

It's based on [Razzle](https://github.com/jaredpalmer/razzle/) with a few modifications to easily deploy to heroku and plug into GraphCMS.

## Install

Install graze:

```
 $ git clone https://github.com/elis/graze my-site
 $ cd my-site
 $ npm i
```

Add your GraphCMS API end point:

```
 $ echo "RAZZLE_GRAPHCMS_API=https://api-euwest.graphcms.com/v1/cju9qelzv02z401ghexxj2llz/master" > .env.development.local
 // replace api url with your graphcms api end point.
``` 

Run locally:

` $ npm start`

## Deploy

Currently Graze supports deployment to Heroku.

To deploy to Heroku first set the GraphCMS API variable:

```
$ heroku config:set -a graze RAZZLE_GRAPHCMS_API=https://api-euwest.graphcms.com/v1/cju9qelzv02z401ghexxj2llz/master
```
Replace `graze` with your app name and the api url to your actual graphcms api endpoint.

Next push to Heroku:

```
 $ git init
 $ git add .
 $ git commit -a -m "first"
 $ heroku git:remote -a graze
 // replace `graze` with your app name
```

` $ git push heroku master`

Your app will be deployed to Heroku - follow the CLI output.

## Motivation

My desire was to create a static-like website that delivers content blazingly fast while allowing me to modify both content and content with zero effort.

The result is Graze.

## Inspiration

* [palmerhq/razzle](https://github.com/jaredpalmer/razzle)

#### Author

* [Eli Sklar](https://twitter.com/elisklar)

---

MIT License

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
