const DB = require('../../common/inMemoryDb');

const getAll = async () => DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);
  if (!user) {
    throw new Error('User was not found');
  }
  return user;
};

const create = async user => DB.createUser(user);

const update = async (id, user) => DB.updateUser(id, user);

const remove = async id => DB.removeUser(id);

module.exports = { getAll, get, create, update, remove };
