Graze is a modern content management and deployment solution for snappy sites and web apps.

![Graze](https://media.graphcms.com/KkXwoVaCSpq4zznnCHt9)

It's based on [Razzle](https://github.com/jaredpalmer/razzle/) with a few modifications to easily deploy to heroku and plug into GraphCMS.

## Install

Install graze:

```
 $ npx create-graze-app my-site my-heroku-app https://graph-cms-api/
 $ cd my-site
 $ npm start
```

Learn more about setup and installation in our tutorial: [Graze Turorial](https://graze.site/__tutorial)

## Deploy

Currently Graze supports deployment to Heroku.

Push directly to heroku via git `git push heroku master` or use the shorthand command:

```
 $ npm deploy
```

Your app will be deployed to Heroku - follow the CLI output.

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
