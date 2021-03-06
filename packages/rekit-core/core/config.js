const fs = require('fs');
const paths = require('./paths');

let appType;
function getPkgJson(noCache) {
  const pkgJsonPath = paths.map('package.json');
  if (!fs.existsSync(pkgJsonPath)) return null;
  if (noCache) delete require.cache[pkgJsonPath];
  return require(pkgJsonPath);
}

function getRekitConfig(noCache) {
  const pkgJson = getPkgJson(noCache);
  let config = pkgJson && pkgJson.rekit || {};
  if (!config) config = {};
  config.appType = appType || config.appType;
  return config;
}

function setAppType(_appType) {
  appType = _appType;
}

// Load rekit configuration from package.json
module.exports = {
  css: 'less',
  style: 'less',
  getPkgJson,
  getRekitConfig,
  setAppType,
};
