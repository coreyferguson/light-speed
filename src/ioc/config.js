
const ioc = require('./container');
const config = require('../config');

/**
 * IOC initializers
 */

config.initialize();

/**
 * IOC component configuration.
 */

ioc.operations = [
  require('../operations/awsCredentials')
];

