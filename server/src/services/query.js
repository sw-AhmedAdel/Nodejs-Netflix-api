

function getTopMovies (req ,res ,next) {
  req.query.rating= {
    gte:8
  }
  req.query.isSeries=false
  next();
}

function getTopSerios (req ,res ,next) {
  req.query.rating= {
    gte:8
  }
  req.query.isSeries=true
  next();
}
module.exports = {
  getTopMovies,
  getTopSerios

}