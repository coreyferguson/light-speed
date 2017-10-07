
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const nconf = require('nconf');

// export function to create new logger for the given label `l`
module.exports = l => {
  return createLogger({
    format: combine(
      label({ label: l }),
      timestamp(),
      printf(info => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
      })
    ),
    transports: [
      new transports.Console({
        level: nconf.get('logLevel')
      })
    ]
  });
};
