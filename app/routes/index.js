// const noteRoutes = require('./note_routes');
const moviesRoutes = require('./movies_routes');

module.exports = function(app, db) {
  moviesRoutes(app, db);
};
