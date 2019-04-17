import ReactGA from 'react-ga'

const cache = {}

export const get = code => {
  const cached = cache[code]
  if (cached) { return ReactGA }
  
  cache[code] = ReactGA.initialize(code)
  return ReactGA
}