const DB = require('./inMemoryDb');

class Repository {
  constructor(dt) {
    this.dt = dt;
  }

  async getAll() {
    return DB.getAll(this.dt);
  }

  async get(id) {
    const entity = await DB.get(this.dt, id);
    if (!entity) {
      throw new Error('Entity was not found');
    }
    return entity;
  }

  async create(entity) {
    return DB.create(this.dt, entity);
  }

  async update(id, entity) {
    return DB.update(this.dt, id, entity);
  }

  async remove(id) {
    return DB.remove(this.dt, id);
  }
}

module.exports = Repository;
