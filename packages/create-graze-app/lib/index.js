const path = require('path')
const fs = require('fs')
const copyDir = require('./utils/copy-dir')
const install = require('./utils/install')
const loadExample = require('./utils/load-example')
const messages = require('./messages')

module.exports = function createGrazeApp (opts) {
  const projectName = opts.projectName
  const herokuApp = opts.herokuApp
  const graphCms = opts.graphCms
  const upgrade = opts.upgrade

  if (!projectName || !herokuApp || !graphCms) {
    console.log(messages.missingProjectName())
    process.exit(1)
  }

  if (fs.existsSync(projectName)) {
    if (!upgrade) {
      console.log(messages.alreadyExists(projectName))
      process.exit(1)
    } else {
      console.log(messages.upgrading(projectName))
    }
  }

  const projectPath = (opts.projectPath = process.cwd() + '/' + projectName)

  if (opts.example) {
    loadExample({
      projectName: projectName,
      example: opts.example
    }).then(installWithMessageFactory(opts, true))
  } else {
    const templatePath = path.resolve(__dirname, '../templates/default')

    copyDir({
      templatePath: templatePath,
      projectPath: projectPath,
      projectName: projectName,
      upgrade
    })
      .then(installWithMessageFactory(opts))
      .catch(function (err) {
        throw err
      })
  }
}

function installWithMessageFactory (opts, isExample = false) {
  const projectName = opts.projectName
  const projectPath = opts.projectPath

  const grazedeps = [
    'axios',
    'razzle-heroku',
    'apollo-client',
    'react-apollo',
    'apollo-cache-inmemory',
    'apollo-link-http',
    'graphql-tag',
    'graphql',
    'styled-components',
    'tachyons',
    'tachyons-components',
    'dayjs',
    'front-matter',
    'react-markdown',
    'react-helmet',
    'react-ga'
  ].sort((a, b) => a.length > b.length ? 1 : -1)

  return function installWithMessage () {
    return install({
      projectName: projectName,
      projectPath: projectPath,
      herokuApp: opts.herokuApp,
      graphCms: opts.graphCms,
      packages: isExample
        ? ['razzle', ...grazedeps]
        : ['react', 'react-dom', 'react-router-dom', 'razzle', 'express', ...grazedeps]
    })
      .then(function () {
        console.log(messages.start(projectName))
      })
      .catch(function (err) {
        throw err
      })
  }
}
