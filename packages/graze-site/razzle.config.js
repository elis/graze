module.exports = {
  modify: require('razzle-heroku'),
  plugins: [
    {
      name: 'mdx',
      options: {
        mdPlugins: [
          require('rehype-highlight'),
          require('./src/plugins/graze-docs/mdx-plugin'),
          require('remark-slug'),
          require('remark-autolink-headings')
        ]
      }
    },
    'mdx-front-matter'
  ]
}
