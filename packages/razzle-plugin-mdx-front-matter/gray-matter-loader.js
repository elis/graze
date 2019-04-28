const matter = require('gray-matter')
const stringifyObject = require('stringify-object')

module.exports = async function (src) {
  console.log('Loading?', src)
  const callback = this.async()
  const { content, data } = matter(src)
  const code = `${content}

export const frontMatter = ${stringifyObject(data)}`

  return callback(null, code)
}
