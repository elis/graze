import React, { useMemo } from 'react'

export default (props) => {
  const { useSite } = require('@graze').default
  const { state: site } = (useSite && useSite()) || {}

  const Comp = useMemo(() => {
    const comp = site && site.attributes && site.attributes.pageComponent
    return comp
      ? require('../' + comp.split(':')[0])[comp.split(':')[1] || 'default']
      : require('./base-page').default
  }, [site && site.attributes && site.attributes.pageComponent])

  return <Comp>{props.children}</Comp>
}
