
const ioc = require('../ioc');

class Pipeline {

  constructor() {
    this.operations = ioc.operations;
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
