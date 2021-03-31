const express = require('express');
const router = express.Router();

const MovieController = require('../controllers/movie.controller');
const controller = new MovieController();

/* GET users listing. */
router.get('/search', controller.SearchMovie);

router.get('/detail', controller.GetMovieDetail);

module.exports = router;
