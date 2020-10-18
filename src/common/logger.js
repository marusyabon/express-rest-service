const { createLogger, format, transports } = require('winston');
const { combine, json, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

module.exports = createLogger({
  level: 'silly',
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), customFormat)
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: combine(format.timestamp(), customFormat, json())
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: combine(format.timestamp(), customFormat, json())
    })
  ]
});
