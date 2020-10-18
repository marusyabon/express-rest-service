const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { logger, logRequests } = require('./common/logger');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { ValidationError, NotFoundError } = require('./common/customErrors');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process
  .on('unhandledRejection', reason => {
    logger.error(`Unhandled rejection detected: ${reason}`);
  })
  .on('uncaughtException', (err, origin) => {
    logger.error(`Caught exception: ${err}. Exception origin: ${origin}`);
    throw new Error(err);
  });

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logRequests);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use(
  '/boards/:id/tasks',
  (req, res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);

app.use((err, req, res, next) => {
  if (err instanceof ValidationError || err instanceof NotFoundError) {
    res.status(err.status).send(err.message);
    return;
  }
  next(err);
});

/* eslint-disable */
app.use((err, req, res, next) => {
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

module.exports = app;
