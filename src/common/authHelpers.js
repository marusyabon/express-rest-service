const bcrypt = require('bcrypt');

const checkPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

const hashPassword = async password => await bcrypt.hash(password, 10);

module.exports = { checkPassword, hashPassword };
