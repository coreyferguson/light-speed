
const logger = require('../../logger')('aws-credentials');

class AwsCredentials {

  inquire(cachedAnswers) {
    cachedAnswers = cachedAnswers || {};
    logger.log('debug', 'Hello there');
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

}

module.exports = new AwsCredentials();
module.exports.AwsCredentials = AwsCredentials;
