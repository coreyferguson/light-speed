

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const nconf = require('nconf');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

// debug logs
const debugFilePath = path.resolve(
  os.homedir(),
  nconf.get('userConfigFolderName'),
  'debug.log'
);

// clear existing debug logs
spawnSync('rm', [debugFilePath]);

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
      }),
      new transports.File({
        level: 'debug',
        filename: debugFilePath
      })
    ]
  });
};
