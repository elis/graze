
const name = 'graze-scroll-to-top'

export const server = {
  name,
  onRequest: () => ({}),
  output: () => {
    const { Helmet } = require('react-helmet')

    const helmet = Helmet.renderStatic()
    return [`
      ${helmet.title.toString() || 'Welcome to Graze'}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    `]
  }
}
