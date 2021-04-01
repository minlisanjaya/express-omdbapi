const OmdbAPIService = require('./omdb.api.service');
const { responseBadRequest } = require('../helper/response.helper');

class MovieService {
  constructor() {
    this.omdbAPIService = new OmdbAPIService();
    this.movieType = ['movie', 'series', 'episode'];
    this.moviePlot = ['short', 'full'];
  }

  async SearchMovie(params) {
    if (!params.keyword) {
      return responseBadRequest('Keyword needed');
    }

    if (params.type && !this.movieType.includes(params.type)) {
      return responseBadRequest('Movie type only includes movie, series, episode');
    }

    return this.omdbAPIService.SearchMovie(params);
  }

  async GetMovieDetail(params) {
    if (!params.imdb_id && !params.title) {
      return responseBadRequest('At least one of IMDB Id or Title provided');
    }

    if (params.type && !this.movieType.includes(params.type)) {
      return responseBadRequest('Movie type only includes movie, series, episode');
    }

    if (params.plot && !this.moviePlot.includes(params.plot)) {
      return responseBadRequest('Movie plot only includs short or full');
    }

    return this.omdbAPIService.GetMovieDetail(params);
  }
}

module.exports = MovieService;
