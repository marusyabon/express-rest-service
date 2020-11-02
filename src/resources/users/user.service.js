const usersRepo = require('./user.repository');
const tasksService = require('../tasks/task.service');
const { NotFoundError } = require('../../common/customErrors');
const { hashPassword } = require('../../common/authHelpers');

const getAll = () => usersRepo.getAll();

const get = async params => {
  const user = await usersRepo.get(params);
  if (user) {
    return user;
  }
  throw new NotFoundError('User not found');
};

const getOneById = async id => {
  return get({ _id: id });
};

const create = async user => {
  const password = await hashPassword(user.password);
  return await usersRepo.create({
    name: user.name,
    login: user.login,
    password
  });
};

const update = async (id, user) => {
  await getOneById(id); // if user is not exists throw an error
  return usersRepo.update(id, user);
};

const remove = async id => {
  await getOneById(id);
  await tasksService.updateMany({ userId: id }, { userId: null });
  return usersRepo.remove(id);
};

module.exports = { getAll, get, getOneById, create, update, remove };
