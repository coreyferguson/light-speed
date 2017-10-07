
const ioc = require('./container');

/**
 * IOC component configuration.
 */

ioc.operations = [
  require('../operations/awsCredentials')
];

/**
 * Configuration of other singletons
 */

require('../logging/config');
