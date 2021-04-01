const sinon = require('sinon');
const { expect } = require('chai');

const axios = require('axios');
const AxiosService = require('../../services/axios.service');
const LogRequestModel = require('../../models/log.request.model');

const commonDBResponse = require('../responses/common.db.response.json');
const omdbAPIResponse = require('../responses/omdb.api.response.json');
const axiosResponse = require('../responses/axios.response.json');

describe('AxiosService', () => {
  describe('Get()', () => {
    it('Should success request with method GET', async () => {
      sinon.stub(LogRequestModel.prototype, 'CreateLogRequest').callsFake(async () => commonDBResponse.successInsertDb);
      sinon.stub(axios, 'create').callsFake(() => {
        return {
          defaults: {
            baseURL: 'http://example.com',
          },
          get() {
            return {
              status: 200,
              data: omdbAPIResponse.searchMovie.data,
            };
          },
        };
      });

      const service = new AxiosService({ baseURL: 'http://omdbapi.com' });
      const result = await service.Get('/', { s: 'terminator', apikey: 'apikey' });

      expect(result).to.haveOwnProperty('httpCode', 200);
    });
  });

  describe('responseHandler()', () => {
    it('Should handle response and transform data correctly', () => {
      const service = new AxiosService({ baseURL: 'http://omdbapi.com' });
      const result = service.responseHandler(axiosResponse.get_response);

      expect(result).to.haveOwnProperty('httpCode', 200);
      expect(result).to.haveOwnProperty('data');
    });

    it('Should handle response and transaform to internal server error', () => {
      const service = new AxiosService({ baseURL: 'http://omdbapi.com' });
      const result = service.responseHandler({});

      expect(result).to.haveOwnProperty('httpCode', 500);
      expect(result).to.haveOwnProperty('error');
    });
  });
});
