
const generate = () => {
  return {
    inquire: () => Promise.resolve([])
  };
}

module.exports = generate();
module.exports.generate = generate;
