const { createLogger, format, transports } = require('winston');
const { combine, json, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'silly',
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), customFormat)
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: combine(format.timestamp(), customFormat, json()),
      maxsize: '50MB'
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      format: combine(format.timestamp(), customFormat, json()),
      maxsize: '50MB'
    })
  ]
});

const logRequests = (req, res, next) => {
  const { method, protocol, url, query, body } = req;
  const host = req.get('host');

  logger.info(`
    method= ${method},
    url= ${protocol}://${host}${url},
    query parameters= ${JSON.stringify(query)},
    body= ${JSON.stringify(body)}`);

  next();
};

module.exports = { logger, logRequests };
