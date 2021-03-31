const MovieService = require('../services/movie.service');

class MovieController {
  constructor() {
    this.SearchMovie = this.SearchMovie.bind(this);
    this.GetMovieDetail = this.GetMovieDetail.bind(this);

    this.movieService = new MovieService();
  }

  async SearchMovie(request, response) {
    response.status(200).send({ ...request.query });
  }

  async GetMovieDetail(request, response) {
    response.status(200).send({ ...request.query });
  }
}

module.exports = MovieController;
