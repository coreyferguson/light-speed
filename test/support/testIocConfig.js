
const generateOperation = require('./stubs/operationStub').generate;

const ioc = require('../../src/ioc/container');

/**
 * IOC component configuration.
 */

ioc.operations = [
  generateOperation(),
  generateOperation()
];

ioc.cache = require('./stubs/cacheStub');
ioc.inquirer = require('./stubs/inquirerStub');
ioc.logger = require('./stubs/loggerStub');

