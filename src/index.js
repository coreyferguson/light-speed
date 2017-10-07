
require('./ioc/config');

const ioc = require('./ioc');
const log = ioc.logger('main');

const pipeline = require('./pipeline');
pipeline.run().catch(error => {
  log.error(error);
  log.error(`Errors have occured. Check '${ioc.logger.debugFilePath}' for debug logs.`);
});
