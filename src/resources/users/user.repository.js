const User = require('./user.model');

const getAll = async () => {
  return User.find({});
};

const get = async params => {
  return User.findOne(params);
};

const getAuthData = async login => {
  return User.findOne({ login })
    .select(['login', 'password'])
    .exec();
};

const create = async user => {
  const createdUser = await User.create(user);
  return get({ _id: createdUser._id });
};

const update = async (_id, user) => {
  await User.updateOne({ _id }, user);
  return get({ _id });
};

const remove = async _id => {
  return User.deleteOne({ _id });
};

const removeMany = async ids => {
  return ids.forEach(id => remove(id));
};

module.exports = {
  getAll,
  create,
  get,
  getAuthData,
  update,
  remove,
  removeMany
};
