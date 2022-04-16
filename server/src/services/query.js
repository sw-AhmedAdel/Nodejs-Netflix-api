

function getTopMovies (req ,res ,next) {
  req.query.rating= {
    $gt:4
  }
  next();
}

module.exports = {
  getTopMovies
}