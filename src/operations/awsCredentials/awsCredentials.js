
const label = 'aws-credentials';
const logger = require('../../logger')(label);

class AwsCredentials {

  getLabel() {
    return label;
  }

  inquire(cachedAnswers) {
    cachedAnswers = cachedAnswers || {};
    logger.log('debug', 'Prompting for aws credentials.');
    return Promise.resolve([
      {
        type: 'input',
        name: 'infraAccessKeyId',
        message: 'Infra Access Key Id',
        default: cachedAnswers.infraAccessKeyId
      },
      {
        type: 'password',
        name: 'infraSecretAccessKey',
        message: 'Infra Secret Access Key',
        default: cachedAnswers.infraSecretAccessKey
      },
      {
        type: 'input',
        name: 'preprodAccessKeyId',
        message: 'Preprod Access Key Id',
        default: cachedAnswers.preprodAccessKeyId
      },
      {
        type: 'password',
        name: 'preprodSecretAccessKey',
        message: 'Preprod Secret Access Key',
        default: cachedAnswers.preprodSecretAccessKey
      }
    ]);
  }

  state(cachedState) {
    return Promise.resolve();
  }

  execute(state) {
    return Promise.resolve();
  }

}

module.exports = new AwsCredentials();
module.exports.AwsCredentials = AwsCredentials;
