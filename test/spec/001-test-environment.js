
const { expect } = require('../support/testUtils');

describe('test environment', () => {

  it('`describe` and `it` from mocha', () => {
    // if we've come this far without error, success!
  });

  it('`expect` from chai', () => {
    expect(true).to.be.true;
    expect(false).to.not.be.true;
  });

  it('chai-as-expected', () => {
    return expect(new Promise(resolve => setTimeout(resolve, 20)))
      .to.eventually.be.fulfilled;
  });

});
