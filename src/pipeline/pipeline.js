
const bluebird = require('bluebird');
const ioc = require('../ioc');

const log = ioc.logger('pipeline');

class Pipeline {

  constructor(options) {
    options = options || {};
  }

  run() {
    return bluebird.mapSeries(ioc.operations, operation => {
      log.info(`Processing: ${operation.getLabel()}`);
      return this._inquire(operation);
    });
  }

  _inquire(operation) {
    const cacheLabel = `${operation.getLabel()}-inquire`;
    const cachedAnswers = ioc.cache.fetch(cacheLabel);
    if (!cachedAnswers) {
      log.debug(`Inquiring into '${operation.getLabel()}' operation`);
      return operation.inquire(cachedAnswers).then(questions => {
        return ioc.inquirer.prompt(questions).then(answers => {
          ioc.cache.put(cacheLabel, answers);
        });
      });
    } else {
      log.debug(`Operation '${operation.getLabel()}' already has cached answers`);
      return Promise.resolve(cachedAnswers);
    }
  }

  _state(operation) {
    const cacheLabel = `${operation.getLabel()}-state`;
    const cachedState = ioc.cache.fetch(cacheLabel);
    log.debug(`Checking state of '${operation.getLabel()}' operation`);
    return operation.state(cachedState).then(newState => {
      if (newState) ioc.cache.put(cacheLabel, newState);
      return newState;
    });
  }

}

module.exports = new Pipeline();
module.exports.Pipeline = Pipeline;
