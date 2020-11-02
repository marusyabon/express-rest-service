const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');
const admin = require('./defaultUser');
const userService = require('./resources/users/user.service');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', err => logger.error(`MongoDB connection error: ${err}`));
db.once('open', async () => {
  logger.info('DB is connected');
  await userService.create(admin);
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
