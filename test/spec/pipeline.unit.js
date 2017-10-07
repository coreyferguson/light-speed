
const { expect, sinon } = require('../support/testUtils');
const { Pipeline } = require('../../src/pipeline');
const operationStub = require('../support/stubs/operationStub');
const generateStub = operationStub.generate;

describe('pipeline unit tests', () => {

  const sandbox = sinon.sandbox.create();
  let pipeline;

  before(() => {
    pipeline = new Pipeline({
      operations: [
        generateStub(),
        generateStub()
      ]
    });
  });

  beforeEach(() => {
    sandbox.restore();
  });

  describe('pipeline.run()', () => {

    it('inquires all operations', () => {
      const spies = pipeline.operations.map(operation => {
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
