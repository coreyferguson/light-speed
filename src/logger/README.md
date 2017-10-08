
# Logger

Logs to terminal and debug log. 

Log levels above `info` are sent to terminal by default. You can override with the `logLevel` argument.

Log levels above `debug` are always appended to `~/.light-speed/debug.log`. This file is cleared before every run.

## Usage

```bash
const ioc = require('./path/to/ioc');
const log = ioc.logger('component-name');
log.info('This is an information message. Will appear on terminal by default');
log.debug('This is a debug message. This will appear in debug.log by default');
```
