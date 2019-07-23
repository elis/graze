import { useEffect } from 'react'

const name = 'graze-tachyons'

export const server = {
  name,
  onRequest: () => {
    const styles = require('tachyons/css/tachyons.min.css')
    return {
      styles
    }
  },
  output: ({ fields: { styles } }) => {
    return [`
    <style id='tachyons-server-side'>
    ${styles}
    </style>`]
  }
}

export const client = {
  name,
  onLoad: ({ persist }) => ({ persist }),
  Wrapper: ({ fields: { persist }, ...props }) => {
    if (!persist) {
      useEffect(() => {
        const tssStyles = document.getElementById('tachyons-server-side')
        if (tssStyles && tssStyles.parentNode) {
          tssStyles.parentNode.removeChild(tssStyles)
        }
      }, [])
    }
    return props.children
  }
}
