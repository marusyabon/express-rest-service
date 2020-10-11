const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = async id => {
  const taskIDsToDelete = (await tasksService.getByBoardID(id)).map(
    el => el.id
  );
  tasksService.removeMany(taskIDsToDelete);
  return boardsRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
