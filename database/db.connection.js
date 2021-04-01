const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

class DBConnection {
  async createConnection() {
    return mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port,
      database: dbConfig.database,
      namedPlaceholders: true,
    });
  }

  async closeConnection(connection) {
    return connection.end();
  }

  async executeQuery(queryString, data) {
    try {
      const conn = await this.createConnection();

      const [row] = await conn.query(queryString, data);
      conn.end();

      return row;
    } catch (error) {
      console.error(error);

      return { errorCode: error.code };
    }
  }
}

module.exports = DBConnection;
