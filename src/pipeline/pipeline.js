
const ioc = require('../ioc');

class Pipeline {

  constructor(options) {
    options = options || {};
    this.operations = options.operations || ioc.operations;
  }

  run() {
    return new Promise(resolve => {
      this.operations.forEach(operation => {
        operation.inquire();
      });
      resolve();
    });
  }

}

module.exports = new Pipeline();
module.exports.Pipeline = Pipeline;
