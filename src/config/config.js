
const nconf = require('nconf');
const { yaml } = require('dev-env-lib');
const os = require('os');

class Config {

  constructor(options) {
    options = options || {};
    this.defaultConfigPathSegments = options.defaultConfigPathSegments || [__dirname, 'default-config.yml'];
    this.overridesConfigPathSegments = options.overridesConfigPathSegments || [os.homedir(), '.dev-ops-cli/override.yml'];
  }

  initialize() {
    const defaultConfig = yaml.load(this.defaultConfigPathSegments);
    const overridesConfig = yaml.load(this.overridesConfigPathSegments);
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

}

module.exports = new Config();
module.exports.Config = Config;
