
# Test

## Usage

You can test with:

- `npm test`: Test once.
- `npm watch`: Test and watch source for changes.
- `npm debug`: Enable debugging with Chrome

## IOC

The ioc container makes reading and writing tests significantly easier. For every component you build:

- Create a [stub](./support/stubs)
- Wire in [`src/ioc/config.js`](../src/ioc/config.js)
- Wire in [`test/support/testIocConfig.js`](./support/testIocConfig.js)

## Skeleton of a typical test

```javascript
// load test ioc container
require('../support/testIocConfig')
const ioc = require('../../src/ioc');

// component to be tested
const component = require('./path/to/component');

// test utilities
const { expect, sinon } = require('./path/to/support/testUtils');

describe('component unit tests', () => {

  const sandbox = sinon.sandbox.create();

  beforeEach(() => {
    sandbox.restore();
  });

  it('description of test intent', () => {
    expect(true).to.be.true;
  });
})
```
