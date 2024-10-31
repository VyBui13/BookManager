const bookRouter = require('./books');
const customerRouter = require('./customers');

function route(app) {

    app.use('/books', bookRouter);
    app.use('/customers', customerRouter);
    app.use('/', (req, res) => {
        res.send('Hello World');
    });
}

module.exports = route;