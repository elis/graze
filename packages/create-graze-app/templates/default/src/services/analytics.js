import ReactGA from 'react-ga'

export const get = () => {
  return ReactGA
}

export const init = (code) => {
  ReactGA.initialize(code)
  return ReactGA
}
