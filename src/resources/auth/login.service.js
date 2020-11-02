const jwt = require('jsonwebtoken');
const usersRepo = require('../users/user.repository');
const { JWT_SECRET_KEY } = require('../../common/config');
const { checkPassword } = require('../../common/authHelpers');

const signToken = async (email, password) => {
  const user = await usersRepo.getAuthData({ login: email });

  if (!user) {
    return null;
  }
  const hashedPassword = user.password;
  const compareRes = await checkPassword(password, hashedPassword);

  if (compareRes) {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '24h' });
    return token;
  }

  return null;
};

module.exports = {
  signToken
};
