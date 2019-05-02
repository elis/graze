const visit = require('unist-util-visit')
const is = require('unist-util-is')
const mdxAstToMdxHast = require('@mdx-js/mdx/mdx-ast-to-mdx-hast')

module.exports = (opts = {}) => {
  return (tree, file) => {
    const { children } = tree
    const splits = []
    const slides = []
    const headings = []

    // const types = {}

    visit(tree, node => {
      // console.log('visiting node:', node)
      // Object.assign(types, { [node.type]: [...(types[node.type] || []), node]})
      if (is('heading', node)) {
        const i = children.indexOf(node)
        // console.log('adding heading:', node)
        headings.push(node)
        splits.push(i)
      }
    })
    // console.log('Types:', Object.keys(types))
    // console.log(`🚒`, 'headings:', headings)

    const jsx = headings.map(heading => {
      const hast = mdxAstToMdxHast()({
        type: 'root',
        children: [heading],
      })
      const code = toJSX(hast, {}, { skipExport: true })
      return code
    })

    const value = `export const documentHeadings = [${jsx.join(',\n')}]`
    // console.log(`🚒`, 'val:', val)

    tree.children.push({
      type: 'export',
      default: false,
      value // : `export const documentHeadings = [${jsx.join(',\n')}]`,
    })
  }
}


const toJSX = (node, parent, opts = {}) => {
  const { preserveNewlines = false } = opts
  let children = ''
  // console.log('JSXING', node.type, node)

  if (node.type === 'root') {
    const jsxNodes = []
    let layout = ''

    for (const child of node.children) {
      // imports/exports should already be handled for the root mdx component
      if (child.type === 'import') continue
      if (child.type === 'export') {
        if (!child.default) continue
        layout = child.value
          .replace(/^export\s+default\s+/, '')
          .replace(/;\s*$/, '')
        continue
      }
      jsxNodes.push(child)
    }

    // console.log('node.children:', node.children[0])
    const childs = jsxNodes.map(child => toJSX(child, node, opts))
    // console.log(`🧖‍♀️`, 'childs:', childs)

    return [
      // `Test ->`,
      // `list`,
      // `{ childs: `,
      `{ ${childs} }`,
      // `}`,
      // ...jsxNodes.map(child => `type of child: ${child.type}`),

      // '(props => {',
      // `  const __MDXDECK_LAYOUT__ = ${layout ? layout : '"div"'}`,
      // '  return <__MDXDECK_LAYOUT__',
      // '    name="wrapper"',
      // '    components={props.components}>',
      // '    ' + jsxNodes.map(child => toJSX(child, node)).join('\n    '),
      // '  </__MDXDECK_LAYOUT__>',
      // '})',
    ]
      .filter(Boolean)
      .join('\n')
  }

  if (node.children) {
    children = node.children
      .map(child => {
        return toJSX(child, node, {
          preserveNewlines: preserveNewlines || node.tagName === 'pre',
        })
      })
      .join('')
  }
  if (node.type === 'text' || node.tagName === 'inlineCode') {
    const shouldPreserveNewlines = preserveNewlines || parent.tagName === 'p'
    if (node.value === '\n' && !shouldPreserveNewlines) {
      return node.value
    }
    return toTemplateLiteral(node.value)
  }

  if (node.type === 'element') {
    let props = ''
    if (Object.keys(node.properties).length > 0) {
      props = JSON.stringify(node.properties)
    }
    return `${node.tagName}: ${children}`
  }


  if (node.type === 'comment') {
    return `{/*${node.value}*/}`
  }
  if (node.type === 'heading') {
    // console.log('THIS IS HEADING', node)
    return children
  }

  return node.value
}

const toTemplateLiteral = text =>
  '`' + text.replace(/\\/g, '\\\\').replace(/`/g, '\\`') + '`'