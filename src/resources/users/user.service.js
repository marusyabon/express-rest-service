const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');
const { NotFoundError } = require('../../common/customErrors');

const getAll = () => usersRepo.getAll();

const get = async id => {
  const user = await usersRepo.get(id);
  if (user) {
    return user;
  }
  throw new NotFoundError('User not found');
};

const create = user => usersRepo.create(user);

const update = async (id, user) => {
  await get(id); // if user is not exists throw an error
  return usersRepo.update(id, user);
};

const remove = async id => {
  await get(id); // if user is not exists throw an error
  const assignedTasks = await tasksService.getByUserID(id);
  await tasksService.updateMany(assignedTasks, { userId: null });
  return usersRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
