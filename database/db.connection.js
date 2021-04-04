const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

class DBConnection {
  async createConnection() {
    try {
      const connection = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        port: dbConfig.port,
        database: dbConfig.database,
        namedPlaceholders: true,
      });

      return connection;
    } catch (error) {
      throw new Error(error);
    }
  }

  async ExecuteQuery(queryString, data) {
    let conn = this.createConnection();

    try {
      const [row] = await conn.query(queryString, data);
      conn.end();

      return row;
    } catch (error) {
      console.error(error);
      conn.end();

      throw new Error(error);
    }
  }
}

module.exports = DBConnection;
