
const fs = require('fs');
const nconf = require('nconf');
const os = require('os');
const path = require('path');
const { yaml } = require('dev-env-lib');

class Config {

  constructor(options) {
    options = options || {};
    this.defaultConfigPathSegments = options.defaultConfigPathSegments || [__dirname, 'default-config.yml'];
    this.overridesConfigPathSegments = options.overridesConfigPathSegments || [os.homedir(), '.dev-ops-cli/overrides.yml'];
  }

  initialize() {
    const defaultConfig = yaml.load(this.defaultConfigPathSegments);
    const overridesConfig = this.getOverridesConfig();
    nconf
      .overrides(overridesConfig)
      .env()
      .argv()
      .file({ file: '/required/for/nconf/to/function/whoknowswhy' })
      .defaults(defaultConfig);
  }

  reset() {
    nconf.reset();
    nconf.overrides({});
    nconf.defaults({});
  }

  getOverridesConfig() {
    try {
      const fullPath = path.resolve.apply(null, this.overridesConfigPathSegments);
      debugger;
      fs.statSync(fullPath);
    } catch (e) {
      if (e.code === 'ENOENT') {
        return {};
      } else {
        throw e;
      }
    }
    return yaml.load(this.overridesConfigPathSegments);
  }

}

module.exports = new Config();
module.exports.Config = Config;
