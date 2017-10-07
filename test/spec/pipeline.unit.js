
require('../support/testIocConfig')
const ioc = require('../../src/ioc');


const { expect, sinon } = require('../support/testUtils');
const pipeline = require('../../src/pipeline');

describe('pipeline unit tests', () => {

  const sandbox = sinon.sandbox.create();

  beforeEach(() => {
    sandbox.restore();
  });

  describe('pipeline.run()', () => {

    it('inquires all operations', () => {
      const spies = ioc.operations.map(operation => {
        return sandbox.stub(operation, 'inquire')
          .returns(Promise.resolve([]));
      });
      return pipeline.run().then(() => {
        spies.forEach(spy => {
          expect(spy).to.have.been.calledOnce;
        });
      });
    });

  });

});
