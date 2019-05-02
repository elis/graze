import React from 'react'

export const app = {
  onRender: () => ({}),
  Addon: ({ ...props }) => {
    return (
      <React.Fragment>
        <h1>Hello World!</h1>
      </React.Fragment>
    )
  }
}
