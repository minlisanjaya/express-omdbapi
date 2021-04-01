const DBConnection = require('../database/db.connection');

class LogRequestModel {
  constructor() {
    this.dbConnection = new DBConnection();

    this.tableName = 'log_request';
  }

  async CreateLogRequest(data) {
    const queryString = `INSERT INTO ${this.tableName} SET ?`;

    return this.dbConnection.ExecuteQuery(queryString, [data]);
  }
}

module.exports = LogRequestModel;
