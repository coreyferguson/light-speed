
const generate = () => {
  return {
    inquire: () => Promise.resolve([]),
    getLabel: () => 'label'
  };
}

module.exports = generate();
module.exports.generate = generate;
