const Task = require('./task.model');

const getMany = async params => {
  return Task.find(params);
};

const get = async id => {
  return Task.findById(id);
};

const create = async task => {
  const createdUser = await Task.create(task);
  return get(createdUser._id);
};

const update = async (_id, task) => {
  await Task.updateOne({ _id }, task);
  return get(_id);
};

const updateMany = async (params, task) => {
  return Task.updateMany(params, task);
};

const remove = async _id => {
  return Task.remove({ _id });
};

const removeMany = async params => {
  return Task.deleteMany(params);
};

module.exports = {
  getMany,
  create,
  get,
  update,
  updateMany,
  remove,
  removeMany
};
