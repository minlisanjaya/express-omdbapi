const DBConnection = require('../database/db.connection');

class LogRequestModel {
  constructor() {
    this.dbConnection = new DBConnection();

    this.tableName = 'log_request';
  }

  async createLogRequest(data) {
    const queryString = `INSERT INTO ${this.tableName} SET ?`;

    return this.dbConnection.executeQuery(queryString, [data]);
  }
}

module.exports = LogRequestModel;
