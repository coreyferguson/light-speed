
const ioc = require('./container');
const config = require('../config');

/**
 * IOC component configuration.
 */

ioc.operations = [
  require('../operations/awsCredentials')
];

/**
 * IOC initializers
 */
config.initialize();
