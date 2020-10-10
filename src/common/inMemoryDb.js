const User = require('../resources/users/user.model');
const DB = [];

DB.push(new User(), new User(), new User());

const getAllUsers = async () => [...DB];

const getUser = async id => DB.find(el => el.id === id);

const createUser = async user => {
  DB.push(user);
  return getUser(user.id);
};

const updateUser = async (id, user) => {
  const index = DB.findIndex(el => el.id === id);
  if (index >= 0) {
    DB.splice(index, 1, { ...user, id });
  }
  return getUser(id);
};

const removeUser = async id => {
  const index = DB.findIndex(el => el.id === id);
  if (index >= 0) {
    DB.splice(index, 1);
  }
  return id;
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
