const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');
const morgan = require('morgan');
require('express-async-errors');
const createError = require('http-errors');

const winston = require('./common/logger');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/auth/login.router');
const { ValidationError, NotFoundError } = require('./common/customErrors');
const logger = require('./common/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  morgan(
    ':method :status :url :query Body :body size :res[content-length] - :response-time ms',
    {
      stream: winston.stream
    }
  )
);

app.use('/login', loginRouter);
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

app.use((req, res, next) => next(createError(NOT_FOUND)));

app.use((err, req, res, next) => {
  logger.error(err.message);

  if (err instanceof ValidationError || err instanceof NotFoundError) {
    res.status(err.status).send(err.message);
  } else {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next(err);
});

module.exports = app;
