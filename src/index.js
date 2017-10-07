
require('./ioc/config');

const pipeline = require('./pipeline');
pipeline.run().catch(error => {
  console.error('error:', error);
});
