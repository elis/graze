Graze is a modern content management and deployment solution for snappy sites and web apps.

It's based on [Razzle](https://github.com/jaredpalmer/razzle/) with a few modifications to easily deploy to heroku and plug into GraphCMS.

## Install

Install graze:

```
 $ npx create-graze-app my-site my-heroku-app https://graph-cms-api/
 $ cd my-site
 $ npm start
```

## Deploy

Currently Graze supports deployment to Heroku.

To deploy to Heroku first set the GraphCMS API variable:

```
 $ git push heroku master
```

Your app will be deployed to Heroku - follow the CLI output.

## EXPERIMENTAL

Be advised that this software is at a very early stage and is considered experimental - use on production with care.

## Motivation

My desire was to create a static-like website that delivers content blazingly fast while allowing me to modify both content and code with zero effort.

The result is Graze.

## Inspiration

* [palmerhq/razzle](https://github.com/jaredpalmer/razzle)

#### Author

* [Eli Sklar](https://twitter.com/elisklar)

---

MIT License

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
