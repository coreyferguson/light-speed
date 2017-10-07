
const bluebird = require('bluebird');
const inquirer = require('inquirer');
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
    const label = operation.getLabel();
    const cachedAnswers = ioc.cache.fetch(label);
    if (!cachedAnswers) {
      log.debug(`Inquiring into '${label}' operation`);
      return operation.inquire(cachedAnswers).then(questions => {
        return inquirer.prompt(questions).then(answers => {
          ioc.cache.put(label, answers);
        });
      });
    } else {
      log.debug(`Operation '${label}' already has cached answers`);
    }
  }

}

module.exports = new Pipeline();
module.exports.Pipeline = Pipeline;
