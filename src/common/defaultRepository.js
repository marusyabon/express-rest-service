const DB = require('./inMemoryDb');

class Repository {
  constructor(dt) {
    this.dt = dt;
  }

  async getAll() {
    return DB.getAll(this.dt);
  }

  async get(id) {
    return DB.get(this.dt, id);
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

  async removeMany(ids) {
    return DB.removeMany(this.dt, ids);
  }
}

module.exports = Repository;
