
const bluebird = require('bluebird');
const inquirer = require('inquirer');
const ioc = require('../ioc');

class Pipeline {

  constructor(options) {
    options = options || {};
    this.operations = options.operations || ioc.operations;
  }

  run() {
    return bluebird.mapSeries(this.operations, operation => {
      return operation.inquire().then(questions => {
        return inquirer.prompt(questions);
      });
    });
  }

}

module.exports = new Pipeline();
module.exports.Pipeline = Pipeline;
