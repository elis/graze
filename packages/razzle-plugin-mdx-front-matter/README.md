Add support for Front-Matter on MDX files in Razzle

## Usage

`razzle.config.js`
```js
module.exports = {
  plugins: [
    'mdx', 'mdx-front-matter'
  ]
}
```

`src/my-mdx-file.mdx`
```mdx
---
name: My Document Title
---

The rest of my MDX content file.
```

`src/your-app.js`
```js

import MyComp, { frontMatter } from './my-mdx-file'

console.log('Front-Matter:', frontMatter)
// Front-Matter: {name: "My Document Title"}
```

Created by: [Eli Sklar](https://github.com/elis)