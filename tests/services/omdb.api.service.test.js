const sinon = require('sinon');
const { expect } = require('chai');

const OmdbAPIService = require('../../services/omdb.api.service');
const AxiosService = require('../../services/axios.service');

const omdbAPIResponse = require('../responses/omdb.api.response.json');

describe('OmdbAPIService', () => {
  afterEach(() => sinon.restore());

  describe('SearchMovie()', () => {
    it('Should success send request search movie', async () => {
      sinon.stub(AxiosService.prototype, 'Get').callsFake(async () => omdbAPIResponse.searchMovie);

      const service = new OmdbAPIService();
      const result = await service.SearchMovie({ keyword: 'shawshank' });

      expect(result).to.haveOwnProperty('httpCode', 200);
      expect(result).to.haveOwnProperty('data').that.haveOwnProperty('Search').that.is.an('array');
    });
  });

  describe('GetMovieDetail()', () => {
    it('Should success send request get movie detail', async () => {
      sinon.stub(AxiosService.prototype, 'Get').callsFake(async () => omdbAPIResponse.getMovieDetail);

      const service = new OmdbAPIService();
      const result = await service.GetMovieDetail({ title: 'terminator' });

      expect(result).to.haveOwnProperty('httpCode', 200);
      expect(result).to.haveOwnProperty('data').that.not.empty;
    });
  });
});
