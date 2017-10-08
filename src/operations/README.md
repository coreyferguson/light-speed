
# Operations

Operations are steps in the overall pipeline to onboard a new AWS stack. 

Each operation must obey the given contract:

```javascript
class Operation {

  getLabel() {
    return label;
  }

  /**
   * Inquire for any user-specific values.
   */
  inquire(cachedAnswers) {
    cachedAnswers = cachedAnswers || {};
    return Promise.resolve([
      {
        type: 'input',
        name: 'username',
        message: 'Username',
        default: cachedAnswers.userName
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password',
        default: cachedAnswers.password
      }
    ]);
  }

  /**
   * Fetch the current state of this operation.
   * Optionally resolve a new state that will be cached for you.
   * Calls to `state` will include the previously `cachedState`.
   */
  state(answers, cachedState) {
    return Promise.resolve();
  }

  /**
   * Execute this operation.
   * You are given the `answers` to previous user input and the 
   * current `state` of this operation.
   */
  execute(answers, state) {
    return Promise.resolve();
  }

}

module.exports = new Operation();
module.exports.Operation = Operation;
```

