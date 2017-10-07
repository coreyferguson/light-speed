
const generate = () => {
  return {
    getLabel: () => 'label',
    inquire: () => Promise.resolve(),
    state: () => Promise.resolve()
  };
}

module.exports = generate();
module.exports.generate = generate;
