require('dotenv/config');
const AxiosService = require('./axios.service');

class OmdbAPIService {
  constructor() {
    this.baseUrl = 'http://omdbapi.com';
    this.apiKey = process.env.OMDB_API_KEY;

    this.httpClient = new AxiosService({
      baseURL: this.baseUrl,
      timeout: 10000,
    });
  }

  async SearchMovie(params) {
    const paramSearch = {
      apikey: this.apiKey,
      s: params.keyword,
      type: params.type,
      y: params.year,
      page: params.page || 1,
      r: 'json',
    };

    return this.httpClient.get('/', paramSearch);
  }

  async GetMovieDetail(params) {
    const paramDetail = {
      apikey: this.apiKey,
      i: params.imdb_id,
      t: params.title,
      type: params.type,
      y: params.year,
      plot: params.plot || 'short',
      r: 'json',
    };

    return this.httpClient.get('/', paramDetail);
  }
}

module.exports = OmdbAPIService;
