
// load test ioc container
require('../support/testIocConfig')
const ioc = require('../../src/ioc');

// component to be tested
const pipeline = require('../../src/pipeline');

// test utilities
const { expect, sinon } = require('../support/testUtils');
const generateOperation = require('../support/stubs/operationStub').generate;

describe('pipeline unit tests', () => {

  const sandbox = sinon.sandbox.create();

  beforeEach(() => {
    sandbox.restore();
  });

  describe('pipeline._inquire()', () => {

    it('inquire for missing cached answers', () => {
      const operation = generateOperation();
      sandbox.stub(ioc.cache, 'fetch').returns();
      const spy = sandbox.stub(operation, 'inquire').returns(Promise.resolve());
      return pipeline._inquire(operation).then(() => {
        expect(spy).to.have.been.calledOnce;
      });
    });

    it('inquire with cached answers', () => {
      const operation = generateOperation();
      sandbox.stub(ioc.cache, 'fetch').returns({key1: 'value1'});
      return expect(pipeline._inquire(operation)).to.eventually.have.property('key1', 'value1');
    });

  });

  describe('pipeline._state()', () => {

    it('fetch state with no cache', () => {
      const operation = generateOperation();
      sandbox.stub(operation, 'state').returns(Promise.resolve());
      return pipeline._state(operation);
    });

    it('fetch state with cache', () => {
      const operation = generateOperation();
      sandbox.stub(ioc.cache, 'fetch').returns({key1: 'value1'});
      const spy = sandbox.stub(operation, 'state').returns(Promise.resolve());
      pipeline._state(operation);
      expect(spy).to.be.calledWith({key1: 'value1'});
    });

  });

});
