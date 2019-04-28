const path = require('path')

const defaultOptions = {}

function modify (baseConfig, params, webpack, userOptions = {}) {
  const options = Object.assign({}, defaultOptions, userOptions)
  const config = Object.assign({}, baseConfig)
  const loader = path.join(__dirname, './gray-matter-loader')

  if (config.module && config.module.rules) {
    const mdxRule = config.module.rules.find(({ test }) => test && 'mdx-test.mdx'.match(test))
    mdxRule.use.push({ loader })
  }

  return config
}

module.exports = modify
