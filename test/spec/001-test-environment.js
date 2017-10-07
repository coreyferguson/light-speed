
const { expect } = require('../support/testUtils');

describe('test environment', () => {

  it('`describe` and `it` both defined', () => {
    // if we've come this far without error, success!
  });

  it('`expect` from chai is available', () => {
    expect(true).to.be.true;
    expect(false).to.not.be.true;
  });

});
