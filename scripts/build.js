'use strict';

const { execSync } = require('child_process');
const { inInstall } = require('in-publish');
const path = require('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));

if (inInstall()) {
  process.exit(0);
}

const rootDir = path.resolve(__dirname, '../');
const babelPath = path.resolve(__dirname, '../node_modules/.bin/babel').replace(/ /g, '\\ ');

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

console.log('Deleting old build folders...'); // eslint-disable-line no-console

Promise.all([rimraf(`${rootDir}/lib`), rimraf(`${rootDir}/es`), rimraf(`${rootDir}/scss`)])
  .then(() => {
    exec(`${babelPath} src -q -d es --ignore story.js,test.js`, {
      BABEL_ENV: 'es',
    });
    exec(`${babelPath} src -q -d lib --ignore story.js,test.js`, {
      BABEL_ENV: 'cjs',
    });
    exec("cd src; find . -name '*.scss' | cpio -pd ../scss");
  })
  .catch(error => {
    throw error;
  });
