export const plugins = [
  require('./src/plugins/graze-styled-components'),
  require('./src/plugins/graze-material-ui'),
  require('./src/plugins/graze-graphcms'),
  {
    module: require('./src/plugins/graze-docs'),
    source: './src/docs',
    route: '/docs'
  },
  require('./src/plugins/graze-tutorial'),
  require('./src/plugins/graze-helmet'),
  require('./src/plugins/graze-scroll-to-top'),
  require('./src/plugins/graze-meta-tags'),
  // require('./src/plugins/dummy'),
  {
    module: require('./src/plugins/graze-tachyons'),
    persist: true
  },
  {
    module: require('./src/plugins/graze-ga'),
    trackingId: 'UA-138092593-2', // Graze installation statistics - change to your trackingId
    gaOptions: { name: 'graze-setup' }
  }
]
