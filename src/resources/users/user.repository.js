const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const get = async id => {
  return User.findById(id);
};

const create = async user => {
  const createdUser = await User.create(user);
  return get(createdUser._id);
};

const update = async (_id, user) => {
  await User.updateOne({ _id }, user);
  return get(_id);
};

const remove = async _id => {
  return User.deleteOne({ _id });
};

const removeMany = async ids => {
  return ids.forEach(id => remove(id));
};

module.exports = { getAll, create, get, update, remove, removeMany };
