export default [
  { name: 'Graze Documentation', route: '/', menu: [
    { name: 'Getting Started', route: '/getting-started' },
    { name: 'Introduction', route: '/introduction' },
    { name: 'Directory Structure', route: '/directory-structure' }
  ]},
  { name: 'Guides', route: '/guides', menu: [
    { name: 'GraphCMS', route: '/guides/graphcms' },
  ]},
  { name: 'Plugins', route: '/plugins', menu: [
    { name: 'App Plugins', route: '/plugins/app' },
    { name: 'Client Plugins', route: '/plugins/client' },
    { name: 'Server Plugins', route: '/plugins/server' },
    { name: 'Exposed Plugins', route: '/plugins/exposed' },
  ]},
  { name: 'Official Plugins', route: '/official-plugins' }
]