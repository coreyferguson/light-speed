
const nconf = require('nconf');
const { Config } = require('../../../src/config');
const { expect } = require('../../support/testUtils');

describe('config e2e tests', () => {

  afterEach(() => {
    const config = new Config();
    config.reset();
  });

  it('load default configuration', () => {
    const config = new Config({
      defaultConfigPathSegments: [__dirname, 'test-default-config.yml'],
      overridesConfigPathSegments: [__dirname, 'test-override-config.yml']
    });
    config.initialize();
    expect(nconf.get('key1')).to.equal('default value 1');
    expect(nconf.get('key2')).to.equal('override value 2');
    expect(nconf.get('key3')).to.equal('override value 3');
  });

  it('load non-existant overrides config', () => {
    const config = new Config({
      overridesConfigPathSegments: [__dirname, 'no-such-config.yml']
    });
    const overrides = config.getOverridesConfig();
    expect(overrides).to.eql({});
  });

  it('load existing overrides config', () => {
    const config = new Config({
      overridesConfigPathSegments: [__dirname, 'test-override-config.yml']
    });
    const overrides = config.getOverridesConfig();
    expect(overrides).to.have.property('key2', 'override value 2');
  });

});
