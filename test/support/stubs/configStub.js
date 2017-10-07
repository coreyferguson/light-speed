
const nconf = require('nconf');

module.exports = {
  initialize: () => {},
  reset: () => {
    nconf.reset();
    nconf.overrides({});
    nconf.defaults({});
  },
  getOverridesConfig: () => {}
};
