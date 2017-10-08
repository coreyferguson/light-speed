
# Cache

Cache an object to the local disk with a yaml file located in the user's home directory.

## Usage

Put into cache:

```javascript
const ioc = require('./path/to/ioc');
const label = 'cache-file-name'; // '.yml' added automatically
const object = { key: 'value' }; // object to be cached
ioc.cache.put(label, object);
```

Fetch from cache:

```javascript
const ioc = require('./path/to/ioc');
const label = 'cache-file-name';
const object = ioc.cache.fetch(label);
console.log(object.key); // -> value
```
