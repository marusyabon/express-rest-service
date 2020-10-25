const tasksRepo = require('./task.repository');
const { NotFoundError } = require('../../common/customErrors');

const getAll = async () => tasksRepo.getMany({});

const get = async id => {
  const task = await tasksRepo.get(id);
  if (task) {
    return task;
  }
  throw new NotFoundError('Task not found');
};

const getByBoardID = async boardId => tasksRepo.getMany({ boardId });

const create = task => tasksRepo.create(task);

const update = async (id, task) => {
  await get(id);
  return tasksRepo.update(id, task);
};

const updateMany = (params, changes) => {
  tasksRepo.updateMany(params, changes);
};

const remove = async id => {
  await get(id);
  return tasksRepo.remove(id);
};

const removeMany = async params => {
  return tasksRepo.removeMany(params);
};

module.exports = {
  getAll,
  get,
  getByBoardID,
  create,
  update,
  updateMany,
  remove,
  removeMany
};
