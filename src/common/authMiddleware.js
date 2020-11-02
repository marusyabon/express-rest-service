const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

module.exports = function checkToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      return res.status(401).send('Unauthorized');
    }
    try {
      jwt.verify(token, JWT_SECRET_KEY);
      return next();
    } catch (err) {
      return res.status(401).send('Unauthorized');
    }
  }
  return res.status(401).send('Unauthorized');
};
