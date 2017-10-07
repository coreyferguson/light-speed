
const bluebird = require('bluebird');
const ioc = require('../ioc');

const log = ioc.logger('pipeline');

class Pipeline {

  /**
   * Run the pipeline, iterating through one operation at a time.
   * For each operation:
   *   1) inquire for user input
   *   2) fetch current state
   *   3) execute
   */
  run() {
    return bluebird.mapSeries(ioc.operations, operation => {
      log.info(`Processing operation: ${operation.getLabel()}`);
      return this._inquire(operation).then(answers => {
        return this._state(operation, answers).then(state => {
          return operation.execute(answers, state);
        });
      });
    });
  }

  /**
   * Fetches inquirer questions from the given operation.
   * Answers will be cached and future inquiries will not be made to the operation.
   */
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

  /**
   * Fetches state from the given operation.
   * Cached state will be given to the operation to use at the operation's
   * discretion.
   * State returned from operation will be cached for future reference.
   */
  _state(operation, answers) {
    const cacheLabel = `${operation.getLabel()}-state`;
    const cachedState = ioc.cache.fetch(cacheLabel);
    log.debug(`Checking state of '${operation.getLabel()}' operation`);
    return operation.state(answers, cachedState).then(newState => {
      if (newState) ioc.cache.put(cacheLabel, newState);
      return newState;
    });
  }

}

module.exports = new Pipeline();
module.exports.Pipeline = Pipeline;
