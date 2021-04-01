const sinon = require('sinon');
const chaiHttp = require('chai-http');
const chai = require('chai');

const AxiosService = require('../../services/axios.service');

const server = require('../../app');

chai.use(chaiHttp);

const omdbApiResponse = require('../responses/omdb.api.response.json');

describe('MovieRoute', () => {
  afterEach(() => sinon.restore());

  describe('GET /search', () => {
    it('Should success response with movie list', (done) => {
      sinon.stub(AxiosService.prototype, 'Get').callsFake(async () => omdbApiResponse.searchMovie);

      chai
        .request(server)
        .get('/search')
        .query({ keyword: 'terminator' })
        .end((_err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res).to.haveOwnProperty('body').that.deep.equal(omdbApiResponse.searchMovie.data);

          done();
        });
    });
  });

  describe('GET /detail', () => {
    it('Should success response with movie detail', (done) => {
      sinon.stub(AxiosService.prototype, 'Get').callsFake(async () => omdbApiResponse.getMovieDetail);

      chai
        .request(server)
        .get('/detail')
        .query({ title: 'shawshank' })
        .end((_err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res).to.haveOwnProperty('body').that.deep.equal(omdbApiResponse.getMovieDetail.data);

          done();
        });
    });
  });
});
