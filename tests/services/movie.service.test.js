const sinon = require('sinon');
const { expect } = require('chai');

const OmdbAPIService = require('../../services/omdb.api.service');
const MovieService = require('../../services/movie.service');

const omdbApiResponse = require('../responses/omdb.api.response.json');

describe('MovieService', () => {
  afterEach(() => sinon.restore());

  describe('SearchMovie()', () => {
    it('Should success search movie by parameters', async () => {
      sinon.stub(OmdbAPIService.prototype, 'SearchMovie').callsFake(async () => omdbApiResponse.searchMovie);

      const service = new MovieService();
      const result = await service.SearchMovie({ keyword: 'shawshank' });

      expect(result).to.haveOwnProperty('httpCode', 200);
      expect(result).to.haveOwnProperty('data').that.haveOwnProperty('Search').that.is.an('array');
    });

    it('Should return response bad request when no keyword provided', async () => {
      const service = new MovieService();
      const result = await service.SearchMovie({ keyword: '' });

      expect(result).to.haveOwnProperty('httpCode', 400);
      expect(result).to.haveOwnProperty('error');
    });

    it('Should return response bad request when type parameters not included in movie, series, episode', async () => {
      const service = new MovieService();
      const result = await service.SearchMovie({ keyword: 'shawshank', type: 'legend' });

      expect(result).to.haveOwnProperty('httpCode', 400);
      expect(result).to.haveOwnProperty('error');
    });
  });

  describe('GetMovieDetail()', () => {
    it('Should success get movie detail', async () => {
      sinon.stub(OmdbAPIService.prototype, 'GetMovieDetail').callsFake(async () => omdbApiResponse.getMovieDetail);

      const service = new MovieService();
      const result = await service.GetMovieDetail({ title: 'terminator' });

      expect(result).to.haveOwnProperty('httpCode', 200);
      expect(result).to.haveOwnProperty('data').that.not.empty;
    });

    it('Should return response bad request when no title or imdb id provided', async () => {
      const service = new MovieService();
      const result = await service.GetMovieDetail({});

      expect(result).to.haveOwnProperty('httpCode', 400);
      expect(result).to.haveOwnProperty('error');
    });

    it('Should return response bad request when type parameters not included in movie, series, episode', async () => {
      const service = new MovieService();
      const result = await service.GetMovieDetail({ title: 'terminator', type: 'horror' });

      expect(result).to.haveOwnProperty('httpCode', 400);
      expect(result).to.haveOwnProperty('error');
    });

    it('Should return response bad request when plot parameters not included in short or full', async () => {
      const service = new MovieService();
      const result = await service.GetMovieDetail({ title: 'terminator', plot: 'all' });

      expect(result).to.haveOwnProperty('httpCode', 400);
      expect(result).to.haveOwnProperty('error');
    });
  });
});
