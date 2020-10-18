const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');
const { NotFoundError } = require('../../common/customErrors');

const getAll = () => boardsRepo.getAll();

const get = async id => {
  const board = await boardsRepo.get(id);
  if (board) {
    return board;
  }
  throw new NotFoundError('Board not found');
};

const create = board => boardsRepo.create(board);

const update = async (id, board) => {
  await get(id);
  return boardsRepo.update(id, board);
};

const remove = async id => {
  await get(id);
  const taskIDsToDelete = (await tasksService.getByBoardID(id)).map(
    el => el.id
  );
  tasksService.removeMany(taskIDsToDelete);
  return boardsRepo.remove(id);
};

module.exports = { getAll, get, create, update, remove };
