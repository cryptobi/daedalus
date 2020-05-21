/* eslint-disable strict, no-shadow, no-unused-vars, no-console */

'use strict';

/** Build file to package the app for release */

const os = require('os');
const packager = require('electron-packager');
const del = require('del');
const exec = require('child_process').exec;
const pkg = require('../package.json');
const copy = require('copy');
const fs = require('fs');


/**
 * First two values are node path and current script path
 * https://nodejs.org/docs/latest/api/process.html#process_process_argv
 */
const argv = require('minimist')(process.argv.slice(2));

const appName = argv.name || argv.n || pkg.productName;
const shouldUseAsar = argv.asar || argv.a || false;
const shouldBuildAll = argv.all || false;

const DEFAULT_OPTS = {
  dir: './',
  name: appName,
  asar: shouldUseAsar,
  ignore: [
    /^\/.buildkite($|\/)/,
    /^\/.storybook($|\/)/,
    /^\/tests($|\/)/,
    /^\/flow($|\/)/,
    /^\/node_modules($|\/)/,
    /^\/scripts($|\/)/,
    /^\/source($|\/)/,
    /^\/storybook($|\/)/,
    /^\/tls($|\/)/,
    /^\/translations($|\/)/,
    /^\/installers\/.*exe/,
  ],
};

const icon = argv.icon || argv.i || 'installers/icons/electron';
if (icon) DEFAULT_OPTS.icon = icon;

const version = argv.version || argv.v;
if (version) {
  DEFAULT_OPTS.version = version;
  startPack();
} else {
  exec('yarn list --pattern electron', (err, stdout) => {
    if (err) {
      DEFAULT_OPTS.version = '1.7.9';
    } else {
      var strx1 = stdout.split('electron@');
      var fstrx1 = strx1[1];
      DEFAULT_OPTS.version = fstrx1.replace(/\s/g, '').split('├')[0];
    }
    startPack();
  });
}

/*
  Unable to get static resources packaged using webpack,
  made manual copying routine.
*/
function addLibDistFiles(){
  console.log("Copying static dependencies...")

  fs.mkdir('dist/font/data',
    { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Font directory created successfully.');
    });

  copy('./node_modules/pdfkit/js/font/data/*.afm', './dist/font/data', function(err, files) {
    if (err) throw err;
  });

  copy('./node_modules/fontkit/*.trie', './dist/main', function(err, files) {
    if (err) throw err;
  });

  copy('node_modules/linebreak/src/*.trie', './dist/main', function(err, files) {
    if (err) throw err;
  });

  console.log("DONE copying static dependencies.")
}

/** @desc Build, clear previous releases and pack new versions */
async function startPack() {

  // eslint-disable-next-line no-console
  console.log('startPack() ...');

  // manually copy static files missed by webpack
  addLibDistFiles();

  try {

    const paths = await del('release');

    // Start the packing process
    if (shouldBuildAll) {
      // build for all platforms
      const archs = ['ia32', 'x64'];
      const platforms = ['linux', 'win32', 'darwin'];

      platforms.forEach(plat => {
        archs.forEach(arch => {
          pack(plat, arch, log(plat, arch));
        });
      });

    } else if (argv.win64) {
      pack('win32', 'x64', log('win32', 'x64'));
    } else {
      // build for current platform only
      pack(os.platform(), os.arch(), log(os.platform(), os.arch()));
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @desc
 * @param {String} plat
 * @param {String} arch
 * @param {Function} cb
 */
function pack(plat, arch, cb) {
  // there is no darwin ia32 electron
  if (plat === 'darwin' && arch === 'ia32') return;

  const iconObj = {
    icon:
      DEFAULT_OPTS.icon +
      (() => {
        let extension = '.png';
        if (plat === 'darwin') extension = '.iconset';
        if (plat === 'win32') extension = '.ico';

        return extension;
      })(),
  };

  const opts = Object.assign({}, DEFAULT_OPTS, iconObj, {
    platform: plat,
    arch,
    prune: false,
    'app-version': pkg.version || DEFAULT_OPTS.version,
    out: `release/${plat}-${arch}`,
  });

  packager(opts, cb);
}

/**
 * @desc Log out success / error of building for given platform and architecture
 * @param {String} plat
 * @param {String} arch
 * @return {Function}
 */
function log(plat, arch) {
  return (err) => {
    if (err) return console.error(err);
    // eslint-disable-next-line no-console
    console.log(`${plat}-${arch} finished!`);
  };
}
