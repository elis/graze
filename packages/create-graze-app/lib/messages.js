'use strict';

const chalk = require('chalk');
const getInstallCmd = require('./utils/get-install-cmd');
const output = require('./utils/output');

const program = {
  name: 'create-graze-app',
};

exports.help = function() {
  return `
    ${chalk.green('<project-directory>')} is required.
    If you have any problems, do not hesitate to file an issue:
      ${chalk.cyan('https://github.com/elis/graze/issues/new')}
  `;
};

exports.exampleHelp = function() {
  return `Example from https://github.com/elis/graze/tree/master/examples/ ${output.param(
    'example-path'
  )}`;
};

exports.herokuAppHelp = function() {
  return `Provide Heroku app name`;
};

exports.missingProjectName = function() {
  return `
Please specify the project directory, heroku app, and GraphCMS api:
  ${chalk.cyan(program.name)} ${chalk.green('<project-directory>')} ${chalk.green('<heroku-app>')} ${chalk.green('<graphcms-api>')}
For example:
  ${chalk.cyan(program.name)} ${chalk.green('my-graze-app')} ${chalk.green('graze-site')} ${chalk.green('https://api-euwest.graphcms.com/v1/cju9qelzv02z401ghexxj2llz/master')} 
  ${chalk.cyan(program.name)} ${chalk.cyan(
    '--example with-preact'
  )} ${chalk.green('my-preact-app')}
Run ${chalk.cyan(`${program.name} --help`)} to see all options.
`;
};

exports.alreadyExists = function(projectName) {
  return `
Uh oh! Looks like there's already a directory called ${chalk.red(
    projectName
  )}. Please try a different name or delete that folder.`;
};

exports.upgrading = function(projectName) {
  return `
Hold on to your pants, upgrading ${chalk.red(
    projectName
  )}.`
};

exports.installing = function(packages) {
  const pkgText = packages
    .map(function(pkg) {
      return `    ${chalk.cyan(chalk.bold(pkg))}`;
    })
    .join('\n');

  return `
  Installing npm modules:
${pkgText}
`;
};

exports.installError = function(packages) {
  const pkgText = packages
    .map(function(pkg) {
      return `${chalk.cyan(chalk.bold(pkg))}`;
    })
    .join(', ');

  output.error(`Failed to install ${pkgText}, try again.`);
};

exports.copying = function(projectName) {
  return `
Creating ${chalk.bold(chalk.green(projectName))}...
`;
};

exports.overwriting = function(projectName) {
  return `
Upgrading ${chalk.bold(chalk.green(projectName))}...
`;
};

exports.copying = function(projectName) {
  return `
Creating ${chalk.bold(chalk.green(projectName))}...
`;
};

exports.start = function(projectName) {
  const cmd = getInstallCmd();

  const commands = {
    install: cmd === 'npm' ? 'npm install' : 'yarn',
    build: cmd === 'npm' ? 'npm run build' : 'yarn build',
    start: cmd === 'npm' ? 'npm run start:prod' : 'yarn start:prod',
    dev: cmd === 'npm' ? 'npm start' : 'yarn start',
  };

  return `
  ${chalk.green('Awesome!')} You're now ready to start coding.
  
  I already ran ${output.cmd(commands.install)} for you, so your next steps are:
    ${output.cmd(`cd ${projectName}`)}
  
  To start a local server for development:
    ${output.cmd(commands.dev)}
  
  To build a version for production:
    ${output.cmd(commands.build)}

  To run the server in production:
    ${output.cmd(commands.start)}
    
  Questions? Feedback? Please let me know!
  ${chalk.green('https://github.com/elis/graze/issues')}
`;
};

exports.missingHerokuApp = function(herokuApp) {
  return `
  To create a new heroku app run:
   ${output.cmd(`heroku apps:create ${herokuApp}`)}
`
}

exports.upgrade = function() {
  return `
  Upgrade ${chalk.cyan('<project-directory>')} with the most recent Graze
  setup.

  ${chalk.red('Use with care')}.
`
}