const MovieService = require('../services/movie.service');

class MovieController {
  constructor() {
    this.SearchMovie = this.SearchMovie.bind(this);
    this.GetMovieDetail = this.GetMovieDetail.bind(this);

    this.movieService = new MovieService();
  }

  async SearchMovie(request, response) {
    const result = await this.movieService.SearchMovie(request.query);

    response.status(result.httpCode).send(result.error || result.data);
  }

  async GetMovieDetail(request, response) {
    const result = await this.movieService.GetMovieDetail(request.query);

    response.status(result.httpCode).send(result.error || result.data);
  }
}

module.exports = MovieController;
