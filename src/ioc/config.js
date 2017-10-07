
const ioc = require('./container');

/**
 * IOC component configuration.
 */

ioc.operations = [
  require('../example-operation')
];

/**
 * Configuration of other singletons
 */

require('../logging/config');
