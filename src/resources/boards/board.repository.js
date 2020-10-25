const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const get = async id => {
  return Board.findById(id);
};

const create = async board => {
  const createdUser = await Board.create(board);
  return get(createdUser._id);
};

const update = async (_id, board) => {
  await Board.updateOne({ _id }, board);
  return get(_id);
};

const remove = async _id => {
  return Board.remove({ _id });
};
module.exports = { getAll, create, get, update, remove };
