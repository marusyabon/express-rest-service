const tasksRepo = require('./task.memory.repository');

const getAll = async () => tasksRepo.getAll();

const get = id => tasksRepo.get(id);

const getByUserID = async userId =>
  (await getAll()).filter(el => el.userId === userId);

const getByBoardID = async boardId =>
  (await getAll()).filter(el => el.boardId === boardId);

const create = task => tasksRepo.create(task);

const update = (id, task) => tasksRepo.update(id, task);

const updateMany = (tasks, changes) => {
  tasks.forEach(task => {
    tasksRepo.update(task.id, { ...task, ...changes });
    console.log({ ...task, ...changes });
  });
};

const remove = id => tasksRepo.remove(id);

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
