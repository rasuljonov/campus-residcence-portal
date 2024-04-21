const { Pool } = require('pg');
const { DB } = require('../config')

class Database {
  #pool;

  constructor() {
    this.#pool = new Pool(DB)
  }
  
  async query(query, params) {
    const results = await this.#pool.query(query, params);
    return results;
  }

  stats() {
    return `Total Count: ${this.#pool.totalCount};  Idle Count: ${this.#pool.idleCount};  Wait Count: ${this.#pool.waitingCount};`;
  }

  kill() {
    this.#pool.end();
  }
}

module.exports = {
  db: new Database()
}



