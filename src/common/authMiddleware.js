const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

module.exports = function checkToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader !== undefined) {
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || token === 'undefined') {
      return res.status(401).send('Unauthorized');
    }
    jwt.verify(token, JWT_SECRET_KEY);
    return next();
  }
  return res.status(401).send('Unauthorized');
};
