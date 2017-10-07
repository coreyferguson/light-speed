
const ioc = require('./container');

/**
 * IOC initializers
 */

require('../config').initialize();

/**
 * IOC component configuration.
 */

ioc.operations = [
  require('../operations/awsCredentials')
];

