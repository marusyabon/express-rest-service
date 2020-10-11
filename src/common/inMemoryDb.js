const User = require('../resources/users/user.model');
const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

DB.Users.push(new User(), new User(), new User());

const getAll = async dt => [...DB[dt]];

const get = async (dt, id) => DB[dt].find(el => el.id === id);

const create = async (dt, entity) => {
  DB[dt].push(entity);
  return get(dt, entity.id);
};

const update = async (dt, id, entity) => {
  const entityFromDB = DB[dt].find(el => el.id === id);
  if (entityFromDB) {
    Object.assign(entityFromDB, { ...entity, id });
  }
  return get(dt, id);
};

const remove = async (dt, id) => {
  const index = DB[dt].findIndex(el => el.id === id);
  if (index >= 0) {
    DB[dt].splice(index, 1);
    return id;
  }
  return null;
};

const removeMany = async (dt, IDs) => {
  const filteredData = DB[dt].filter(el => !IDs.find(id => id === el.id));
  DB[dt].length = 0;
  filteredData.map(el => DB[dt].push(el));
};

module.exports = { getAll, get, create, update, remove, removeMany };
