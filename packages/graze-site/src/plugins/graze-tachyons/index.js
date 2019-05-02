import { useEffect } from 'react'

export const server = {
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
