const sinon = require('sinon');
const { expect } = require('chai');

const DBConnection = require('../../database/db.connection');
const LogRequestModel = require('../../models/log.request.model');

const commonDBResponse = require('../responses/common.db.response.json');

describe('LogRequestModel', () => {
  afterEach(() => sinon.restore());

  describe('createLogRequest()', () => {
    it('Should success create log request row at database table', async () => {
      sinon.stub(DBConnection.prototype, 'ExecuteQuery').callsFake(async () => commonDBResponse.successInsertDb);

      const model = new LogRequestModel();
      const result = await model.CreateLogRequest({
        url: 'http://example.com',
        parameters: JSON.stringify({ search: 'keyword' }),
        called_at: new Date(),
      });

      expect(result).to.be.an('object').that.deep.equal(commonDBResponse.successInsertDb);
    });
  });
});
