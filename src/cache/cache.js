
const fs = require('fs');
const logger = require('../logger')('cache');
const nconf = require('nconf');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { yaml } = require('dev-env-lib');

const cacheBasePath = path.resolve(
  os.homedir(),
  nconf.get('userConfigFolderName'),
  'cache'
);

class Cache {

  constructor(options) {
    options = options || {};
    this._cacheBasePath = options.cacheBasePath || cacheBasePath;
    spawnSync('mkdir', ['-p', this._cacheBasePath]);
  }

  fetch(label) {
    return this._safeLoadYaml([this._cacheBasePath, `${label}.yml`]);
  }

  put(label, item) {
    const yamlContent = yaml.dump(item);
    fs.writeFileSync(path.resolve(this._cacheBasePath, `${label}.yml`), yamlContent);
  }

  _safeLoadYaml(pathSegments) {
    try {
      const fullPath = path.resolve.apply(null, pathSegments);
      fs.statSync(fullPath);
    } catch (e) {
      if (e.code === 'ENOENT') {
        return undefined;
      } else {
        throw e;
      }
    }
    return yaml.load(pathSegments);
  }

}

module.exports = new Cache();
module.exports.Cache = Cache;
