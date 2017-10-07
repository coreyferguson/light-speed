
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
      const label = operation.getLabel();
      log.info(`Processing: ${label}`);
      const cachedAnswers = ioc.cache.fetch(label);
      return operation.inquire(cachedAnswers).then(questions => {
        return inquirer.prompt(questions).then(answers => {
          ioc.cache.put(label, answers);
        });
      });
    });
  }

}

module.exports = new Pipeline();
module.exports.Pipeline = Pipeline;
