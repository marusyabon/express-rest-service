const tasksRepo = require('./task.memory.repository');
const { NotFoundError } = require('../../common/customErrors');

const getAll = async () => tasksRepo.getAll();

const get = async id => {
  const task = await tasksRepo.get(id);
  if (task) {
    return task;
  }
  throw new NotFoundError('Task not found');
};

const getByUserID = async userId =>
  (await getAll()).filter(el => el.userId === userId);

const getByBoardID = async boardId =>
  (await getAll()).filter(el => el.boardId === boardId);

const create = task => tasksRepo.create(task);

const update = async (id, task) => {
  await get(id);
  return tasksRepo.update(id, task);
};

const updateMany = (tasks, changes) => {
  tasks.forEach(task => {
    tasksRepo.update(task.id, { ...task, ...changes });
  });
};

const remove = async id => {
  await get(id);
  return tasksRepo.remove(id);
};

const removeMany = IDs => tasksRepo.removeMany(IDs);

module.exports = {
  getAll,
  get,
  getByUserID,
  getByBoardID,
  create,
  update,
  updateMany,
  remove,
  removeMany
};
