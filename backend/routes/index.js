const bookRouter = require('./books');

function route(app) {
    app.use('/books', bookRouter);
}

module.exports = route;