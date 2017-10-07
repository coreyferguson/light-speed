
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

ioc.cache = require('../cache');
ioc.inquirer = require('inquirer');
ioc.logger = require('../logger');

