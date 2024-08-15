const cp = require('child_process');
const clientPlaywrightVersion = cp
  .execSync('npx playwright --version')
  .toString()
  .trim()
  .split(' ')[1];
const commonCapabilities = {
  // "build": "BrowserStack Build",
  // "project": "Browserstack Project",
  'browserstack.username': 'shruthimukunda_rQtCgB',
  'browserstack.accessKey': '7cFYao5UPcQD7dZpMJJr',
  'browserstack.playwrightLogs': 'true',
  'browserstack.console': 'verbose',
  'browserstack.networkLogs': true,
  'client.playwrightVersion': clientPlaywrightVersion,
};
const devices = {
  chrome: {
    browse: 'chrome',
    os: 'osx',
    os_version: 'catalina',
  },
  edge: {
    browse: 'edge',
    os: 'osx',
    os_version: 'catalina',
  },
  edge: {
    browse: 'edge',
    os: 'osx',
    os_version: 'catalina',
  },
};

/**
 *
 * @param {keyof devices} device
 */
module.exports.getDevice = function (device) {
  console.log('The device is:;', device);
  let _device = devices[device];
  if (!device) {
    throw new Error('Device not registered in browserstack.js config');
  }
  console.log("Finished the module.exports.getDevice");
  return Object.assign({}, commonCapabilities, _device);
};
console.log("Finished the browserstack.js");
module.exports.browserstack = process.env.npm_config_browserstack === "true";
